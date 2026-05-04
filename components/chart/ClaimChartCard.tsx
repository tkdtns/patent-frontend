'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { MatchBadge, AgreeBadge } from '@/components/shared';
import type { ClaimChartRow } from '@/lib/types/output';

interface ClaimChartCardProps {
  row: ClaimChartRow;
  elementLabel?: string | null;
}

export function ClaimChartCard({ row, elementLabel }: ClaimChartCardProps) {
  const [open, setOpen] = useState(false);
  const isBad = row.agreement === '불일치';

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      className={clsx(
        'border rounded-[10px] cursor-pointer transition-all duration-150 overflow-hidden',
        isBad   ? 'bg-[#FFFBF5] border-orange/40' : 'bg-surface border-border',
        open    ? 'shadow-[0_2px_12px_rgba(29,78,216,0.07)]' : 'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
      )}
    >
      {/* 헤더 행 */}
      <div className="px-[18px] py-3.5 flex items-center gap-3">
        <div
          className={clsx(
            'w-[38px] h-[38px] rounded-[7px] flex items-center justify-center text-[11px] font-bold font-mono shrink-0',
            isBad ? 'bg-amber-light text-amber' : 'bg-accent-light text-accent',
          )}
        >
          {row.element_id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-text leading-snug">{row.element_text}</div>
          {elementLabel && (
            <div className="text-[11px] text-muted mt-0.5">{elementLabel}</div>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <div className="text-[10px] text-muted mb-1">우리 판단</div>
            <MatchBadge match={row.our_match} />
          </div>
          {row.examiner_match && (
            <div className="text-right">
              <div className="text-[10px] text-muted mb-1">심사관</div>
              <MatchBadge match={row.examiner_match} />
            </div>
          )}
          <AgreeBadge agreement={row.agreement} />
          <span className="text-muted text-[13px]">{open ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* 펼침 상세 */}
      {open && (
        <div className="border-t border-border-light px-[18px] py-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-bold text-accent uppercase tracking-wide mb-2">우리 측 분석</div>
            <p className="text-[13px] text-text leading-[1.75]">{row.our_explanation}</p>
          </div>
          <div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-2">심사관 판단</div>
            <p className="text-[13px] text-text leading-[1.75]">{row.examiner_explanation ?? '—'}</p>
            {row.prior_art_element && (
              <div className="mt-2.5 px-3 py-2 bg-bg rounded-md text-[12px] text-muted">
                <strong>인용발명 해당부:</strong> {row.prior_art_element}
                {row.prior_art_location && (
                  <span className="ml-1.5 font-mono">({row.prior_art_location})</span>
                )}
              </div>
            )}
          </div>
          {isBad && (
            <div className="col-span-2 px-3.5 py-3 bg-orange-light border border-orange/30 rounded-md">
              <div className="text-[11px] font-bold text-orange mb-1">
                ⚠ 불일치 근거 — 공격 전략 핵심 무기
              </div>
              <p className="text-[13px] text-orange/90 leading-[1.65]">
                {row.disagreement_rationale}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
