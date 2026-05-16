'use client';

import { useState } from 'react';
import { ChatDrawer } from './ChatDrawer';

interface ChatbotFabProps {
  applicationNumber: string;
}

export function ChatbotFab({ applicationNumber }: ChatbotFabProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 플로팅 액션 버튼 */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="AI 챗봇 열기"
        aria-label="AI 챗봇"
        aria-expanded={open}
        data-testid="chatbot-fab"
        className="fixed bottom-7 right-7 w-[52px] h-[52px] rounded-full bg-accent border-none cursor-pointer text-[22px] z-[1000] transition-transform hover:scale-110"
        style={{ boxShadow: '0 4px 20px rgba(29,78,216,0.35)' }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* 480px 우측 슬라이드 드로어 */}
      <ChatDrawer
        applicationNumber={applicationNumber}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
