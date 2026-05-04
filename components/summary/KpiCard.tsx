interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  colorClass: string; /* text-* Tailwind 클래스 */
}

export function KpiCard({ label, value, sub, colorClass }: KpiCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg px-4 py-4">
      <div className="text-[10px] text-muted font-bold uppercase tracking-wide mb-1.5">
        {label}
      </div>
      <div className={`text-[20px] font-bold mb-0.5 ${colorClass}`}>{value}</div>
      <div className="text-[11px] text-muted">{sub}</div>
    </div>
  );
}
