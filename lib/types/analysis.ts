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
} from './output';

export interface EditLogEntry {
  timestamp: string;
  action: string;
  target: string;
  reason: string | null;
  previous_value: string | null;
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

  edit_log: EditLogEntry[];
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
  action: string;
  target_path: string;
  new_value: string;
  reason: string | null;
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
