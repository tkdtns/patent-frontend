'use client';

import { useEffect, useRef } from 'react';
import type { CitedArtDetail } from '@/lib/types/output';

interface CitedArtModalProps {
  detail: CitedArtDetail;
  onClose: () => void;
}

export function CitedArtModal({ detail, onClose }: CitedArtModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* ESC 키 닫기 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  /* 바깥 클릭 닫기 */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={handleBackdropClick}
    >
      {/* 드로어 패널 */}
      <div
        ref={panelRef}
        className="relative h-full w-full max-w-[520px] bg-surface shadow-2xl flex flex-col animate-fadeIn overflow-hidden"
        style={{ animationDuration: '0.18s' }}
      >
        {/* 헤더 */}
        <div className="px-6 py-5 border-b border-border-light flex items-start justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">
              인용발명 상세 · {detail.cited_art_id}
            </div>
            <h2 className="text-[15px] font-bold text-text leading-snug break-keep">
              {detail.title}
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-2 text-[11.5px] text-muted">
              <span className="font-mono">{detail.document_number}</span>
              <span>·</span>
              <span>{detail.applicant}</span>
              <span>·</span>
              <span>출원 {detail.filing_date}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-muted hover:text-text text-[18px] leading-none transition-colors mt-0.5"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 본문 — 스크롤 */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* 요약 */}
          <section>
            <SectionTitle icon="📄" text="발명의 요약" />
            <p className="text-[13px] text-text leading-[1.85] break-keep">
              {detail.abstract}
            </p>
          </section>

          {/* 주요 청구항 */}
          {detail.key_claims.length > 0 && (
            <section>
              <SectionTitle icon="📋" text="주요 청구항" />
              <div className="flex flex-col gap-2">
                {detail.key_claims.map((c) => (
                  <div
                    key={c.claim_number}
                    className="bg-bg border border-border-light rounded-lg px-4 py-3"
                  >
                    <div className="text-[10px] font-bold text-accent uppercase tracking-wide mb-1">
                      청구항 {c.claim_number}
                    </div>
                    <p className="text-[12.5px] text-text leading-[1.8] break-keep">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 관련 단락 */}
          {detail.relevant_paragraphs.length > 0 && (
            <section>
              <SectionTitle icon="🔍" text="관련 명세서 단락" />
              <div className="flex flex-col gap-2">
                {detail.relevant_paragraphs.map((p) => (
                  <div
                    key={p.paragraph_id}
                    className="bg-bg border border-border-light rounded-lg px-4 py-3"
                  >
                    <div className="text-[10px] font-bold text-muted uppercase tracking-wide mb-1 font-mono">
                      [{p.paragraph_id}]
                    </div>
                    <p className="text-[12.5px] text-text leading-[1.8] break-keep">
                      {p.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2.5">
      <span className="text-[14px]">{icon}</span>
      <span className="text-[11px] font-bold text-muted uppercase tracking-wide">{text}</span>
    </div>
  );
}
