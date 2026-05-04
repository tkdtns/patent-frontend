import { clsx } from 'clsx';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * 데이터가 없는 상태를 표시하는 공통 컴포넌트.
 * ClaimChartList, CitedArtsList 등 여러 곳에서 재사용.
 */
export function EmptyState({
  icon = '📭',
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-2 py-16 text-center text-text-secondary',
        className,
      )}
    >
      <span className="text-4xl" role="img" aria-hidden>
        {icon}
      </span>
      <p className="font-semibold text-sm">{title}</p>
      {description && (
        <p className="text-xs text-text-muted max-w-xs">{description}</p>
      )}
    </div>
  );
}
