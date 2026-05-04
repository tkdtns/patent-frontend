'use client';

export type ActiveDraft = 'offensive' | 'defensive';

interface AmendmentToggleProps {
  active: ActiveDraft;
  onChange: (v: ActiveDraft) => void;
}

export function AmendmentToggle({ active, onChange }: AmendmentToggleProps) {
  return (
    <div className="flex bg-bg border border-border rounded-lg overflow-hidden">
      {(['offensive', 'defensive'] as ActiveDraft[]).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`px-4 py-1.5 text-[12px] font-bold border-none cursor-pointer transition-all ${
            active === v ? 'bg-accent text-white' : 'bg-transparent text-muted hover:text-text'
          }`}
        >
          {v === 'offensive' ? '⚔️ 공격안' : '🛡️ 방어안'}
        </button>
      ))}
    </div>
  );
}
