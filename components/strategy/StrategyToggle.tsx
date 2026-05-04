'use client';

type Mode = 'split' | 'off' | 'def';

interface StrategyToggleProps {
  mode: Mode;
  onChange: (m: Mode) => void;
}

const MODES: [Mode, string][] = [
  ['split', '분할 화면'],
  ['off',   '⚔️ 공격'],
  ['def',   '🛡️ 방어'],
];

export function StrategyToggle({ mode, onChange }: StrategyToggleProps) {
  return (
    <div className="flex bg-bg border border-border rounded-lg overflow-hidden">
      {MODES.map(([v, l]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-3.5 py-1.5 text-[12px] font-bold border-none cursor-pointer transition-all ${
            mode === v
              ? 'bg-accent text-white'
              : 'bg-transparent text-muted hover:text-text'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
