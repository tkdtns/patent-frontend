import { apiFetch } from './client';
import type {
  AnalysisResult,
  ApplyEditRequest,
  RevertEditRequest,
} from '../types/analysis';

export async function applyEdit(
  applicationNumber: string,
  req: ApplyEditRequest,
): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/edits/apply`,
    { method: 'POST', body: JSON.stringify(req) },
  );
}

export async function revertEdit(
  applicationNumber: string,
  req: RevertEditRequest,
): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/edits/revert`,
    { method: 'POST', body: JSON.stringify(req) },
  );
}
