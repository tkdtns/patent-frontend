import { ClaimChartCard } from './ClaimChartCard';
import { EmptyState }      from '@/components/shared';
import type { ClaimChart } from '@/lib/types/output';
import type { Claim }      from '@/lib/types/output';

interface ClaimChartListProps {
  charts: ClaimChart[];
  claims: Claim[];
}

export function ClaimChartList({ charts, claims }: ClaimChartListProps) {
  if (!charts.length) {
    return <EmptyState icon="📋" title="Claim Chart 데이터가 없습니다." />;
  }

  return (
    <div className="flex flex-col gap-7">
      {charts.map((chart) => {
        const claim = claims.find((c) => c.claim_number === chart.target_claim_number);
        return (
          <section key={chart.target_claim_number}>
            <h3 className="text-[13px] font-bold text-muted uppercase tracking-wide mb-3">
              청구항 {chart.target_claim_number}
              {claim?.claim_type && (
                <span className="ml-2 text-[11px] normal-case font-normal">
                  ({claim.claim_type})
                </span>
              )}
            </h3>
            <div className="flex flex-col gap-2.5">
              {chart.rows.map((row) => {
                const elem = claim?.elements.find((e) => e.element_id === row.element_id);
                return (
                  <ClaimChartCard key={row.element_id} row={row} elementLabel={elem?.label} />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
