'use client';

import { createContext, useContext } from 'react';
import { useAnalysis } from '@/lib/hooks/useAnalysis';
import type { AnalysisResult } from '@/lib/types/analysis';

interface AnalysisCtx {
  analysis: AnalysisResult | null;
  isLoading: boolean;
  error: unknown;
  mutate: () => void;
}

const Ctx = createContext<AnalysisCtx>({
  analysis: null,
  isLoading: true,
  error: null,
  mutate: () => {},
});

export function AnalysisProvider({
  applicationNumber,
  children,
}: {
  applicationNumber: string;
  children: React.ReactNode;
}) {
  const value = useAnalysis(applicationNumber);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** 결과 탭 페이지에서 분석 데이터를 가져오는 훅 */
export function useAnalysisCtx() {
  return useContext(Ctx);
}
