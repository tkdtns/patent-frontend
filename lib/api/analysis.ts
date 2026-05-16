import { apiFetch } from './client';
import type {
  AnalysisResult,
  StartAnalysisRequest,
  StartAnalysisResponse,
  RerunAmendmentRequest,
  RerunStrategyRequest,
} from '../types/analysis';
import type { CitedArtDetail } from '../types/output';

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

export async function getCitedArtDetail(
  applicationNumber: string,
  citedArtId: string,
): Promise<CitedArtDetail> {
  return apiFetch<CitedArtDetail>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/prior-art/${encodeURIComponent(citedArtId)}`,
  );
}

export async function rerunAmendment(
  applicationNumber: string,
  req: RerunAmendmentRequest,
): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/rerun-amendment`,
    { method: 'POST', body: JSON.stringify(req) },
  );
}

export async function rerunStrategy(
  applicationNumber: string,
  req: RerunStrategyRequest,
): Promise<AnalysisResult> {
  return apiFetch<AnalysisResult>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/rerun-strategy`,
    { method: 'POST', body: JSON.stringify(req) },
  );
}
