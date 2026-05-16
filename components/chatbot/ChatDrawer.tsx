'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { MessageBubble, TypingIndicator } from './MessageBubble';
import { SuggestionChips } from './SuggestionChips';
import { useChatbot } from '@/lib/hooks/useChatbot';
import { useAnalysisCtx } from '@/lib/providers/AnalysisProvider';
import { useUiStore } from '@/lib/store/ui-store';
import { api } from '@/lib/api';
import type { RerunProposal } from '@/lib/types/chat';

interface ChatDrawerProps {
  applicationNumber: string;
  open: boolean;
  onClose: () => void;
}

const INIT_MSG = {
  role: 'assistant' as const,
  content:
    '안녕하세요! 분석이 완료되었습니다.\n거절이유, Claim Chart, 전략, 보정청구항에 대해 질문해 주세요.\n\n전략이나 보정안 재생성을 원하시면 "전략을 방어 중심으로 다시 짜줘" 처럼 말씀해 주세요.',
};

const TOOL_LABEL: Record<RerunProposal['tool_name'], string> = {
  strategy: '⚡ 전략 + 보정안 재생성',
  amendment: '⚡ 보정안 재생성',
};

const TOOL_DESC: Record<RerunProposal['tool_name'], string> = {
  strategy: 'Tool 5(전략) → Tool 6(보정안) 순으로 재실행',
  amendment: 'Tool 6(보정안)만 재실행',
};

export function ChatDrawer({ applicationNumber, open, onClose }: ChatDrawerProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [rerunning, setRerunning] = useState<RerunProposal['tool_name'] | null>(null);
  const [rerunDone, setRerunDone] = useState<RerunProposal['tool_name'] | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeStrategy = useUiStore((s) => s.activeStrategy);
  const { mutate } = useAnalysisCtx();

  const {
    messages,
    rerunProposals,
    streaming,
    streamingText,
    error,
    send,
    clearHistory,
    dismissRerunProposals,
  } = useChatbot(applicationNumber);

  /* 새 메시지 / 스트리밍 텍스트 변경 시 자동 스크롤 */
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, streaming, streamingText, rerunProposals]);

  /* 드로어 열릴 때 입력창 포커스 */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  /* ESC 키로 닫기 */
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleSend = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || streaming) return;
    setInput('');
    setShowSuggestions(false);
    setRerunDone(null);
    send(q, activeStrategy);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* 재실행 실행 */
  const handleRerun = async (proposal: RerunProposal) => {
    setRerunning(proposal.tool_name);
    try {
      if (proposal.tool_name === 'strategy') {
        await api.rerunStrategy(applicationNumber, { user_instruction: proposal.instruction });
      } else {
        await api.rerunAmendment(applicationNumber, { user_instruction: proposal.instruction });
      }
      mutate();
      setRerunDone(proposal.tool_name);
      dismissRerunProposals();
    } catch (e) {
      console.error('rerun failed', e);
    } finally {
      setRerunning(null);
    }
  };

  const allMessages = messages.length > 0 ? messages : [INIT_MSG];

  return (
    <>
      {/* ── 백드롭 ── */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[998] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.25)' }}
        aria-hidden="true"
      />

      {/* ── 드로어 본체 ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="AI 챗봇 드로어"
        data-testid="chat-drawer"
        className="fixed top-0 right-0 h-screen z-[999] flex flex-col bg-surface border-l border-border"
        style={{
          width: 480,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: open ? '-6px 0 32px rgba(0,0,0,0.14)' : 'none',
        }}
      >
        {/* ── 헤더 ── */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border bg-bg shrink-0">
          <div className="w-2 h-2 rounded-full bg-green" />
          <div className="flex-1">
            <div className="text-[13px] font-bold text-text">특허 AI 챗봇</div>
            <div className="text-[11px] text-muted">
              전략: <span className="font-semibold text-accent">{activeStrategy}</span>
              &nbsp;·&nbsp;분석 결과 기반 RAG
            </div>
          </div>
          <button
            onClick={clearHistory}
            title="대화 내역 초기화"
            className="text-[11px] text-muted hover:text-red px-2 py-1 rounded border border-transparent hover:border-border-light transition-colors mr-1"
          >
            초기화
          </button>
          <button
            onClick={onClose}
            className="text-muted hover:text-text text-[16px] border-none bg-transparent cursor-pointer leading-none"
            aria-label="챗봇 닫기"
          >
            ✕
          </button>
        </div>

        {/* ── 메시지 목록 ── */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
          {allMessages.map((m, i) => (
            <MessageBubble key={i} msg={m} />
          ))}

          {/* 스트리밍 버블 */}
          {streaming && (
            <MessageBubble
              msg={{ role: 'assistant', content: '' }}
              streamingText={streamingText || undefined}
            />
          )}
          {streaming && !streamingText && <TypingIndicator />}

          {/* ── 재실행 제안 카드 ── */}
          {rerunProposals.length > 0 && (
            <div className="mt-2 mb-3 rounded-[10px] border border-accent-border bg-accent-light overflow-hidden">
              <div className="px-3.5 py-2 border-b border-accent-border">
                <span className="text-[11px] font-bold text-accent uppercase tracking-wide">
                  AI 재생성 제안
                </span>
              </div>
              <div className="px-3.5 py-3 flex flex-col gap-2">
                {rerunProposals.map((p, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-text truncate">
                        {TOOL_LABEL[p.tool_name]}
                      </div>
                      <div className="text-[11px] text-muted">{TOOL_DESC[p.tool_name]}</div>
                    </div>
                    <button
                      onClick={() => handleRerun(p)}
                      disabled={rerunning !== null}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-[12px] font-bold rounded-lg border-none cursor-pointer disabled:opacity-60 transition-opacity"
                    >
                      {rerunning === p.tool_name ? (
                        <>
                          <span
                            className="w-3 h-3 rounded-full border-2 border-white border-t-transparent inline-block"
                            style={{ animation: 'spin 0.7s linear infinite' }}
                          />
                          실행 중
                        </>
                      ) : (
                        '실행'
                      )}
                    </button>
                  </div>
                ))}
                <button
                  onClick={dismissRerunProposals}
                  className="self-end text-[11px] text-muted hover:text-text bg-transparent border-none cursor-pointer mt-0.5"
                >
                  닫기
                </button>
              </div>
            </div>
          )}

          {/* 재실행 완료 알림 */}
          {rerunDone && (
            <div className="flex items-center gap-2 mt-1 mb-2 px-3 py-2 rounded-lg bg-green-light border border-green text-[12px] text-text">
              <span className="text-green">✓</span>
              <span>
                {rerunDone === 'strategy' ? '전략 + 보정안' : '보정안'}이 재생성되었습니다.
                해당 탭에서 결과를 확인하세요.
              </span>
              <button
                onClick={() => setRerunDone(null)}
                className="ml-auto text-muted hover:text-text bg-transparent border-none cursor-pointer text-[13px] leading-none"
              >
                ✕
              </button>
            </div>
          )}

          {/* 에러 표시 */}
          {error && (
            <div className="text-[12px] text-red px-3 py-2 rounded-lg bg-red-light border border-red mt-1 mb-2">
              오류: {error.message}
            </div>
          )}
        </div>

        {/* ── 빠른 질문 칩 ── */}
        {showSuggestions && messages.length === 0 && (
          <SuggestionChips onSelect={(q) => handleSend(q)} />
        )}

        {/* ── 입력창 ── */}
        <div className="flex gap-2 px-4 py-3 border-t border-border-light shrink-0">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={streaming ? '응답 중...' : '질문을 입력하세요...'}
            disabled={streaming || rerunning !== null}
            className="flex-1 px-3 py-2.5 text-[13px] border border-border rounded-lg outline-none bg-bg text-text focus:border-accent transition-colors disabled:opacity-60"
            data-testid="chat-input"
          />
          <button
            onClick={() => handleSend()}
            disabled={streaming || !input.trim() || rerunning !== null}
            className="px-4 py-2 bg-accent text-white border-none rounded-lg cursor-pointer text-[13px] font-bold disabled:opacity-50 transition-opacity"
            data-testid="chat-send"
          >
            전송
          </button>
        </div>
      </aside>
    </>
  );
}
