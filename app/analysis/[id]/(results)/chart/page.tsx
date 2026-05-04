'use client';

import { useAnalysisCtx }  from '@/lib/providers/AnalysisProvider';
import { ClaimChartList }  from '@/components/chart/ClaimChartList';
import { LoadingSpinner }  from '@/components/shared/LoadingSpinner';

export default function ChartPage() {
  const { analysis, isLoading } = useAnalysisCtx();

  if (isLoading || !analysis) return <LoadingSpinner />;

  const disagreements = analysis.claim_chart.charts
    .flatMap((c) => c.rows)
    .filter((r) => r.agreement === '불일치').length;

  return (
    <div className="max-w-[860px] mx-auto animate-fadeIn">
      <h2 className="font-serif text-[20px] font-bold text-text mb-1">
        Claim Chart — 구성비교표
      </h2>
      <p className="text-muted text-[13px] mb-5">
        카드를 클릭하면 상세 비교가 펼쳐집니다
        {disagreements > 0 && (
          <span className="ml-2 text-orange font-bold">· 불일치 {disagreements}건</span>
        )}
      </p>
      <ClaimChartList
        charts={analysis.claim_chart.charts}
        claims={analysis.claim_parse.claims}
      />
    </div>
  );
}
