/**
 * Mock 모드 핸들러. 실제 `lib/api/*` 모듈과 동형 인터페이스를 가진다.
 *
 * 동작:
 * - 실제 API와 비슷한 지연(200~500ms)을 시뮬레이션하여 로딩 UX를 검증 가능하게 함
 * - 백엔드와 동일한 형태의 응답을 반환 (타입 가드)
 * - SSE 진행은 `stream-simulator.ts`로 위임
 */

import type {
  AnalysisResult,
  StartAnalysisRequest,
  StartAnalysisResponse,
  ApplyEditRequest,
  RevertEditRequest,
} from '../types/analysis';
import type { ChatRequest, ChatResponse } from '../types/chat';
import type { StreamCallbacks } from '../api/stream';
import { MOCK_ANALYSIS } from './data';
import { simulateProgress } from './stream-simulator';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let lastAnalysisId = MOCK_ANALYSIS.analysis_id;

async function startAnalysis(
  req: StartAnalysisRequest,
): Promise<StartAnalysisResponse> {
  await delay(300);
  const id = `${Date.now()}-${req.application_number.replace(/-/g, '')}`;
  lastAnalysisId = id;
  return {
    analysis_id: id,
    application_number: req.application_number,
    status: 'started',
  };
}

async function getAnalysis(
  applicationNumber: string,
): Promise<AnalysisResult> {
  await delay(250);
  return {
    ...MOCK_ANALYSIS,
    application_number: applicationNumber,
  };
}

function subscribeProgress(
  analysisId: string,
  callbacks: StreamCallbacks,
): () => void {
  return simulateProgress(analysisId, callbacks);
}

async function applyEdit(
  applicationNumber: string,
  req: ApplyEditRequest,
): Promise<AnalysisResult> {
  await delay(800);
  const updated: AnalysisResult = {
    ...MOCK_ANALYSIS,
    application_number: applicationNumber,
    version: MOCK_ANALYSIS.version + 1,
    edit_log: [
      ...MOCK_ANALYSIS.edit_log,
      {
        timestamp: new Date().toISOString(),
        action: req.action,
        target: req.target_path,
        reason: req.reason,
        previous_value: null,
      },
    ],
  };
  return updated;
}

async function revertEdit(
  applicationNumber: string,
  _req: RevertEditRequest,
): Promise<AnalysisResult> {
  await delay(500);
  return {
    ...MOCK_ANALYSIS,
    application_number: applicationNumber,
  };
}

async function chat(
  _applicationNumber: string,
  req: ChatRequest,
): Promise<ChatResponse> {
  await delay(900);
  const lastUser = [...req.messages].reverse().find((m) => m.role === 'user');
  return {
    message: {
      role: 'assistant',
      content: lastUser
        ? `[Mock 응답] "${lastUser.content}"에 대한 답변입니다. 활성 전략은 ${req.active_strategy}이며, 핵심 불일치는 1-A 슬러리 농도입니다.`
        : '[Mock 응답] 질문을 입력해 주세요.',
    },
    proposals: [],
  };
}

export const mockHandlers = {
  startAnalysis,
  getAnalysis,
  subscribeProgress,
  applyEdit,
  revertEdit,
  chat,
  /** 테스트용 */
  _lastAnalysisId: () => lastAnalysisId,
};
