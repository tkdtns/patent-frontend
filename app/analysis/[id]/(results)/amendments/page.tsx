'use client';

import { useState }            from 'react';
import { useAnalysisCtx }      from '@/lib/providers/AnalysisProvider';
import { AmendmentToggle, type ActiveDraft } from '@/components/amendments/AmendmentToggle';
import { AmendedClaimCard }    from '@/components/amendments/AmendedClaimCard';
import { DiffLegend }          from '@/components/amendments/DiffLegend';
import { LoadingSpinner }      from '@/components/shared/LoadingSpinner';

export default function AmendmentsPage() {
  const { analysis, isLoading } = useAnalysisCtx();
  const [active, setActive] = useState<ActiveDraft>('defensive');

  if (isLoading || !analysis) return <LoadingSpinner />;

  const draft =
    active === 'offensive'
      ? analysis.amendment.offensive_draft
      : analysis.amendment.defensive_draft;

  return (
    <div className="max-w-[800px] mx-auto animate-fadeIn">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-[20px] font-bold text-text mb-1">보정청구항</h2>
          <p className="text-muted text-[13px]">Amended Claims · 인라인 하이라이트 Diff</p>
        </div>
        <AmendmentToggle active={active} onChange={setActive} />
      </div>

      {/* 전략 설명 */}
      <div className="bg-surface border border-border rounded-[10px] px-[22px] py-[18px] mb-3.5">
        <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2">전략 설명</div>
        <p className="text-[14px] text-text leading-[1.8]">{draft.overall_explanation}</p>
      </div>

      {/* 청구항 카드들 */}
      <div className="flex flex-col gap-3.5">
        {draft.amended_claims.map((cl) => (
          <AmendedClaimCard key={cl.claim_number} claim={cl} />
        ))}
      </div>

      {/* 범례 */}
      <div className="mt-3.5">
        <DiffLegend />
      </div>
    </div>
  );
}
