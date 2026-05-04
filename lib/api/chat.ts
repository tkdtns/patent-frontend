import { apiFetch } from './client';
import type { ChatRequest, ChatResponse } from '../types/chat';

export async function chat(
  applicationNumber: string,
  req: ChatRequest,
): Promise<ChatResponse> {
  return apiFetch<ChatResponse>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/chat`,
    { method: 'POST', body: JSON.stringify(req) },
  );
}
