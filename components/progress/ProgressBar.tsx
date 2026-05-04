interface ProgressBarProps {
  ratio: number;       /* 0.0 ~ 1.0 */
  label: string | null;
}

export function ProgressBar({ ratio, label }: ProgressBarProps) {
  const pct = Math.round(ratio * 100);
  return (
    <div>
      <div className="flex justify-between mb-2.5">
        <span className="text-[14px] font-bold text-text">
          {label ?? '대기 중'}
        </span>
        <span className="text-[13px] font-bold text-accent">{pct}%</span>
      </div>
      <div className="h-1.5 bg-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-[width] duration-75 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
