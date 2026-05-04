import { apiFetch } from './client';
import type {
  AnalysisResult,
  StartAnalysisRequest,
  StartAnalysisResponse,
} from '../types/analysis';

export async function startAnalysis(
  req: StartAnalysisRequest,
): Promise<StartAnalysisResponse> {
  return apiFetch<StartAnalysisResponse>('/api/v1/analysis', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

export async function getAnalysis(
  applicationNumber: string,
): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}`,
  );
}
