'use client';

import { useState }          from 'react';
import { useAnalysisCtx }    from '@/lib/providers/AnalysisProvider';
import { StrategyPanel }     from '@/components/strategy/StrategyPanel';
import { StrategyToggle }    from '@/components/strategy/StrategyToggle';
import { LoadingSpinner }    from '@/components/shared/LoadingSpinner';

type Mode = 'split' | 'off' | 'def';

export default function StrategyPage() {
  const { analysis, isLoading } = useAnalysisCtx();
  const [mode, setMode] = useState<Mode>('split');

  if (isLoading || !analysis) return <LoadingSpinner />;

  const { offensive, defensive } = analysis.strategy;

  return (
    <div className="w-full animate-fadeIn">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-[20px] font-bold text-text mb-1">공격·방어 전략</h2>
          <p className="text-muted text-[13px]">두 전략이 동시 생성됩니다 · 토글로 전환</p>
        </div>
        <StrategyToggle mode={mode} onChange={setMode} />
      </div>

      {mode === 'split' && (
        /* 좁은 화면에서 세로 스택, 넓은 화면에서 나란히 */
        <div className="flex flex-col xl:flex-row gap-4">
          <StrategyPanel strategy={offensive} />
          <StrategyPanel strategy={defensive} />
        </div>
      )}
      {mode === 'off'  && (
        <div className="max-w-[740px]">
          <StrategyPanel strategy={offensive} />
        </div>
      )}
      {mode === 'def'  && (
        <div className="max-w-[740px]">
          <StrategyPanel strategy={defensive} />
        </div>
      )}
    </div>
  );
}
