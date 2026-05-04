/**
 * 백엔드 `api/routers/stream.py`의 SSE 엔드포인트를 구독한다.
 *
 * 왜 `EventSource` 표준 API가 아니라 `@microsoft/fetch-event-source`를 쓰는가?
 * - 표준 EventSource는 헤더(예: Authorization) 커스터마이징 불가
 * - 표준 EventSource는 AbortController 미지원
 * - fetch-event-source는 이 둘을 모두 지원하면서 SSE 프로토콜을 그대로 구현
 *
 * 백엔드 이벤트 형식:
 *   data: {"step": "통지서 분석", "ratio": 0.15, "done": false}
 *
 * 마지막 이벤트는 `done: true` 또는 `error` 필드를 포함.
 */

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { config } from '../config';
import type { ProgressEvent } from '../types/analysis';

export interface StreamCallbacks {
  onEvent: (event: ProgressEvent) => void;
  /** 네트워크 에러 또는 done 이전에 연결이 끊어진 경우 */
  onError?: (error: Error) => void;
  /** done 이벤트 수신 또는 정상 종료 시 */
  onClose?: () => void;
}

/**
 * 진행 이벤트를 구독한다.
 *
 * @returns 구독 해제 함수. unmount 시 반드시 호출해야 메모리 누수가 없다.
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   const unsub = subscribeProgress(analysisId, {
 *     onEvent: (e) => setEvents(prev => [...prev, e]),
 *     onError: (err) => setError(err),
 *   });
 *   return unsub;
 * }, [analysisId]);
 * ```
 */
export function subscribeProgress(
  analysisId: string,
  callbacks: StreamCallbacks,
): () => void {
  const ctrl = new AbortController();
  const url = `${config.apiBaseUrl}/api/v1/analysis/${encodeURIComponent(analysisId)}/stream`;

  // 함수 자체는 동기적으로 unsubscribe를 반환해야 하므로,
  // fetchEventSource Promise는 별도 핸들링하지 않고 콜백으로만 처리.
  void fetchEventSource(url, {
    signal: ctrl.signal,
    // 페이지가 백그라운드여도 연결 유지 (분석은 보통 30~60초)
    openWhenHidden: true,
    onmessage(ev) {
      try {
        const parsed = JSON.parse(ev.data) as ProgressEvent;
        callbacks.onEvent(parsed);
        if (parsed.done) {
          ctrl.abort('done');
          callbacks.onClose?.();
        }
      } catch (err) {
        callbacks.onError?.(
          err instanceof Error ? err : new Error(String(err)),
        );
      }
    },
    onerror(err) {
      // throw하지 않으면 fetch-event-source가 자동 재시도한다.
      // 우리는 즉시 종료시키고 사용자에게 알린다.
      callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
      throw err;
    },
    onclose() {
      callbacks.onClose?.();
    },
  }).catch((err: unknown) => {
    // abort('done')으로 종료된 경우는 정상이므로 무시
    if (ctrl.signal.aborted && ctrl.signal.reason === 'done') return;
    if (err instanceof Error && err.name === 'AbortError') return;
    callbacks.onError?.(err instanceof Error ? err : new Error(String(err)));
  });

  return () => {
    if (!ctrl.signal.aborted) ctrl.abort('unsubscribe');
  };
}
