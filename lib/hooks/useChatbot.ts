'use client';

import { useState, useCallback } from 'react';
import { api } from '../api';
import type { Message, EditProposal } from '../types/chat';
import type { StrategyType } from '../types/output';

export function useChatbot(applicationNumber: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [proposals, setProposals] = useState<EditProposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = useCallback(
    async (text: string, activeStrategy: StrategyType) => {
      if (!applicationNumber || !text.trim()) return;

      const userMsg: Message = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);

      try {
        const res = await api.chat(applicationNumber, {
          messages: [...messages, userMsg],
          active_strategy: activeStrategy,
        });
        setMessages((prev) => [...prev, res.message]);
        setProposals(res.proposals);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    [applicationNumber, messages],
  );

  return { messages, proposals, loading, error, send };
}
