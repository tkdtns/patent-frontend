interface LeveragedDifferencesProps {
  elementIds: string[];
}

export function LeveragedDifferences({ elementIds }: LeveragedDifferencesProps) {
  return (
    <div>
      <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-1.5">
        활용 구성요소
      </div>
      <div className="flex flex-wrap gap-1.5">
        {elementIds.map((id) => (
          <span
            key={id}
            className="font-mono text-[12px] px-2.5 py-0.5 rounded bg-accent-light text-accent font-bold"
          >
            {id}
          </span>
        ))}
      </div>
    </div>
  );
}
