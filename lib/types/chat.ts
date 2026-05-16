/**
 * 백엔드 `src/patent_agent/core/chatbot.py`와 1:1 대응.
 */

import type { StrategyType } from './output';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: Message[];
  active_strategy: StrategyType;
}

export interface EditProposal {
  target_path: string;
  new_value: string;
  reason: string;
}

export interface ChatResponse {
  message: Message;
  proposals: EditProposal[];
}

/**
 * 챗봇이 propose_regenerate 툴을 호출할 때 SSE로 내려오는 구조.
 * tool_name: "strategy" | "amendment"
 * instruction: LLM이 생성한 재실행 힌트 (user_instruction으로 그대로 전달)
 */
export interface RerunProposal {
  tool_name: 'strategy' | 'amendment';
  instruction: string;
}

export interface StreamChatCallbacks {
  onToken: (token: string) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
  /** propose_regenerate 이벤트 수신 시 호출 */
  onRerunProposal?: (proposals: RerunProposal[]) => void;
}
