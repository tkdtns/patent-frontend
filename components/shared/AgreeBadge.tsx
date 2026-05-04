import { clsx } from 'clsx';
import type { Agreement } from '@/lib/types/output';

export function AgreeBadge({ agreement, className }: { agreement: Agreement | null; className?: string }) {
  if (!agreement) return null;
  const ok = agreement === '일치';
  return (
    <span
      className={clsx(
        'inline-block px-2 py-0.5 rounded text-[11px] font-bold border',
        ok
          ? 'bg-green-light text-green border-green/30'
          : 'bg-orange-light text-orange border-orange/30',
        className,
      )}
    >
      {ok ? '✓ 일치' : '⚠ 불일치'}
    </span>
  );
}
