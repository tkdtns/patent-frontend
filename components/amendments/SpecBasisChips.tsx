interface SpecBasisChipsProps {
  ids: string[];
}

export function SpecBasisChips({ ids }: SpecBasisChipsProps) {
  if (!ids.length) return null;
  return (
    <div>
      <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2">
        명세서 뒷받침 단락 Spec Basis
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ids.map((id) => (
          <span
            key={id}
            className="font-mono text-[12px] px-2.5 py-0.5 rounded bg-accent-light text-accent font-bold"
          >
            [{id}]
          </span>
        ))}
      </div>
    </div>
  );
}
