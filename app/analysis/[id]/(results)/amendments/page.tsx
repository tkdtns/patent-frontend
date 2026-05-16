'use client';

import { useState }            from 'react';
import { useAnalysisCtx }      from '@/lib/providers/AnalysisProvider';
import { AmendmentToggle, type ActiveDraft } from '@/components/amendments/AmendmentToggle';
import { AmendedClaimCard }    from '@/components/amendments/AmendedClaimCard';
import { DiffLegend }          from '@/components/amendments/DiffLegend';
import { RerunPanel }          from '@/components/amendments/RerunPanel';
import { LoadingSpinner }      from '@/components/shared/LoadingSpinner';
import { api }                 from '@/lib/api';

export default function AmendmentsPage() {
  const { analysis, isLoading, mutate } = useAnalysisCtx();
  const [active, setActive]    = useState<ActiveDraft>('defensive');
  const [rerunning, setRerunning] = useState(false);
  const [rerunError, setRerunError] = useState<string | null>(null);

  if (isLoading || !analysis) return <LoadingSpinner />;

  const draft =
    active === 'offensive'
      ? analysis.amendment.offensive_draft
      : analysis.amendment.defensive_draft;

  const handleRerun = async (instruction: string) => {
    setRerunning(true);
    setRerunError(null);
    try {
      await api.rerunAmendment(analysis.application_number, {
        user_instruction: instruction,
      });
      // SWR 캐시 무효화 → 최신 결과 다시 fetch
      mutate();
    } catch (e) {
      setRerunError(e instanceof Error ? e.message : '재생성 중 오류가 발생했습니다.');
    } finally {
      setRerunning(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto animate-fadeIn">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-[20px] font-bold text-text mb-1">보정청구항</h2>
          <p className="text-muted text-[13px]">
            Amended Claims · 인라인 하이라이트 Diff
            {analysis.version > 1 && (
              <span className="ml-2 text-accent font-semibold">v{analysis.version}</span>
            )}
          </p>
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

      {/* 재생성 패널 */}
      <RerunPanel loading={rerunning} onRerun={handleRerun} />

      {/* 재생성 에러 */}
      {rerunError && (
        <div className="mt-2 px-4 py-3 rounded-lg bg-red-light border border-red text-red text-[13px]">
          {rerunError}
        </div>
      )}

      {/* 재생성 로딩 오버레이 */}
      {rerunning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-surface rounded-[14px] px-8 py-6 flex flex-col items-center gap-3 shadow-panel">
            <div
              className="w-8 h-8 rounded-full border-[3px] border-accent border-t-transparent"
              style={{ animation: 'spin 0.7s linear infinite' }}
            />
            <p className="text-[14px] font-semibold text-text">보정청구항 재생성 중...</p>
            <p className="text-[12px] text-muted">Tool 6 LLM 호출 중입니다</p>
          </div>
        </div>
      )}
    </div>
  );
}
