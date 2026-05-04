# 특허 심사대응 AI 플랫폼 — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS 기반 특허 심사대응 분석 플랫폼 프론트엔드.

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript 5 |
| 스타일 | Tailwind CSS 3 + CSS Variables |
| 상태 관리 | Zustand 5 |
| 데이터 페칭 | SWR 2 |
| SSE | @microsoft/fetch-event-source |
| 테스트 (단위) | Vitest 4 |
| 테스트 (E2E) | Playwright 1.59 |

## 시작하기

```bash
# 개발 서버 (Mock 모드)
NEXT_PUBLIC_USE_MOCK=true npm run dev

# 개발 서버 (실제 API 연결)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npm run typecheck

# E2E 테스트
npm run test:e2e

# E2E 테스트 UI 모드
npm run test:e2e:ui
```

## 환경 변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `NEXT_PUBLIC_USE_MOCK` | `true` | `true`=Mock 데이터 사용, `false`=실제 API |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | FastAPI 백엔드 주소 |

## 프로젝트 구조

```
app/
├── layout.tsx                      # 루트 레이아웃 (폰트, globals.css)
├── page.tsx                        # / → /upload 리다이렉트
├── upload/page.tsx                 # 출원번호 입력 + 분석 시작
└── analysis/[id]/
    ├── progress/page.tsx           # SSE 진행 화면 (사이드바 없음)
    └── (results)/                  # 결과 탭 그룹 (사이드바 포함)
        ├── layout.tsx              # 사이드바 + ChatbotFab 레이아웃
        ├── summary/page.tsx        # KPI + 거절이유 요약
        ├── chart/page.tsx          # Claim Chart 구성비교표
        ├── strategy/page.tsx       # 공격·방어 전략
        └── amendments/page.tsx     # 보정청구항 diff 뷰

components/
├── layout/Sidebar.tsx
├── upload/                         # UploadDropzone, PreparedFileList
├── progress/                       # ProgressBar, ProgressStepper, ProgressLogConsole
├── shared/                         # Badge, DiffRenderer, LoadingSpinner
├── summary/                        # KpiCard, DisagreementAlert, RejectionReasonCard, CitedArtsList
├── chart/                          # ClaimChartCard, ClaimChartList
├── strategy/                       # StrategyPanel, StrategyToggle, LeveragedDifferences
├── amendments/                     # AmendedClaimCard, AmendmentToggle, DiffLegend, SpecBasisChips
└── chatbot/                        # ChatbotFab, ChatPanel, MessageBubble, SuggestionChips

lib/
├── api/index.ts                    # Mock/Real API 토글 진입점
├── mock/                           # mockData.ts, streamSimulator.ts
├── hooks/                          # useAnalysis.ts, useChatbot.ts
├── providers/AnalysisProvider.tsx  # 결과 탭 간 SWR 캐시 공유 Context
├── store/ui-store.ts               # Zustand (activeStrategy, sidebarOpen)
└── config.ts                       # 환경 변수 래퍼

styles/
└── tokens.css                      # CSS 디자인 토큰 (--c-accent, --c-green, ...)

tests/
└── e2e/main-flow.spec.ts           # Playwright E2E 10개 시나리오
```

## 구현 완료 현황

| Task | 내용 | 상태 |
|------|------|------|
| Task 0 | 의존성 설치 | ✅ |
| Task 1~5 | 타입·API·Mock·Hooks·Store | ✅ |
| Task 6 | 디자인 토큰 + 공통 컴포넌트 | ✅ |
| Task 7 | Upload 화면 | ✅ |
| Task 8 | Progress 화면 (SSE) | ✅ |
| Task 9 | Results 레이아웃 (사이드바) | ✅ |
| Task 10 | Summary 탭 | ✅ |
| Task 11 | Claim Chart 탭 | ✅ |
| Task 12 | Strategy 탭 | ✅ |
| Task 13 | Amendments 탭 | ✅ |
| Task 14 | Chatbot FAB + ChatPanel | ✅ |
| Task 15 | Playwright E2E 테스트 | ✅ |
| 빌드 검증 | `npm run build` 성공 | ✅ |

## 라우팅 설계

```
/                          → redirect → /upload
/upload                    → 출원번호 입력
/analysis/[id]/progress    → SSE 진행 화면 (사이드바 없음, route group 밖)
/analysis/[id]/summary     → 분석 요약 (사이드바 있음, route group 안)
/analysis/[id]/chart       → Claim Chart
/analysis/[id]/strategy    → 공격·방어 전략
/analysis/[id]/amendments  → 보정청구항
```

`[id]` = 출원번호 (URL-encoded). `analysis_id`는 sessionStorage로 progress 페이지에 전달.
