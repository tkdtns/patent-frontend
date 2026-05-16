import { fetchEventSource } from '@microsoft/fetch-event-source';
import { apiFetch } from './client';
import { config } from '../config';
import type { ChatRequest, ChatResponse, StreamChatCallbacks, RerunProposal } from '../types/chat';

export async function chat(
  applicationNumber: string,
  req: ChatRequest,
): Promise<ChatResponse> {
  return apiFetch<ChatResponse>(
    `/api/v1/analysis/${encodeURIComponent(applicationNumber)}/chat`,
    { method: 'POST', body: JSON.stringify(req) },
  );
}

/**
 * 챗봇 응답을 SSE 스트림으로 수신한다.
 * 백엔드 이벤트 형식:
 *   data: {"type": "token",  "content": "..."}
 *   data: {"type": "done"}
 *
 * @returns 구독 해제 함수 (컴포넌트 unmount 시 호출)
 */
export function streamChat(
  applicationNumber: string,
  req: ChatRequest,
  callbacks: StreamChatCallbacks,
): () => void {
  const ctrl = new AbortController();
  const url = `${config.apiBaseUrl}/api/v1/analysis/${encodeURIComponent(applicationNumber)}/chat/stream`;

  void fetchEventSource(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
    signal: ctrl.signal,
    openWhenHidden: true,
    onmessage(ev) {
      try {
        const data = JSON.parse(ev.data) as Record<string, unknown>;
        if (data.type === 'token' && typeof data.content === 'string') {
          callbacks.onToken(data.content);
        }
        // propose_regenerate 이벤트: data.data = [{tool:"propose_regenerate", input:{tool_name, hint}}]
        if (data.type === 'proposals' && Array.isArray(data.data)) {
          const rerunProposals: RerunProposal[] = (data.data as Array<Record<string, unknown>>)
            .filter((p) => p.tool === 'propose_regenerate')
            .map((p) => {
              const input = p.input as Record<string, string>;
              return { tool_name: input.tool_name as RerunProposal['tool_name'], instruction: input.hint };
            });
          if (rerunProposals.length > 0) callbacks.onRerunProposal?.(rerunProposals);
        }
        if (data.type === 'done') {
          ctrl.abort('done');
          callbacks.onDone?.();
        }
      } catch { /* JSON 파싱 실패 무시 */ }
    },
    onerror(err) {
      callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
      throw err;
    },
    onclose() {
      callbacks.onDone?.();
    },
  }).catch((err: unknown) => {
    if (ctrl.signal.aborted) return;
    callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
  });

  return () => { if (!ctrl.signal.aborted) ctrl.abort('unsubscribe'); };
}
