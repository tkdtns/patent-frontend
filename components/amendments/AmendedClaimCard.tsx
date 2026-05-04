import { DiffRenderer }  from '@/components/shared';
import { SpecBasisChips } from './SpecBasisChips';
import type { AmendedClaim } from '@/lib/types/output';

interface AmendedClaimCardProps {
  claim: AmendedClaim;
}

export function AmendedClaimCard({ claim }: AmendedClaimCardProps) {
  return (
    <div className="bg-surface border border-border rounded-[10px] overflow-hidden">
      {/* 헤더 바 */}
      <div className="px-[18px] py-3 border-b border-border-light bg-bg flex items-center gap-3">
        <span className="font-mono text-[13px] font-bold text-accent">
          청구항 {claim.claim_number}
        </span>
        <span className="text-[12px] text-muted">{claim.diff_summary}</span>
        {claim.is_same && (
          <span className="text-[11px] px-2 py-0.5 rounded bg-green-light text-green font-bold">
            보정 없음
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="px-[22px] py-5">
        <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2.5">
          {claim.is_same ? '원문 (보정 없음)' : '보정 후 청구항 (인라인 차이)'}
        </div>
        <div className="font-serif text-[14.5px] leading-[2.1] text-text px-[18px] py-4 bg-bg rounded-lg">
          {claim.is_same || !claim.diff
            ? claim.original_text
            : <DiffRenderer tokens={claim.diff} />}
        </div>
      </div>

      {/* 명세서 뒷받침 */}
      {!claim.is_same && claim.spec_basis.length > 0 && (
        <div className="px-[22px] pb-5 pt-2.5 border-t border-border-light">
          <SpecBasisChips ids={claim.spec_basis} />
        </div>
      )}
    </div>
  );
}
