'use client';

import { usePathname } from 'next/navigation';

/** 탭별 빠른 질문 목록 */
const TAB_SUGGESTIONS: Record<string, string[]> = {
  summary: [
    '거절이유 핵심 쟁점을 요약해줘',
    '인용발명 대비 가장 취약한 구성요소는?',
    '특허성 판단 근거를 설명해줘',
  ],
  chart: [
    'Claim Chart에서 불일치 항목을 모두 나열해줘',
    '구성요소 대응 중 가장 유리한 항목은?',
    '매핑 신뢰도가 낮은 구성요소를 확인해줘',
  ],
  strategy: [
    '현재 전략의 성공 가능성을 평가해줘',
    '공격 전략과 방어 전략 중 어떤 게 유리해?',
    '전략 선택 시 주의할 법적 리스크는?',
  ],
  amendments: [
    '보정항의 뒷받침 단락이 충분한지 확인해줘',
    '청구항 1을 더 강하게 보정하는 안을 제안해줘',
    '보정 후 선행기술 회피 가능성은?',
  ],
};

const DEFAULT_SUGGESTIONS = [
  '구성요소 1-A의 불일치 근거를 설명해줘',
  '공격 전략에서 활용할 실험 데이터는?',
  '방어 보정안의 뒷받침 단락이 충분한지 확인해줘',
];

interface SuggestionChipsProps {
  /** 명시적으로 전달하면 pathname 감지를 무시 */
  suggestions?: string[];
  onSelect: (text: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  const pathname = usePathname();

  // 현재 탭 감지: /analysis/[id]/(results)/summary|chart|strategy|amendments
  const tab = pathname?.split('/').at(-1) ?? '';
  const chips = suggestions ?? TAB_SUGGESTIONS[tab] ?? DEFAULT_SUGGESTIONS;

  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t border-border-light">
      {chips.map((q) => (
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
