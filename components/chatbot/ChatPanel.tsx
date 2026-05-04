'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { MessageBubble, TypingIndicator } from './MessageBubble';
import { SuggestionChips }               from './SuggestionChips';
import { useChatbot }                    from '@/lib/hooks/useChatbot';
import { useUiStore }                    from '@/lib/store/ui-store';

interface ChatPanelProps {
  applicationNumber: string;
  onClose: () => void;
}

const INIT_MSG = {
  role: 'assistant' as const,
  content:
    '안녕하세요! 분석이 완료되었습니다. 거절이유, Claim Chart, 전략, 보정청구항에 대해 질문해 주세요.',
};

export function ChatPanel({ applicationNumber, onClose }: ChatPanelProps) {
  const [input, setInput]         = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const listRef                   = useRef<HTMLDivElement>(null);
  const activeStrategy            = useUiStore((s) => s.activeStrategy);
  const { messages, loading, send } = useChatbot(applicationNumber);

  /* 새 메시지마다 자동 스크롤 */
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput('');
    setShowSuggestions(false);
    send(q, activeStrategy);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const allMessages = messages.length > 0 ? messages : [INIT_MSG];

  return (
    <div
      className="fixed bottom-[92px] right-7 w-[370px] h-[510px] bg-surface border border-border rounded-[14px] flex flex-col overflow-hidden z-[999]"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.14)', animation: 'fadeIn 0.2s ease' }}
      data-testid="chat-panel"
    >
      {/* 헤더 */}
      <div className="flex items-center gap-2.5 px-[18px] py-3 border-b border-border-light bg-bg">
        <div className="w-2 h-2 rounded-full bg-green" />
        <div className="flex-1">
          <div className="text-[13px] font-bold text-text">특허 AI 챗봇</div>
          <div className="text-[11px] text-muted">분석 결과 기반 RAG</div>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-text text-[16px] border-none bg-transparent cursor-pointer leading-none"
          aria-label="챗봇 닫기"
        >
          ✕
        </button>
      </div>

      {/* 메시지 목록 */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-3.5 pt-3.5 pb-2">
        {allMessages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
        {loading && <TypingIndicator />}
      </div>

      {/* 빠른 질문 (초기에만) */}
      {showSuggestions && messages.length === 0 && (
        <SuggestionChips onSelect={(q) => handleSend(q)} />
      )}

      {/* 입력창 */}
      <div className="flex gap-2 px-3 py-2.5 border-t border-border-light">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="질문을 입력하세요..."
          className="flex-1 px-3 py-2.5 text-[13px] border border-border rounded-lg outline-none bg-bg text-text focus:border-accent transition-colors"
          data-testid="chat-input"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="px-3.5 py-2 bg-accent text-white border-none rounded-lg cursor-pointer text-[13px] font-bold disabled:opacity-50 transition-opacity"
          data-testid="chat-send"
        >
          전송
        </button>
      </div>
    </div>
  );
}
