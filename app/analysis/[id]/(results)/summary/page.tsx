'use client';

import { useState, useCallback } from 'react';
import { useAnalysisCtx } from '@/lib/providers/AnalysisProvider';
import { KpiCard }            from '@/components/summary/KpiCard';
import { DisagreementAlert }  from '@/components/summary/DisagreementAlert';
import { RejectionReasonCard } from '@/components/summary/RejectionReasonCard';
import { CitedArtsList }      from '@/components/summary/CitedArtsList';
import { CitedArtModal }      from '@/components/summary/CitedArtModal';
import { LoadingSpinner }     from '@/components/shared/LoadingSpinner';
import { api }                from '@/lib/api';
import type { CitedArtDetail } from '@/lib/types/output';

export default function SummaryPage() {
  const { analysis, isLoading } = useAnalysisCtx();

  /* 인용발명 모달 상태 */
  const [selectedArt, setSelectedArt] = useState<CitedArtDetail | null>(null);
  const [artLoading, setArtLoading]   = useState(false);

  const handleSelectArt = useCallback(async (citedArtId: string) => {
    if (!analysis) return;
    setArtLoading(true);
    try {
      const detail = await api.getCitedArtDetail(analysis.application_number, citedArtId);
      setSelectedArt(detail);
    } catch (err) {
      console.error('인용발명 상세 로드 실패:', err);
    } finally {
      setArtLoading(false);
    }
  }, [analysis]);

  const handleCloseModal = useCallback(() => setSelectedArt(null), []);

  if (isLoading || !analysis) return <LoadingSpinner />;

  const oa           = analysis.office_action;
  const rr           = oa.rejection_reasons[0];
  const allRows      = analysis.claim_chart.charts.flatMap((c) => c.rows);
  const disagreements = allRows.filter((r) => r.agreement === '불일치');
  const analysisDate = new Date(analysis.created_at).toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });

  return (
    <>
      <div className="max-w-[760px] mx-auto animate-fadeIn">
        {/* 헤더 */}
        <h2 className="font-serif text-[20px] font-bold text-text mb-1">분석 리포트 요약</h2>
        <p className="text-muted text-[13px] mb-6">
          Analysis Report · {analysis.analysis_id} · {analysisDate}
        </p>

        {/* 불일치 배너 */}
        <DisagreementAlert
          elementIds={disagreements.map((r) => r.element_id)}
        />

        {/* KPI 카드 */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <KpiCard
            label="거절 청구항"
            value={oa.rejected_claim_numbers.join(', ')}
            sub={`총 ${oa.rejected_claim_numbers.length}항`}
            colorClass="text-red"
          />
          <KpiCard
            label="거절 근거"
            value={rr?.rejection_type ?? '—'}
            sub={rr?.article ?? ''}
            colorClass="text-amber"
          />
          <KpiCard
            label="인용발명"
            value={`${oa.cited_arts.length}건`}
            sub={oa.cited_arts.map((a) => a.cited_art_id).join(' · ')}
            colorClass="text-accent"
          />
          <KpiCard
            label="불일치 항목"
            value={`${disagreements.length}건`}
            sub="심사관 판단 오류"
            colorClass="text-orange"
          />
        </div>

        {/* 거절이유 카드들 */}
        <div className="flex flex-col gap-3 mb-3.5">
          {oa.rejection_reasons.map((r, i) => (
            <RejectionReasonCard key={i} reason={r} />
          ))}
        </div>

        {/* 인용문헌 — 클릭 시 상세 모달 */}
        <div className="relative">
          <CitedArtsList
            arts={oa.cited_arts}
            onSelect={handleSelectArt}
          />
          {artLoading && (
            <div className="absolute inset-0 bg-surface/70 rounded-lg flex items-center justify-center">
              <span className="text-[12px] text-muted animate-pulse">불러오는 중…</span>
            </div>
          )}
        </div>
      </div>

      {/* 인용발명 상세 모달 */}
      {selectedArt && (
        <CitedArtModal detail={selectedArt} onClose={handleCloseModal} />
      )}
    </>
  );
}
