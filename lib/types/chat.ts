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
