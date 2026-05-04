import type { Match, Agreement } from '../types/output';

/** Match 값 → Tailwind 색상 클래스 */
export function matchColor(match: Match): string {
  if (match === '동일') return 'text-red-600';
  if (match === '유사') return 'text-amber-600';
  return 'text-green-700'; // 차이
}

/** Agreement 값 → 배경 색상 클래스 */
export function agreementBg(agreement: Agreement | null): string {
  if (agreement === '불일치') return 'bg-red-50 border-red-200';
  if (agreement === '일치') return 'bg-emerald-50 border-emerald-200';
  return 'bg-neutral-50 border-neutral-200';
}
