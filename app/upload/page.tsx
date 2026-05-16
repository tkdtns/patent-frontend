'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { PreparedFileList, type PreparedFile } from '@/components/upload/PreparedFileList';
import { api } from '@/lib/api';
import { config } from '@/lib/config';

/** 업로드된 File 객체를 PreparedFile 메타데이터로 변환 */
function toMeta(file: File): PreparedFile {
  const name = file.name.toLowerCase();
  const size = file.size > 1024
    ? `${Math.round(file.size / 1024)} KB`
    : `${file.size} B`;

  let type: PreparedFile['type'] = '기타';
  if (name.includes('office') || name.includes('action') || name.includes('거절'))
    type = '거절이유통지서';
  else if (name.includes('prior') || name.includes('인용'))
    type = '인용발명';
  else if (name.includes('patent') || name.includes('출원') || name.includes('claim'))
    type = '출원서·청구항';

  return { name: file.name, type, size };
}

/** 기본 준비 파일 목록 (Mock 모드에서 항상 보이는 데모용) */
const DEMO_FILES: PreparedFile[] = [
  { name: 'patent.json',             type: '출원서·청구항',  size: '24 KB' },
  { name: 'office_action.json',      type: '거절이유통지서', size: '18 KB' },
  { name: '인용발명1.json',           type: '인용발명',      size: '41 KB' },
  { name: '인용발명2.json',           type: '인용발명',      size: '38 KB' },
];

export default function UploadPage() {
  const router = useRouter();
  const [appNum, setAppNum] = useState(config.useMock ? '10-2014-0036561' : '');
  const [files, setFiles] = useState<PreparedFile[]>(config.useMock ? DEMO_FILES : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles.map(toMeta)]);
  };

  const handleTypeChange = (index: number, type: PreparedFile['type']) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, type } : f)),
    );
  };

  const handleStart = async () => {
    if (!appNum.trim()) {
      setError('출원번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.startAnalysis({ application_number: appNum.trim() });
      /* analysis_id는 SSE 구독에 필요 — sessionStorage로 progress page에 전달 */
      sessionStorage.setItem('pending_analysis_id', res.analysis_id);
      router.push(`/analysis/${encodeURIComponent(appNum.trim())}/progress`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '분석 시작에 실패했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-10">
      {/* 헤더 */}
      <div className="mb-11 text-center animate-fadeIn">
        <p className="text-[11px] tracking-[3px] text-muted font-bold uppercase mb-2">
          Patent AI
        </p>
        <h1 className="text-[28px] font-bold text-text font-serif tracking-tight mb-2">
          특허 심사대응 분석 플랫폼
        </h1>
        <p className="text-[14px] text-muted">
          공격·방어 전략 기반 보정청구항 자동 생성 AI
        </p>
      </div>

      {/* 카드 */}
      <div
        className="w-full max-w-[600px] bg-surface border border-border rounded-[12px] overflow-hidden animate-fadeIn"
        style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.07)', animationDelay: '0.05s' }}
      >
        {/* 출원번호 입력 */}
        <div className="px-7 py-[22px] border-b border-border-light">
          <label className="block text-[11px] font-bold text-muted uppercase tracking-[0.5px] mb-2">
            출원번호 Application No.
          </label>
          <input
            value={appNum}
            onChange={(e) => setAppNum(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="10-2024-XXXXXXX"
            className="w-full px-3.5 py-2.5 text-[15px] border-[1.5px] border-border rounded-md outline-none font-mono text-text bg-bg transition-colors focus:border-accent"
          />
        </div>

        {/* 드롭존 */}
        <UploadDropzone onFiles={handleFiles} />

        {/* 파일 목록 */}
        <PreparedFileList
          files={files}
          onRemove={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
          onTypeChange={handleTypeChange}
        />

        {/* 에러 */}
        {error && (
          <p className="mx-7 mb-3 text-[12px] text-red font-medium">{error}</p>
        )}

        {/* 시작 버튼 */}
        <div className="px-7 pt-4 pb-7">
          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full py-3.5 text-[15px] font-bold bg-accent text-white border-none rounded-lg cursor-pointer tracking-[0.3px] transition-opacity hover:opacity-88 disabled:opacity-60"
          >
            {loading ? '분석 시작 중...' : '분석 시작 — Run Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
}
