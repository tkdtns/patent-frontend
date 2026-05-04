import type { RejectionReason } from '@/lib/types/output';

const REJECTION_TYPE_STYLE: Record<string, string> = {
  진보성: 'bg-red-light text-red',
  신규성: 'bg-amber-light text-amber',
  기재불비: 'bg-accent-light text-accent',
  기타:    'bg-bg-muted text-muted',
};

interface RejectionReasonCardProps {
  reason: RejectionReason;
}

export function RejectionReasonCard({ reason }: RejectionReasonCardProps) {
  const badge = REJECTION_TYPE_STYLE[reason.rejection_type] ?? REJECTION_TYPE_STYLE['기타'];
  return (
    <div className="bg-surface border border-border rounded-lg px-6 py-5">
      <div className="flex items-center gap-2.5 mb-3">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${badge}`}>
          {reason.rejection_type} 거절
        </span>
        <span className="text-[11px] text-muted font-mono">{reason.article}</span>
      </div>
      <p className="text-[14px] text-text leading-[1.8]">{reason.examiner_reasoning}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {reason.target_claim_numbers.map((n) => (
          <span key={n} className="font-mono text-[11px] px-2 py-0.5 bg-bg border border-border-light rounded text-muted">
            청구항 {n}
          </span>
        ))}
      </div>
    </div>
  );
}
