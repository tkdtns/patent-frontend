'use client';

import useSWR from 'swr';
import { api } from '../api';
import type { AnalysisResult } from '../types/analysis';

export function useAnalysis(applicationNumber: string | null) {
  const { data, error, isLoading, mutate } = useSWR<AnalysisResult>(
    applicationNumber ? ['analysis', applicationNumber] : null,
    ([, num]) => api.getAnalysis(num as string),
    { revalidateOnFocus: false },
  );

  return { analysis: data ?? null, error, isLoading, mutate };
}
