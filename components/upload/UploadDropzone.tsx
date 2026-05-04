'use client';

import { useRef, useState } from 'react';
import { clsx } from 'clsx';

interface UploadDropzoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
}

export function UploadDropzone({ onFiles, accept = '.json,.pdf,.txt' }: UploadDropzoneProps) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
    e.target.value = '';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      className={clsx(
        'mx-7 my-5 px-6 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-150',
        drag
          ? 'border-accent bg-accent-light'
          : 'border-border bg-bg hover:border-accent/50',
      )}
    >
      <div className="text-2xl mb-2">📂</div>
      <p className="text-[13px] text-muted">
        JSON · PDF 파일을 드래그하거나{' '}
        <span className="text-accent font-semibold">클릭하여 업로드</span>
      </p>
      <p className="text-[11px] text-light mt-1">
        patent.json / office_action.json / prior_arts/*.json
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
