import { clsx } from 'clsx';
import type { Match } from '@/lib/types/output';

/** HTML 프로토타입 Badge 색상과 동일: 동일=green, 유사=amber, 차이=red */
const MATCH_STYLES: Record<Match, string> = {
  동일: 'bg-match-same-bg   text-match-same',
  유사: 'bg-match-similar-bg text-match-similar',
  차이: 'bg-match-diff-bg   text-match-diff',
};

export function MatchBadge({ match, className }: { match: Match; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded text-[12px] font-bold',
        MATCH_STYLES[match],
        className,
      )}
    >
      {match}
    </span>
  );
}

type Variant = 'accent' | 'red' | 'green' | 'amber' | 'muted';

const VARIANT_STYLES: Record<Variant, string> = {
  accent: 'bg-accent-light text-accent',
  red:    'bg-red-light text-red',
  green:  'bg-green-light text-green',
  amber:  'bg-amber-light text-amber',
  muted:  'bg-bg-muted text-muted',
};

export function Badge({
  label,
  variant = 'muted',
  className,
}: {
  label: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded text-[11px] font-bold',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
