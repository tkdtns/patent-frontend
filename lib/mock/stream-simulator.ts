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
  let prevRatio = 0;           // 이전 단계 완료 ratio 추적 (역방향 방지)
  for (const step of MOCK_PROGRESS_STEPS) {
    elapsed += step.durationMs;
    const { step: name, ratio, durationMs } = step;

    // mid ratio = 이전 단계 ratio → 현재 단계 ratio 의 중간값 (절대 역방향 없음)
    const midRatio = prevRatio + (ratio - prevRatio) * 0.5;

    // 진행 중 이벤트
    const midTimer = setTimeout(() => {
      if (cancelled) return;
      callbacks.onEvent({ step: name, ratio: midRatio, done: false });
    }, elapsed - durationMs / 2);

    // 완료 이벤트
    const doneTimer = setTimeout(() => {
      if (cancelled) return;
      const isLast = ratio === 1.0;
      callbacks.onEvent({ step: name, ratio, done: isLast });
      if (isLast) callbacks.onClose?.();
    }, elapsed);

    timers.push(midTimer, doneTimer);
    prevRatio = ratio;
  }

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}
