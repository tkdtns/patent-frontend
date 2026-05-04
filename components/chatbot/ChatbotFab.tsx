'use client';

import { useState } from 'react';
import { ChatPanel } from './ChatPanel';

interface ChatbotFabProps {
  applicationNumber: string;
}

export function ChatbotFab({ applicationNumber }: ChatbotFabProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="AI 챗봇 열기"
        aria-label="AI 챗봇"
        data-testid="chatbot-fab"
        className="fixed bottom-7 right-7 w-[52px] h-[52px] rounded-full bg-accent border-none cursor-pointer text-[22px] z-[1000] transition-transform hover:scale-110"
        style={{ boxShadow: '0 4px 20px rgba(29,78,216,0.35)' }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* 채팅 패널 */}
      {open && (
        <ChatPanel
          applicationNumber={applicationNumber}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
