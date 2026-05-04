import { clsx } from 'clsx';
import type { Message } from '@/lib/types/chat';

export function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <div className={clsx('flex mb-2.5', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[82%] px-3.5 py-2.5 text-[13px] leading-[1.65]',
          isUser
            ? 'bg-accent text-white rounded-[12px_12px_2px_12px]'
            : 'bg-bg text-text border border-border-light rounded-[12px_12px_12px_2px]',
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-1 px-2.5 py-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted"
          style={{ animation: `bounce 1s ${i * 0.15}s infinite` }}
        />
      ))}
    </div>
  );
}
