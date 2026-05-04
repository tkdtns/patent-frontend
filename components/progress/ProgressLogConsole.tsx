'use client';

import { useEffect, useRef } from 'react';
import type { ProgressEvent } from '@/lib/types/analysis';

interface ProgressLogConsoleProps {
  events: ProgressEvent[];
  streaming: boolean;
}

export function ProgressLogConsole({ events, streaming }: ProgressLogConsoleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [events]);

  return (
    <div
      ref={ref}
      className="bg-[#12121E] rounded-lg px-4 py-3.5 h-[140px] overflow-y-auto font-mono text-[12px] leading-[1.7]"
    >
      {events.map((e, i) => (
        <div
          key={i}
          className={e.done ? 'text-[#34D399]' : 'text-[#93C5FD]'}
        >
          <span className="text-[#374151] mr-2">
            [{new Date().toLocaleTimeString('ko-KR', { hour12: false })}]
          </span>
          {e.done ? `✓ ${e.step} 완료` : `${e.step} 실행 중...`}
        </div>
      ))}
      {streaming && (
        <span className="text-[#4B5563] animate-blink">▋</span>
      )}
    </div>
  );
}
