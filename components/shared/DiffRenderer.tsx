import { clsx } from 'clsx';
import type { DiffToken } from '@/lib/types/output';

interface DiffRendererProps {
  tokens: DiffToken[];
  className?: string;
}

/**
 * 인라인 diff 토큰 배열을 시각화한다.
 *
 * - `add`: 초록 배경 + 밑줄
 * - `del`: 빨강 배경 + 취소선
 * - `same`: 기본 텍스트
 *
 * AmendedClaimCard, 미래의 Chat 제안 등 3곳 이상에서 재사용 예정.
 */
export function DiffRenderer({ tokens, className }: DiffRendererProps) {
  return (
    <span className={clsx('leading-relaxed', className)}>
      {tokens.map((tok, i) => {
        if (tok.t === 'add') {
          return (
            <ins
              key={i}
              className="bg-diff-add-bg text-diff-add no-underline rounded-sm px-0.5"
            >
              {tok.s}
            </ins>
          );
        }
        if (tok.t === 'del') {
          return (
            <del
              key={i}
              className="bg-diff-del-bg text-diff-del line-through rounded-sm px-0.5"
            >
              {tok.s}
            </del>
          );
        }
        return <span key={i}>{tok.s}</span>;
      })}
    </span>
  );
}
