/**
 * 환경 변수 단일 진실 공급원.
 * 컴포넌트·훅·API 클라이언트는 모두 이 객체를 참조한다.
 */
export const config = {
  useMock: process.env.NEXT_PUBLIC_USE_MOCK !== 'false',
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000',
} as const;
