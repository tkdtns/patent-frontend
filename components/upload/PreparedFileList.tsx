import { clsx } from 'clsx';

export interface PreparedFile {
  name: string;
  type: '출원서·청구항' | '거절이유통지서' | '인용발명' | '기타';
  size: string;
}

const ICON: Record<PreparedFile['type'], string> = {
  '출원서·청구항':    '📝',
  '거절이유통지서':   '📋',
  '인용발명':         '📄',
  '기타':             '📎',
};

interface PreparedFileListProps {
  files: PreparedFile[];
  onRemove?: (index: number) => void;
}

export function PreparedFileList({ files, onRemove }: PreparedFileListProps) {
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
            <div className="flex items-center gap-2.5">
              <span className="text-[13px]">{ICON[f.type]}</span>
              <div>
                <div className="text-[12.5px] font-medium text-text font-mono leading-tight">
                  {f.name}
                </div>
                <div className="text-[11px] text-muted">
                  {f.type} · {f.size}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
