/**
 * 분석 진행률 SSE 스트림을 구독하는 React Hook.
 *
 * 사용 예:
 * ```tsx
 * const { events, status, currentRatio, currentStep, error } =
 *   useAnalysisStream(analysisId);
 *
 * if (status === 'done') router.replace(`/analysis/${appNum}/summary`);
 * ```
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { api } from '../api';
import type { ProgressEvent } from '../types/analysis';

export type StreamStatus = 'idle' | 'streaming' | 'done' | 'error';

export interface UseAnalysisStreamResult {
  events: ProgressEvent[];
  status: StreamStatus;
  currentRatio: number;
  currentStep: string | null;
  error: Error | null;
}

export function useAnalysisStream(
  analysisId: string | null,
): UseAnalysisStreamResult {
  const [events, setEvents] = useState<ProgressEvent[]>([]);
  const [status, setStatus] = useState<StreamStatus>('idle');
  const [error, setError] = useState<Error | null>(null);

  // analysisId가 null/빈 문자열로 시작했다가 나중에 채워지는 경우를
  // 안전하게 처리하기 위해 ref 보관
  const subscribedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!analysisId) {
      setStatus('idle');
      return;
    }

    // 같은 ID로 재구독 방지
    if (subscribedIdRef.current === analysisId) return;
    subscribedIdRef.current = analysisId;

    setEvents([]);
    setError(null);
    setStatus('streaming');

    const unsubscribe = api.subscribeProgress(analysisId, {
      onEvent: (ev) => {
        setEvents((prev) => [...prev, ev]);
        if (ev.done) {
          setStatus(ev.error ? 'error' : 'done');
          if (ev.error) setError(new Error(ev.error));
        }
      },
      onError: (err) => {
        setError(err);
        setStatus('error');
      },
    });

    return () => {
      subscribedIdRef.current = null;
      unsubscribe();
    };
  }, [analysisId]);

  const lastEvent = events[events.length - 1] ?? null;

  return {
    events,
    status,
    currentRatio: lastEvent?.ratio ?? 0,
    currentStep: lastEvent?.step ?? null,
    error,
  };
}
