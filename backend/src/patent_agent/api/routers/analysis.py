from __future__ import annotations
import os
import time
from pathlib import Path
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from pydantic import BaseModel
from patent_agent.api.deps import get_llm_dep
from patent_agent.llm.base import LLMClient
from patent_agent.core.pipeline import run_analysis
from patent_agent.core.storage import (
    load_analysis,
    load_input_office_action,
    load_input_patent,
    load_input_prior_arts,
    save_analysis,
)
from patent_agent.models.analysis import AnalysisResult, EditLogEntry
from patent_agent.models.input import OfficeActionRaw, PatentDoc, PriorArtDoc
from patent_agent.tools.tool5_strategy import analyze_diff_and_strategy
from patent_agent.tools.tool6_amendment import generate_amendments

router = APIRouter(prefix="/api/v1/analysis", tags=["analysis"])

# 진행 상황 임시 저장 (프로세스 내 메모리)
_progress_store: dict[str, list[dict]] = {}


class StartAnalysisRequest(BaseModel):
    application_number: str


class StartAnalysisResponse(BaseModel):
    analysis_id: str
    application_number: str
    status: str = "started"


@router.post("", response_model=StartAnalysisResponse)
async def start_analysis(
    req: StartAnalysisRequest,
    background_tasks: BackgroundTasks,
    llm: LLMClient = Depends(get_llm_dep),
):
    application_number = req.application_number
    analysis_id = f"{int(time.time())}-{application_number}"
    _progress_store[analysis_id] = []

    def _run():
        try:
            patent_raw = load_input_patent(application_number)
            oa_raw = load_input_office_action(application_number)
            prior_arts_raw = load_input_prior_arts(application_number)

            patent = _adapt_patent(application_number, patent_raw)
            oa = OfficeActionRaw(application_number=application_number, raw_dict=oa_raw)
            prior_arts = [_adapt_prior_art(i, raw) for i, raw in enumerate(prior_arts_raw)]

            def progress_cb(step: str, ratio: float) -> None:
                _progress_store[analysis_id].append(
                    {"step": step, "ratio": ratio, "done": ratio >= 1.0}
                )

            run_analysis(patent, oa, prior_arts, llm, progress_cb)
        except Exception as e:
            _progress_store[analysis_id].append(
                {"step": "오류", "ratio": 1.0, "done": True, "error": str(e)}
            )

    background_tasks.add_task(_run)
    return StartAnalysisResponse(
        analysis_id=analysis_id,
        application_number=application_number,
    )


@router.get("/{application_number}", response_model=AnalysisResult)
def get_analysis(application_number: str):
    try:
        return load_analysis(application_number)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="분석 결과 없음")


# ── 보정청구항 재생성 ─────────────────────────────────────────────────────

class RerunAmendmentRequest(BaseModel):
    user_instruction: str


@router.post("/{application_number}/rerun-amendment", response_model=AnalysisResult)
def rerun_amendment(
    application_number: str,
    req: RerunAmendmentRequest,
    llm: LLMClient = Depends(get_llm_dep),
):
    """
    Tool 1~5 결과는 그대로 유지하고, 사용자 요청(user_instruction)을 프롬프트에 반영하여
    Tool 6(보정청구항 생성)만 재실행한다.
    """
    try:
        current = load_analysis(application_number)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="분석 결과 없음")

    try:
        patent_raw = load_input_patent(application_number)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="원본 특허 파일 없음")

    patent = _adapt_patent(application_number, patent_raw)

    new_amendment = generate_amendments(
        strategy=current.strategy,
        claims=current.claim_parse,
        spec_mapping=current.spec_mapping,
        llm=llm,
        spec_paragraphs=patent.spec_paragraphs,
        user_instruction=req.user_instruction,
    )

    log_entry = EditLogEntry(
        target_path="amendment",
        before="(이전 보정안)",
        after="(재생성)",
        source="llm-rerun",
        user_instruction=req.user_instruction,
    )
    updated = current.model_copy(update={
        "amendment": new_amendment,
        "version": current.version + 1,
        "edit_log": list(current.edit_log or []) + [log_entry],
    })
    save_analysis(updated)
    return updated


# ── 전략 재생성 (Tool 5 → Tool 6) ────────────────────────────────────────

class RerunStrategyRequest(BaseModel):
    user_instruction: str


@router.post("/{application_number}/rerun-strategy", response_model=AnalysisResult)
def rerun_strategy(
    application_number: str,
    req: RerunStrategyRequest,
    llm: LLMClient = Depends(get_llm_dep),
):
    """
    Tool 1~4 결과는 그대로 유지하고, 사용자 요청을 반영하여
    Tool 5(전략) → Tool 6(보정안) 순으로 재실행한다.
    """
    try:
        current = load_analysis(application_number)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="분석 결과 없음")

    try:
        patent_raw = load_input_patent(application_number)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="원본 특허 파일 없음")

    patent = _adapt_patent(application_number, patent_raw)

    # Tool 5 재실행
    new_strategy = analyze_diff_and_strategy(
        claim_chart=current.claim_chart,
        office_action=current.office_action,
        spec_mapping=current.spec_mapping,
        llm=llm,
        user_instruction=req.user_instruction,
    )

    # Tool 6 재실행 (새 전략 기반)
    new_amendment = generate_amendments(
        strategy=new_strategy,
        claims=current.claim_parse,
        spec_mapping=current.spec_mapping,
        llm=llm,
        spec_paragraphs=patent.spec_paragraphs,
    )

    log_entry = EditLogEntry(
        target_path="strategy+amendment",
        before="(이전 전략·보정안)",
        after="(재생성)",
        source="llm-rerun",
        user_instruction=req.user_instruction,
    )
    updated = current.model_copy(update={
        "strategy": new_strategy,
        "amendment": new_amendment,
        "version": current.version + 1,
        "edit_log": list(current.edit_log or []) + [log_entry],
    })
    save_analysis(updated)
    return updated


# ── 인용발명 상세 ─────────────────────────────────────────────────────────

class CitedArtClaim(BaseModel):
    claim_number: int
    text: str

class CitedArtParagraph(BaseModel):
    paragraph_id: str
    text: str

class CitedArtDetail(BaseModel):
    cited_art_id: str
    document_number: str
    title: str
    applicant: str
    filing_date: str
    abstract: str
    key_claims: list[CitedArtClaim]
    relevant_paragraphs: list[CitedArtParagraph]


@router.get("/{application_number}/prior-art/{cited_art_id}", response_model=CitedArtDetail)
def get_prior_art_detail(application_number: str, cited_art_id: str):
    """인용발명 상세 정보 반환. cited_art_id 예: '인용발명1'"""
    data_dir = Path(os.getenv("DATA_DIR", "./data"))
    prior_arts_dir = data_dir / "input" / application_number / "prior_arts"
    art_file = prior_arts_dir / f"{cited_art_id}.json"

    if not art_file.exists():
        # 파일명이 정확히 일치하지 않을 경우 인덱스 기반 fallback
        files = sorted(prior_arts_dir.glob("*.json"))
        # "인용발명1" → index 0, "인용발명2" → index 1 ...
        try:
            suffix = cited_art_id.replace("인용발명", "")
            idx = int(suffix) - 1
            if 0 <= idx < len(files):
                art_file = files[idx]
            else:
                raise HTTPException(status_code=404, detail=f"인용발명 '{cited_art_id}' 없음")
        except (ValueError, IndexError):
            raise HTTPException(status_code=404, detail=f"인용발명 '{cited_art_id}' 없음")

    import json
    raw = json.loads(art_file.read_text(encoding="utf-8"))

    patent_info: dict = raw.get("특허정보", {})
    document_number: str = (
        patent_info.get("공개번호")
        or patent_info.get("등록번호")
        or patent_info.get("출원번호", "")
    )
    filing_date: str = patent_info.get("출원일자", "")
    applicant: str = raw.get("특허권자", {}).get("명칭", "")

    # 주요 청구항 (최대 5개)
    claims_raw: dict = raw.get("특허청구범위", {})
    key_claims = []
    for k, v in list(claims_raw.items())[:5]:
        try:
            num = int(k.replace("청구항", "").strip())
        except ValueError:
            num = 0
        key_claims.append(CitedArtClaim(claim_number=num, text=str(v)))

    # 관련 명세서 단락 (발명의내용, 실시예에서 최대 5개)
    spec: dict = raw.get("명세서", {})
    relevant_paragraphs: list[CitedArtParagraph] = []
    for section_name in ["발명의내용", "실시예", "배경기술"]:
        section = spec.get(section_name, [])
        if isinstance(section, list):
            for p in section:
                if isinstance(p, dict) and "단락번호" in p:
                    relevant_paragraphs.append(CitedArtParagraph(
                        paragraph_id=str(p["단락번호"]),
                        text=str(p.get("내용", "")),
                    ))
        if len(relevant_paragraphs) >= 5:
            break
    relevant_paragraphs = relevant_paragraphs[:5]

    return CitedArtDetail(
        cited_art_id=cited_art_id,
        document_number=document_number,
        title=str(raw.get("발명의명칭", "")),
        applicant=applicant,
        filing_date=filing_date,
        abstract=str(raw.get("요약", "")),
        key_claims=key_claims,
        relevant_paragraphs=relevant_paragraphs,
    )


def _adapt_patent(application_number: str, raw: dict) -> PatentDoc:
    claims_raw = raw.get("특허청구범위", {})
    claims = {int(k.replace("청구항", "")): v for k, v in claims_raw.items()}
    spec_paragraphs: dict[str, str] = {}
    for section in raw.get("명세서", {}).values():
        if isinstance(section, list):
            for p in section:
                if isinstance(p, dict) and "단락번호" in p:
                    spec_paragraphs[p["단락번호"]] = p["내용"]
    return PatentDoc(
        application_number=application_number,
        title=raw.get("발명의명칭", ""),
        abstract=raw.get("요약", ""),
        claims=claims,
        spec_paragraphs=spec_paragraphs,
    )


def _adapt_prior_art(index: int, raw: dict) -> PriorArtDoc:
    claims_raw = raw.get("특허청구범위", {})
    claims = {int(k.replace("청구항", "")): v for k, v in claims_raw.items()}
    spec_paragraphs: dict[str, str] = {}
    for section in raw.get("명세서", {}).values():
        if isinstance(section, list):
            for p in section:
                if isinstance(p, dict) and "단락번호" in p:
                    spec_paragraphs[p["단락번호"]] = p["내용"]
    return PriorArtDoc(
        application_number=raw.get("특허정보", {}).get("출원번호", f"prior-{index}"),
        title=raw.get("발명의명칭", ""),
        abstract=raw.get("요약", ""),
        claims=claims,
        spec_paragraphs=spec_paragraphs,
        prior_art_id=f"인용발명{index + 1}",
        publication_number=raw.get("특허정보", {}).get("공개번호", ""),
    )
