import type { CitedArtRef } from '@/lib/types/output';

interface CitedArtsListProps {
  arts: CitedArtRef[];
  onSelect?: (citedArtId: string) => void;
}

export function CitedArtsList({ arts, onSelect }: CitedArtsListProps) {
  return (
    <div className="bg-surface border border-border rounded-lg px-6 py-5">
      <div className="text-[12px] font-bold text-text mb-3">인용문헌</div>
      {arts.map((a, i) => (
        <div
          key={a.cited_art_id}
          className={`flex justify-between items-center py-2.5 ${
            i < arts.length - 1 ? 'border-b border-border-light' : ''
          } ${
            onSelect
              ? 'cursor-pointer rounded-md px-2 -mx-2 hover:bg-accent-light transition-colors group'
              : ''
          }`}
          onClick={() => onSelect?.(a.cited_art_id)}
        >
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-text group-hover:text-accent transition-colors">
              {a.cited_art_id}
            </span>
            {onSelect && (
              <span className="text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                상세 보기 →
              </span>
            )}
          </div>
          <span className="font-mono text-[12px] text-muted">{a.document_number}</span>
        </div>
      ))}
    </div>
  );
}
