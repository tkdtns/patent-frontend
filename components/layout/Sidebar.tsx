'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { useAnalysisCtx } from '@/lib/providers/AnalysisProvider';

const NAV = [
  { id: 'summary',    icon: '📊', label: '분석 요약',      sub: 'Summary'    },
  { id: 'chart',      icon: '📋', label: 'Claim Chart',    sub: 'Comparison' },
  { id: 'strategy',   icon: '⚔️',  label: '공격·방어 전략', sub: 'Strategy'   },
  { id: 'amendments', icon: '📝', label: '보정청구항',      sub: 'Amendments' },
];

export function Sidebar({ applicationNumber }: { applicationNumber: string }) {
  const pathname  = usePathname();
  const { analysis } = useAnalysisCtx();

  /* 불일치 건수 — Claim Chart 탭 배지 */
  const disagreements = analysis?.claim_chart.charts
    .flatMap((c) => c.rows)
    .filter((r) => r.agreement === '불일치').length ?? 0;

  const version   = analysis?.version ?? 1;
  const createdAt = analysis?.created_at
    ? new Date(analysis.created_at).toLocaleDateString('ko-KR')
    : '—';

  return (
    <aside className="w-sidebar bg-surface border-r border-border fixed top-0 left-0 bottom-0 flex flex-col z-20">
      {/* 브랜드 */}
      <div className="px-[18px] py-5 border-b border-border-light">
        <div className="text-[10px] tracking-[2px] text-muted font-bold uppercase">Patent AI</div>
        <div className="text-[13px] font-bold text-text mt-0.5">심사대응 플랫폼</div>
      </div>

      {/* 현재 사건 */}
      <div className="px-[18px] py-3 border-b border-border-light bg-bg">
        <div className="text-[9px] text-muted font-bold uppercase tracking-wide mb-1">현재 사건</div>
        <div className="text-[11.5px] font-bold text-accent font-mono mb-0.5 truncate">
          {applicationNumber}
        </div>
        <div className="text-[11px] text-muted leading-snug truncate">
          {analysis
            ? analysis.claim_parse.claims[0]?.original_text.slice(0, 20) + '…'
            : '로딩 중...'}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green" />
          <span className="text-[11px] text-green font-bold">분석 완료</span>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 px-2 py-2.5 overflow-y-auto">
        {NAV.map((n) => {
          const href   = `/analysis/${encodeURIComponent(applicationNumber)}/${n.id}`;
          const active = pathname.includes(`/${n.id}`);
          const badge  = n.id === 'chart' && disagreements > 0 ? `⚠${disagreements}` : undefined;
          return (
            <Link
              key={n.id}
              href={href}
              className={clsx(
                'flex items-center gap-2.5 px-2.5 py-2.5 rounded-md mb-0.5 transition-all duration-100 no-underline',
                active ? 'bg-accent-light text-accent' : 'text-muted hover:bg-bg hover:text-text',
              )}
            >
              <span className="text-[15px] leading-none">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <div className={clsx('text-[12.5px] leading-tight', active ? 'font-bold' : 'font-medium')}>
                  {n.label}
                </div>
                <div className="text-[10px] opacity-70">{n.sub}</div>
              </div>
              {badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-light text-orange font-bold">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 새 분석 시작 */}
      <div className="px-2 py-2.5 border-t border-border-light">
        <Link
          href="/upload"
          className="flex items-center gap-2 px-2.5 py-2 rounded-md text-muted hover:bg-bg hover:text-accent transition-all duration-100 no-underline group"
        >
          <span className="text-[15px] leading-none">＋</span>
          <span className="text-[12px] font-medium group-hover:font-bold">새 분석 시작</span>
        </Link>
      </div>

      {/* 푸터 */}
      <div className="px-4 py-3 border-t border-border-light text-[10px] text-light">
        v{version} · {createdAt}
      </div>
    </aside>
  );
}
