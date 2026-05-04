const DEFAULT_SUGGESTIONS = [
  '구성요소 1-A의 불일치 근거를 설명해줘',
  '공격 전략에서 활용할 실험 데이터는?',
  '방어 보정안의 뒷받침 단락이 충분한지 확인해줘',
];

interface SuggestionChipsProps {
  suggestions?: string[];
  onSelect: (text: string) => void;
}

export function SuggestionChips({
  suggestions = DEFAULT_SUGGESTIONS,
  onSelect,
}: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-border-light">
      {suggestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="text-[11px] px-2.5 py-1 rounded-full bg-accent-light text-accent border border-accent-border font-semibold cursor-pointer hover:bg-accent hover:text-white transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
