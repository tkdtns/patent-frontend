/**
 * Mock SSE 진행률 시뮬레이터.
 * setTimeout 기반으로 백엔드 6 Tool 단계를 재현한다.
 */

import type { StreamCallbacks } from '../api/stream';
import { MOCK_PROGRESS_STEPS } from './data';

export function simulateProgress(
  _analysisId: string,
  callbacks: StreamCallbacks,
): () => void {
  let cancelled = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  let elapsed = 0;
  for (const step of MOCK_PROGRESS_STEPS) {
    elapsed += step.durationMs;
    const { step: name, ratio, durationMs } = step;

    // 진행 중 이벤트
    const midTimer = setTimeout(() => {
      if (cancelled) return;
      callbacks.onEvent({ step: name, ratio: ratio * 0.5, done: false });
    }, elapsed - durationMs / 2);

    // 완료 이벤트
    const doneTimer = setTimeout(() => {
      if (cancelled) return;
      const isLast = ratio === 1.0;
      callbacks.onEvent({ step: name, ratio, done: isLast });
      if (isLast) callbacks.onClose?.();
    }, elapsed);

    timers.push(midTimer, doneTimer);
  }

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}
