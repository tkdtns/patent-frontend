/**
 * 백엔드 `src/patent_agent/models/output.py`와 1:1 대응되는 Tool 1~6 출력 타입.
 *
 * 한국어 리터럴 유니온은 백엔드 Pydantic의 Literal[...] 그대로 보존한다.
 * 백엔드의 Optional[T]는 TS의 T | null로 매핑한다 (undefined가 아님 — JSON 직렬화 일관성).
 */

// ─── 공통 리터럴 ─────────────────────────────────────────────────────────
export type RejectionType = '진보성' | '신규성' | '기재불비' | '기타';
export type ClaimType = '독립항' | '종속항';
export type Match = '동일' | '유사' | '차이';
export type Agreement = '일치' | '불일치';
export type StrategyType = '공격' | '방어';

// ─── Tool 1: 거절이유통지서 분석 ──────────────────────────────────────────
export interface RejectionReason {
  article: string;
  rejection_type: RejectionType;
  target_claim_numbers: number[];
  cited_art_ids: string[];
  examiner_reasoning: string;
}

export interface CitedArtRef {
  cited_art_id: string;
  document_number: string;
}

/**
 * 통지서 구성비교표 행. 일부 통지서에만 존재할 수 있다.
 */
export interface ExaminerChartRow {
  /** 비교 행 고유 ID (예: "1-1", "제1항-구성1") */
  comparison_id?: string;
  /** 대상 청구항 번호 */
  claim_number?: number;
  element_label: string;
  our_claim_text: string;
  prior_art_text: string;
  prior_art_id: string;
  prior_art_location?: string | null;
  examiner_match: Match;
  note: string | null;
}

export interface OfficeActionResult {
  application_number: string;
  rejection_reasons: RejectionReason[];
  rejected_claim_numbers: number[];
  cited_arts: CitedArtRef[];
  /** 통지서에 구성비교표가 있을 때만 채워짐 */
  examiner_chart?: ExaminerChartRow[] | null;
}

// ─── Tool 2: 청구항 파싱 ──────────────────────────────────────────────────
export interface ClaimElement {
  /** 예: "1-A", "1-B" */
  element_id: string;
  element_order: number;
  text: string;
  label: string | null;
}

export interface Claim {
  claim_number: number;
  claim_type: ClaimType;
  depends_on: number[];
  preamble: string | null;
  original_text: string;
  elements: ClaimElement[];
}

export interface ClaimParseResult {
  application_number: string;
  total_claims: number;
  independent_claims: number[];
  dependent_claims: number[];
  claims: Claim[];
}

// ─── Tool 3: 상세설명 매핑 ────────────────────────────────────────────────
export interface ElementSpecMapping {
  element_id: string;
  paragraph_ids: string[];
  rationale: string;
  /** 0.0 ~ 1.0 */
  confidence: number;
}

export interface SpecMappingResult {
  mappings: ElementSpecMapping[];
}

// ─── Tool 4: Claim Chart ──────────────────────────────────────────────────
export interface ClaimChartRow {
  /** 비교 행 고유 ID (예: "C0001") */
  comparison_id?: string;
  element_id: string;
  element_text: string;
  prior_art_id: string;
  prior_art_element: string | null;
  prior_art_location: string | null;
  /** 우리 측 판단 */
  our_match: Match;
  our_explanation: string;
  /** 심사관 판단 (통지서 구성비교표 있을 때만) */
  examiner_match: Match | null;
  examiner_explanation: string | null;
  /** 우리 vs 심사관 일치도 (둘 다 있을 때만) */
  agreement: Agreement | null;
  /** 불일치 시 근거 */
  disagreement_rationale: string | null;
}

export interface ClaimChart {
  target_claim_number: number;
  rows: ClaimChartRow[];
}

export interface ClaimChartResult {
  charts: ClaimChart[];
}

// ─── Tool 5: 공격·방어 전략 ───────────────────────────────────────────────
export interface Strategy {
  strategy_type: StrategyType;
  rationale: string;
  /** Claim Chart의 element_id 참조 (예: ["1-A", "1-B"]) */
  leveraged_differences: string[];
  proposed_action: string;
}

export interface StrategyResult {
  offensive: Strategy;
  defensive: Strategy;
}

// ─── Tool 6: 보정청구항 ───────────────────────────────────────────────────
/** 인라인 diff 토큰 — HTML 목업의 {t,s} 형식 보존 */
export interface DiffToken {
  /** add: 추가, del: 삭제, same: 변경 없음 */
  t: 'add' | 'del' | 'same';
  s: string;
}

export interface AmendedClaim {
  claim_number: number;
  /** 원문과 동일한지 (공격안에서 보정 없음일 때 true). Mock 전용 — 백엔드는 amended_text로 판단 */
  is_same?: boolean;
  diff_summary: string;
  /** 명세서 뒷받침 단락 ID (예: ["0012", "0018"]) */
  spec_basis: string[];
  original_text: string;
  /** 백엔드가 반환하는 보정 후 청구항 텍스트 */
  amended_text?: string | null;
  /** Mock 전용 인라인 diff 토큰 */
  diff?: DiffToken[] | null;
}

export interface AmendmentDraft {
  strategy_type: StrategyType;
  overall_explanation: string;
  amended_claims: AmendedClaim[];
}

export interface AmendmentResult {
  offensive_draft: AmendmentDraft;
  defensive_draft: AmendmentDraft;
}

// ─── 인용발명 상세 (별도 API) ────────────────────────────────────────────────
export interface CitedArtClaim {
  claim_number: number;
  text: string;
}

export interface CitedArtParagraph {
  paragraph_id: string;
  text: string;
}

export interface CitedArtDetail {
  cited_art_id: string;
  document_number: string;
  title: string;
  applicant: string;
  filing_date: string;
  abstract: string;
  key_claims: CitedArtClaim[];
  relevant_paragraphs: CitedArtParagraph[];
}

// ─── Tool 에러 (백엔드 ToolError) ──────────────────────────────────────────
export interface ToolError {
  tool_name: string;
  error_type: 'llm_failure' | 'validation_error' | 'timeout';
  message: string;
  is_fatal: boolean;
}
