'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { api } from '../api';
import type { Message, EditProposal, RerunProposal } from '../types/chat';
import type { StrategyType } from '../types/output';

const storageKey = (appNum: string) => `chatbot-history-${appNum}`;

export function useChatbot(applicationNumber: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [proposals, setProposals] = useState<EditProposal[]>([]);
  const [rerunProposals, setRerunProposals] = useState<RerunProposal[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);

  /* ── localStorage 로드 (applicationNumber 변경 시) ── */
  useEffect(() => {
    if (!applicationNumber) return;
    try {
      const stored = localStorage.getItem(storageKey(applicationNumber));
      if (stored) {
        setMessages(JSON.parse(stored) as Message[]);
      } else {
        setMessages([]);
      }
    } catch {
      setMessages([]);
    }
  }, [applicationNumber]);

  /* ── localStorage 저장 ── */
  useEffect(() => {
    if (!applicationNumber || messages.length === 0) return;
    try {
      localStorage.setItem(storageKey(applicationNumber), JSON.stringify(messages));
    } catch { /* quota 초과 등 무시 */ }
  }, [applicationNumber, messages]);

  /* ── 언마운트 시 스트림 정리 ── */
  useEffect(() => {
    return () => { unsubRef.current?.(); };
  }, []);

  const send = useCallback(
    (text: string, activeStrategy: StrategyType) => {
      if (!applicationNumber || !text.trim() || streaming) return;

      // 이전 스트림이 남아 있으면 취소
      unsubRef.current?.();
      unsubRef.current = null;

      const userMsg: Message = { role: 'user', content: text };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setStreaming(true);
      setStreamingText('');
      setError(null);

      let accumulated = '';

      const unsub = api.streamChat(
        applicationNumber,
        { messages: nextMessages, active_strategy: activeStrategy },
        {
          onToken: (token) => {
            accumulated += token;
            setStreamingText(accumulated);
          },
          onRerunProposal: (incoming) => {
            setRerunProposals(incoming);
          },
          onDone: () => {
            const assistantMsg: Message = {
              role: 'assistant',
              content: accumulated,
            };
            setMessages((prev) => [...prev, assistantMsg]);
            setProposals([]);
            setStreamingText('');
            setStreaming(false);
            unsubRef.current = null;
          },
          onError: (err) => {
            setError(err);
            if (accumulated) {
              // 일부 수신된 내용이 있으면 그대로 저장
              setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: accumulated + ' _(오류로 중단됨)_' },
              ]);
            }
            setStreamingText('');
            setStreaming(false);
            unsubRef.current = null;
          },
        },
      );

      unsubRef.current = unsub;
    },
    [applicationNumber, messages, streaming],
  );

  const clearHistory = useCallback(() => {
    unsubRef.current?.();
    unsubRef.current = null;
    setMessages([]);
    setProposals([]);
    setRerunProposals([]);
    setStreamingText('');
    setStreaming(false);
    setError(null);
    if (applicationNumber) {
      localStorage.removeItem(storageKey(applicationNumber));
    }
  }, [applicationNumber]);

  const dismissRerunProposals = useCallback(() => {
    setRerunProposals([]);
  }, []);

  return {
    messages,
    proposals,
    rerunProposals,
    streaming,
    streamingText,
    error,
    send,
    clearHistory,
    dismissRerunProposals,
  };
}
