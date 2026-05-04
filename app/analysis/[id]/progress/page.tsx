'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/progress/ProgressBar';
import { ProgressStepper, ANALYSIS_STEPS } from '@/components/progress/ProgressStepper';
import { ProgressLogConsole } from '@/components/progress/ProgressLogConsole';
import { useAnalysisStream } from '@/lib/hooks/useAnalysisStream';

export default function ProgressPage() {
  const params = useParams<{ id: string }>();
  const router  = useRouter();

  const applicationNumber = decodeURIComponent(params.id);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('pending_analysis_id');
    setAnalysisId(stored ?? `mock-${applicationNumber}`);
  }, [applicationNumber]);

  const { events, status, currentRatio, currentStep, error } =
    useAnalysisStream(analysisId);

  useEffect(() => {
    if (status !== 'done') return;
    sessionStorage.removeItem('pending_analysis_id');
    const t = setTimeout(
      () => router.replace(`/analysis/${encodeURIComponent(applicationNumber)}/summary`),
      600,
    );
    return () => clearTimeout(t);
  }, [status, applicationNumber, router]);

  const stepIndex = ANALYSIS_STEPS.findIndex((s) => s.label === currentStep);
  const currentIndex = stepIndex === -1 ? 0 : stepIndex;

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-[540px]">
        <header className="text-center mb-7">
          <p className="text-[11px] tracking-[3px] text-muted font-bold uppercase mb-1.5">
            Patent AI
          </p>
          <h2 className="text-[22px] font-bold text-text font-serif mb-1">
            분석 진행 중...
          </h2>
          <p className="text-[13px] text-muted">
            {applicationNumber} · 약 30~60초 소요
          </p>
        </header>

        <div
          className="bg-surface border border-border rounded-[12px] px-6 py-[22px] mb-3.5"
          style={{ boxShadow: '0 1px 8px rgba(0,0,0,.05)' }}
        >
          <ProgressBar ratio={currentRatio} label={currentStep} />
          <ProgressStepper currentIndex={currentIndex} ratio={currentRatio} />
        </div>

        <ProgressLogConsole events={events} streaming={status === 'streaming'} />

        {status === 'error' && (
          <div className="mt-4">
            {error && (
              <p className="text-[12px] text-red mb-3">에러: {error.message}</p>
            )}
            <button
              onClick={() => router.push('/upload')}
              className="w-full py-3 bg-accent text-white font-bold rounded-lg text-[14px]"
            >
              업로드 화면으로 돌아가기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
