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
  RerunAmendmentRequest,
  RerunStrategyRequest,
} from '../types/analysis';
import type { ChatRequest, ChatResponse, StreamChatCallbacks } from '../types/chat';
import type { StreamCallbacks } from '../api/stream';
import type { CitedArtDetail } from '../types/output';
import { MOCK_ANALYSIS, MOCK_CITED_ART_DETAILS } from './data';
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
      ...(MOCK_ANALYSIS.edit_log ?? []),
      {
        timestamp: new Date().toISOString(),
        target_path: req.target_path,
        before: '',
        after: req.new_value,
        source: 'user-direct' as const,
        user_instruction: req.user_instruction ?? null,
      },
    ],
  };
  return updated;
}

async function rerunStrategy(
  applicationNumber: string,
  req: RerunStrategyRequest,
): Promise<AnalysisResult> {
  await delay(1500);
  const updated: AnalysisResult = {
    ...MOCK_ANALYSIS,
    application_number: applicationNumber,
    version: MOCK_ANALYSIS.version + 1,
    edit_log: [
      ...(MOCK_ANALYSIS.edit_log ?? []),
      {
        timestamp: new Date().toISOString(),
        target_path: 'strategy+amendment',
        before: '(이전 전략·보정안)',
        after: '(재생성)',
        source: 'llm-rerun' as const,
        user_instruction: req.user_instruction,
      },
    ],
  };
  return updated;
}

async function rerunAmendment(
  applicationNumber: string,
  req: RerunAmendmentRequest,
): Promise<AnalysisResult> {
  await delay(1200); // LLM 호출 시뮬레이션
  const updated: AnalysisResult = {
    ...MOCK_ANALYSIS,
    application_number: applicationNumber,
    version: MOCK_ANALYSIS.version + 1,
    edit_log: [
      ...(MOCK_ANALYSIS.edit_log ?? []),
      {
        timestamp: new Date().toISOString(),
        target_path: 'amendment',
        before: '(이전 보정안)',
        after: '(재생성)',
        source: 'llm-rerun' as const,
        user_instruction: req.user_instruction,
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

async function getCitedArtDetail(
  _applicationNumber: string,
  citedArtId: string,
): Promise<CitedArtDetail> {
  await delay(200);
  const detail = MOCK_CITED_ART_DETAILS[citedArtId];
  if (!detail) {
    throw new Error(`인용발명 '${citedArtId}' 을 찾을 수 없습니다.`);
  }
  return detail;
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

function streamChat(
  _applicationNumber: string,
  req: ChatRequest,
  callbacks: StreamChatCallbacks,
): () => void {
  const lastUser = [...req.messages].reverse().find((m) => m.role === 'user');
  const userText = lastUser?.content ?? '';

  // 재실행 의도 감지
  const wantsStrategyRerun = /전략.*다시|전략.*재생성|전략.*바꿔|전략.*수정|다른.*전략/.test(userText);
  const wantsAmendmentRerun = /보정.*다시|보정.*재생성|보정.*수정|청구항.*다시/.test(userText);

  const fullText = lastUser
    ? wantsStrategyRerun
      ? `알겠습니다. "${userText.slice(0, 30)}" 요청을 바탕으로 전략을 재수립하겠습니다. 아래 버튼을 클릭하면 Tool 5(전략)와 Tool 6(보정안)을 요청사항에 맞게 다시 생성합니다.`
      : wantsAmendmentRerun
        ? `네, 보정청구항을 다시 생성하겠습니다. "${userText.slice(0, 30)}" 요청을 반영합니다. 아래 버튼을 클릭하면 Tool 6(보정안)만 재실행됩니다.`
        : `[Mock 스트리밍] "${userText.slice(0, 30)}..."에 대한 답변입니다. 활성 전략은 ${req.active_strategy}이며, 현재 분석에서 핵심 불일치는 구성요소 1-A(슬러리 농도)입니다. 해당 구성요소는 인용발명 대비 수치 범위가 명확히 구분되므로 진보성 주장이 가능합니다.`
    : '[Mock 스트리밍] 질문을 입력해 주세요.';

  const tokens = fullText.split('');
  let cancelled = false;
  const timers: ReturnType<typeof setTimeout>[] = [];

  tokens.forEach((char, i) => {
    timers.push(setTimeout(() => {
      if (!cancelled) callbacks.onToken(char);
    }, i * 18));
  });

  const endDelay = tokens.length * 18 + 100;

  // 재실행 proposal 전달
  if ((wantsStrategyRerun || wantsAmendmentRerun) && callbacks.onRerunProposal) {
    timers.push(setTimeout(() => {
      if (!cancelled) {
        callbacks.onRerunProposal!([{
          tool_name: wantsStrategyRerun ? 'strategy' : 'amendment',
          instruction: userText,
        }]);
      }
    }, endDelay));
  }

  timers.push(setTimeout(() => {
    if (!cancelled) callbacks.onDone?.();
  }, endDelay + 50));

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}

export const mockHandlers = {
  startAnalysis,
  getAnalysis,
  subscribeProgress,
  applyEdit,
  revertEdit,
  rerunAmendment,
  rerunStrategy,
  chat,
  streamChat,
  getCitedArtDetail,
  /** 테스트용 */
  _lastAnalysisId: () => lastAnalysisId,
};
