import { LeveragedDifferences } from './LeveragedDifferences';
import type { Strategy }         from '@/lib/types/output';

const TITLES: Record<string, string> = {
  공격: '심사관 판단 반박 — 보정 없이 대응',
  방어: '선택적 한정 보정 — 진보성 확보',
};

interface StrategyPanelProps {
  strategy: Strategy;
}

export function StrategyPanel({ strategy }: StrategyPanelProps) {
  const isOff = strategy.strategy_type === '공격';
  return (
    <div
      className={`flex-1 bg-surface border rounded-[10px] px-6 py-[22px] min-w-0 ${
        isOff ? 'border-orange/40' : 'border-accent-border'
      }`}
    >
      <div className="flex items-center gap-2 mb-3.5">
        <span className="text-[18px]">{isOff ? '⚔️' : '🛡️'}</span>
        <span
          className={`text-[12px] font-bold px-2.5 py-0.5 rounded ${
            isOff ? 'bg-amber-light text-amber' : 'bg-accent-light text-accent'
          }`}
        >
          {strategy.strategy_type} 전략
        </span>
      </div>

      <h3 className="font-serif text-[15px] font-bold text-text mb-3">
        {TITLES[strategy.strategy_type]}
      </h3>

      <p className="text-[13.5px] text-text leading-[1.85] mb-4">{strategy.rationale}</p>

      <div className="bg-bg rounded-lg px-4 py-3.5 mb-4">
        <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-1.5">
          제안 행동 Proposed Action
        </div>
        <p className="text-[13px] text-text leading-[1.7]">{strategy.proposed_action}</p>
      </div>

      <LeveragedDifferences elementIds={strategy.leveraged_differences} />
    </div>
  );
}
