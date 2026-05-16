import { clsx } from 'clsx';
import type { Message } from '@/lib/types/chat';

/** 인라인 코드/보정항 블록을 감지해 스타일링하는 최소 파서 */
function renderContent(text: string) {
  // ``` 코드 블록
  const codeBlockRe = /```[\s\S]*?```/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRe.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(<span key={last}>{inlineMarkdown(text.slice(last, match.index))}</span>);
    }
    const code = match[0].replace(/^```[^\n]*\n?/, '').replace(/```$/, '');
    parts.push(
      <pre
        key={match.index}
        className="my-2 px-3 py-2 rounded-lg bg-[#1a1f2e] text-[#a8d8a8] text-[11.5px] leading-[1.7] overflow-x-auto font-mono whitespace-pre-wrap"
      >
        {code}
      </pre>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(<span key={last}>{inlineMarkdown(text.slice(last))}</span>);
  }
  return parts;
}

/** `**bold**` / `_italic_` / `` `code` `` 처리 */
function inlineMarkdown(text: string): React.ReactNode[] {
  const re = /(\*\*.*?\*\*|`[^`]+`|_[^_]+_)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const raw = m[0];
    if (raw.startsWith('**')) {
      parts.push(<strong key={m.index}>{raw.slice(2, -2)}</strong>);
    } else if (raw.startsWith('`')) {
      parts.push(
        <code key={m.index} className="px-1 py-0.5 rounded bg-border-light font-mono text-[11.5px]">
          {raw.slice(1, -1)}
        </code>,
      );
    } else if (raw.startsWith('_')) {
      parts.push(<em key={m.index}>{raw.slice(1, -1)}</em>);
    }
    last = m.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

interface MessageBubbleProps {
  msg: Message;
  /** 스트리밍 중인 부분 텍스트. msg.role === 'assistant' 인 스트리밍 버블에 사용 */
  streamingText?: string;
}

export function MessageBubble({ msg, streamingText }: MessageBubbleProps) {
  const isUser = msg.role === 'user';
  const displayText = streamingText ?? msg.content;

  return (
    <div className={clsx('flex mb-2.5', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-[84%] px-3.5 py-2.5 text-[13px] leading-[1.65]',
          isUser
            ? 'bg-accent text-white rounded-[12px_12px_2px_12px]'
            : 'bg-bg text-text border border-border-light rounded-[12px_12px_12px_2px]',
        )}
      >
        {isUser ? displayText : renderContent(displayText)}
        {streamingText !== undefined && (
          <span className="inline-block w-[2px] h-[14px] bg-accent ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-1 px-2.5 py-2 mb-1">
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
