export interface PreparedFile {
  name: string;
  type: '출원서·청구항' | '거절이유통지서' | '인용발명' | '기타';
  size: string;
}

const FILE_TYPES: PreparedFile['type'][] = [
  '출원서·청구항',
  '거절이유통지서',
  '인용발명',
  '기타',
];

const ICON: Record<PreparedFile['type'], string> = {
  '출원서·청구항':    '📝',
  '거절이유통지서':   '📋',
  '인용발명':         '📄',
  '기타':             '📎',
};

interface PreparedFileListProps {
  files: PreparedFile[];
  onRemove?: (index: number) => void;
  onTypeChange?: (index: number, type: PreparedFile['type']) => void;
}

export function PreparedFileList({ files, onRemove, onTypeChange }: PreparedFileListProps) {
  if (!files.length) return null;
  return (
    <div className="px-7 pb-2">
      <div className="text-[11px] font-bold text-muted uppercase tracking-wide mb-2.5">
        준비된 파일 ({files.length})
      </div>
      <div className="flex flex-col gap-1">
        {files.map((f, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-2.5 rounded-md bg-bg border border-border-light"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-[13px] shrink-0">{ICON[f.type]}</span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-text font-mono leading-tight truncate">
                  {f.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {onTypeChange ? (
                    <select
                      value={f.type}
                      onChange={(e) =>
                        onTypeChange(i, e.target.value as PreparedFile['type'])
                      }
                      className="text-[11px] text-muted bg-surface border border-border rounded px-1.5 py-0.5 cursor-pointer outline-none hover:border-accent focus:border-accent transition-colors"
                    >
                      {FILE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[11px] text-muted">{f.type}</span>
                  )}
                  <span className="text-[11px] text-light">·</span>
                  <span className="text-[11px] text-muted">{f.size}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-2">
              <span className="text-[11px] text-green font-bold">준비됨</span>
              {onRemove && (
                <button
                  onClick={() => onRemove(i)}
                  className="text-light hover:text-red text-xs transition-colors"
                  aria-label="파일 제거"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
