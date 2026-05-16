'use client';

import { useState, KeyboardEvent } from 'react';

interface RerunPanelProps {
  loading: boolean;
  onRerun: (instruction: string) => void;
}

const QUICK_SUGGESTIONS = [
  '청구항을 더 넓게 작성해줘',
  '수치 범위를 구체적으로 한정해줘',
  '독립항과 종속항 구조를 명확히 해줘',
  '인용발명과의 차이점을 더 부각시켜줘',
];

export function RerunPanel({ loading, onRerun }: RerunPanelProps) {
  const [instruction, setInstruction] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleRun = () => {
    const text = instruction.trim();
    if (!text || loading) return;
    onRerun(text);
    setInstruction('');
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleRun();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-[10px] px-[22px] py-[18px] mt-4">
      {/* 헤더 토글 */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 w-full text-left cursor-pointer bg-transparent border-none p-0"
      >
        <span className="text-[13px] font-bold text-text">⚡ 보정청구항 재생성</span>
        <span className="text-[11px] text-muted ml-1">
          — 요청사항을 입력하면 Tool 6만 다시 실행합니다
        </span>
        <span className="ml-auto text-muted text-[13px]">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="mt-3.5">
          {/* 빠른 선택 칩 */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {QUICK_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setInstruction(s)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-accent-light text-accent border border-accent-border font-semibold cursor-pointer hover:bg-accent hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* 텍스트 입력 */}
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={handleKey}
            placeholder="예) 청구항 1의 슬러리 농도 범위를 더 구체적으로 수치 한정해줘&#10;(Ctrl+Enter 로 실행)"
            rows={3}
            disabled={loading}
            className="w-full px-3 py-2.5 text-[13px] border border-border rounded-lg outline-none bg-bg text-text focus:border-accent transition-colors resize-none disabled:opacity-60 leading-[1.6]"
          />

          {/* 실행 버튼 */}
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] text-muted">
              Tool 1~5 결과는 그대로 유지 · Tool 6(보정안)만 LLM 재호출
            </span>
            <button
              onClick={handleRun}
              disabled={loading || !instruction.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-[13px] font-bold rounded-lg border-none cursor-pointer disabled:opacity-50 transition-opacity"
            >
              {loading ? (
                <>
                  <span
                    className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent inline-block"
                    style={{ animation: 'spin 0.7s linear infinite' }}
                  />
                  생성 중...
                </>
              ) : (
                '재생성'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
