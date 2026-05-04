import type { CitedArtRef } from '@/lib/types/output';

export function CitedArtsList({ arts }: { arts: CitedArtRef[] }) {
  return (
    <div className="bg-surface border border-border rounded-lg px-6 py-5">
      <div className="text-[12px] font-bold text-text mb-3">인용문헌</div>
      {arts.map((a, i) => (
        <div
          key={a.cited_art_id}
          className={`flex justify-between items-center py-2.5 ${
            i < arts.length - 1 ? 'border-b border-border-light' : ''
          }`}
        >
          <span className="font-semibold text-[14px] text-text">{a.cited_art_id}</span>
          <span className="font-mono text-[12px] text-muted">{a.document_number}</span>
        </div>
      ))}
    </div>
  );
}
