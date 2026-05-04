/**
 * API 단일 진입점.
 *
 * `config.useMock` 값(NEXT_PUBLIC_USE_MOCK 환경변수)에 따라
 * 실제 백엔드 호출 함수 또는 Mock 핸들러를 선택한다.
 *
 * 컴포넌트와 훅은 항상 이 파일의 `api`만 import해야 한다:
 *
 * ```ts
 * import { api } from '@/lib/api';
 *
 * await api.startAnalysis({ application_number: '10-...' });
 * const unsub = api.subscribeProgress(id, { onEvent: ... });
 * ```
 *
 * 두 구현이 동일한 시그니처를 갖도록 `ApiSurface` 타입으로 강제한다.
 */

import { config } from '../config';
import { startAnalysis, getAnalysis } from './analysis';
import { subscribeProgress } from './stream';
import { applyEdit, revertEdit } from './edits';
import { chat } from './chat';
import { mockHandlers } from '../mock/handlers';

/**
 * 실제 API와 Mock이 모두 만족해야 하는 인터페이스.
 * 이 타입에 둘 다 만족하도록 강제하면, 한쪽만 시그니처가 바뀌었을 때
 * 컴파일 에러로 즉시 알 수 있다.
 */
export interface ApiSurface {
  startAnalysis: typeof startAnalysis;
  getAnalysis: typeof getAnalysis;
  subscribeProgress: typeof subscribeProgress;
  applyEdit: typeof applyEdit;
  revertEdit: typeof revertEdit;
  chat: typeof chat;
}

const realApi: ApiSurface = {
  startAnalysis,
  getAnalysis,
  subscribeProgress,
  applyEdit,
  revertEdit,
  chat,
};

const mockApi: ApiSurface = {
  startAnalysis: mockHandlers.startAnalysis,
  getAnalysis: mockHandlers.getAnalysis,
  subscribeProgress: mockHandlers.subscribeProgress,
  applyEdit: mockHandlers.applyEdit,
  revertEdit: mockHandlers.revertEdit,
  chat: mockHandlers.chat,
};

export const api: ApiSurface = config.useMock ? mockApi : realApi;

// 에러 클래스 재노출 (컴포넌트에서 instanceof 체크용)
export { ApiError, TimeoutError } from './client';
