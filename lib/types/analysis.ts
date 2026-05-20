/**
 * 백엔드 `src/patent_agent/models/analysis.py`와 1:1 대응.
 */

import type {
  OfficeActionResult,
  ClaimParseResult,
  SpecMappingResult,
  ClaimChartResult,
  StrategyResult,
  AmendmentResult,
  RejectionType,
} from './output';

// ─── Tool 4.5: 청구항 결론 ─────────────────────────────────────────────────
export type ClaimVerdict = '동의' | '부분동의' | '부정';

export interface ClaimConclusionItem {
  claim_number: number;
  rejection_type: RejectionType;
  /** 여러 거절이유가 병합된 경우 원본 타입 목록 */
  merged_from: RejectionType[];
  our_verdict: ClaimVerdict;
  our_reasoning: string;
}

export interface ClaimConclusion {
  items: ClaimConclusionItem[];
}

export interface EditLogEntry {
  timestamp: string;
  target_path: string;
  before: string;
  after: string;
  source: 'user-direct' | 'llm-proposed-user-applied' | 'regenerate' | 'llm-rerun';
  user_instruction: string | null;
}

export interface RerunAmendmentRequest {
  user_instruction: string;
}

export interface RerunStrategyRequest {
  user_instruction: string;
}

export interface AnalysisResult {
  application_number: string;
  analysis_id: string;
  version: number;
  created_at: string;

  office_action: OfficeActionResult;
  claim_parse: ClaimParseResult;
  spec_mapping: SpecMappingResult;
  claim_chart: ClaimChartResult;
  strategy: StrategyResult;
  amendment: AmendmentResult;

  /** 청구항별 거절이유 결론 (Tool 4 이후 생성, 선택적) */
  claim_conclusion?: ClaimConclusion;
  /** 분석에 사용된 LLM 모델 식별자 */
  llm_model?: string;
  /** 소스 파일 정보 */
  source_files?: Record<string, unknown>;
  /** 파이프라인 실행 중 발생한 에러 목록 */
  errors?: unknown[];
  /** 별도 edits.log 파일에 저장되므로 API 응답에는 포함되지 않을 수 있음 */
  edit_log?: EditLogEntry[];
}

export interface StartAnalysisRequest {
  application_number: string;
  /** 파일 업로드 경로 또는 ID (백엔드에서 매핑) */
  patent_file_key?: string | null;
  office_action_file_key?: string | null;
  prior_art_file_keys?: string[] | null;
}

export interface StartAnalysisResponse {
  analysis_id: string;
  application_number: string;
  status: 'started';
}

export interface ApplyEditRequest {
  target_path: string;
  new_value: string;
  user_instruction?: string | null;
}

export interface RevertEditRequest {
  version: number;
}

/** SSE 스트림 이벤트 — 백엔드 `ProgressEvent` Pydantic 모델과 1:1 */
export interface ProgressEvent {
  step: string;
  ratio: number;
  done: boolean;
  /** 에러 발생 시 채워짐 */
  error?: string | null;
}
