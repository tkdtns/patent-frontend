# Changelog

## [Unreleased] — 2026-05-16

### 주요 변경 요약

이번 세션에서 진행된 변경사항을 기능 단위로 정리합니다.

---

### ✨ 새 기능

#### 1. 파일 업로드 — 파일 타입 선택 토글
- `components/upload/PreparedFileList.tsx`  
  파일 목록 각 행에 `<select>` 드롭다운 추가 (`출원서류 / 거절이유통지서 / 인용발명`)
- `app/upload/page.tsx`  
  `handleTypeChange` 핸들러 추가. Mock 모드에서만 데모 파일 초기 노출 (`config.useMock` 분기)

#### 2. 인용발명 상세 모달 (우측 드로어)
- `components/summary/CitedArtModal.tsx` *(신규)*  
  인용발명 클릭 시 480px 우측 슬라이드 드로어. 초록/청구항/관련 단락 표시. ESC·백드롭 클릭으로 닫기
- `components/summary/CitedArtsList.tsx`  
  `onSelect` prop 추가. 행 hover 시 "상세 보기 →" 힌트 표시
- `app/analysis/[id]/(results)/summary/page.tsx`  
  `api.getCitedArtDetail()` 연동 및 모달 상태 관리

#### 3. 백엔드 연동 (`backend/`)
- `backend/src/patent_agent/api/main.py`  
  starlette 1.0.0 CORS 버그 우회를 위한 커스텀 ASGI 미들웨어 `_CORSMiddleware` 구현  
  `load_dotenv(override=True)` 로 `.env` 강제 로드
- `backend/src/patent_agent/api/routers/analysis.py`  
  `GET /{application_number}/prior-art/{cited_art_id}` 엔드포인트 추가 (인용발명 상세)
- `backend/src/patent_agent/models/analysis.py`  
  `AnalysisResult.edit_log` 필드 추가. `EditLogEntry.source` 에 `"llm-rerun"` 리터럴 추가
- `backend/.env` — gitignore 처리됨 (LLM 키 포함)

#### 4. 챗봇 기능 전면 구현
- `lib/hooks/useChatbot.ts`  
  `api.streamChat()` 기반 스트리밍으로 전환. `streamingText` 상태로 토큰 실시간 렌더링.  
  `localStorage` 에 대화 이력 자동 저장·복원 (`chatbot-history-{applicationNumber}` 키).  
  `rerunProposals` 상태 및 `dismissRerunProposals()` 추가
- `components/chatbot/ChatDrawer.tsx` *(신규)*  
  480px 우측 슬라이드 드로어. ESC·백드롭 닫기, 열릴 때 입력창 자동 포커스.  
  재실행 제안 카드 (AI 재생성 제안) 및 완료 알림 UI 포함
- `components/chatbot/ChatbotFab.tsx`  
  `ChatPanel` → `ChatDrawer` 교체
- `components/chatbot/MessageBubble.tsx`  
  스트리밍 커서 애니메이션, 마크다운 렌더링 (`**bold**` / `` `code` `` / ` ```블록``` `)
- `components/chatbot/SuggestionChips.tsx`  
  `usePathname()` 으로 현재 탭 감지 → 탭별 동적 제안 칩  
  (`summary / chart / strategy / amendments` 각각 3개 칩)

#### 5. 파이프라인 재실행 API

**백엔드**
- `backend/src/patent_agent/tools/tool5_strategy.py`  
  `user_instruction` 파라미터 추가
- `backend/src/patent_agent/tools/tool6_amendment.py`  
  `user_instruction` 파라미터 추가
- `backend/src/patent_agent/prompts/tool5.j2`  
  `{% if user_instruction %}` 블록 추가 — `## ⚡ 사용자 추가 요청 (최우선 반영)`
- `backend/src/patent_agent/prompts/tool6_offensive.j2` / `tool6_defensive.j2`  
  동일한 user_instruction 블록 추가
- `backend/src/patent_agent/api/routers/analysis.py`  
  `POST /{application_number}/rerun-strategy` — Tool 5 → Tool 6 순차 재실행  
  `POST /{application_number}/rerun-amendment` — Tool 6 단독 재실행

**프론트엔드**
- `lib/types/analysis.ts` — `RerunAmendmentRequest`, `RerunStrategyRequest` 타입 추가
- `lib/api/analysis.ts` — `rerunAmendment()`, `rerunStrategy()` 함수 추가
- `lib/api/index.ts` — `ApiSurface` 인터페이스 및 real/mock 등록
- `lib/mock/handlers.ts` — mock 핸들러 추가
- `components/amendments/RerunPanel.tsx` *(신규)*  
  보정청구항 탭 하단 재생성 패널 (빠른 제안 칩 + 텍스트 입력 + 재생성 버튼)
- `app/analysis/[id]/(results)/amendments/page.tsx`  
  `RerunPanel` 통합, 재실행 로딩 오버레이 추가

#### 6. 챗봇 → 파이프라인 재실행 연동

**백엔드**
- `backend/src/patent_agent/prompts/chatbot_system.j2`  
  `propose_regenerate` 도구 사용 지침 추가:  
  사용자 원문 보존 · 컨텍스트 보강 · 축약 금지 규칙 명시

**프론트엔드**
- `lib/types/chat.ts`  
  `RerunProposal` 타입 추가. `StreamChatCallbacks.onRerunProposal` 콜백 추가
- `lib/api/chat.ts`  
  SSE `proposals` 이벤트 파싱 → `onRerunProposal` 호출
- `lib/mock/handlers.ts`  
  `streamChat` 키워드 감지 시뮬레이션 ("전략.*다시", "보정.*다시" 등 감지 시 proposal 전송)
- `components/chatbot/ChatDrawer.tsx`  
  재실행 제안 카드 UI — `[실행]` 버튼 클릭 시 `rerunStrategy / rerunAmendment` 호출 후 `mutate()`

### 📝 문서

- `docs/chatbot-rerun-api.md` *(신규)*  
  챗봇 및 파이프라인 재실행 관련 전체 API 명세  
  (아키텍처 흐름도, 엔드포인트 상세, SSE 이벤트 명세, 스키마, 프롬프트 주입 규칙, 에러 응답)

### 🐛 버그 수정 및 개선

- `lib/types/analysis.ts` — `EditLogEntry.source` 리터럴 동기화 (`'llm-rerun'` 추가)
- `lib/types/output.ts` — `ToolError` 구조 백엔드와 일치 (`tool_name`, `error_type`, `message`, `is_fatal`)
- `lib/types/output.ts` — `CitedArtDetail`, `CitedArtClaim`, `CitedArtParagraph` 타입 추가
- `components/chatbot/ChatPanel.tsx` — `useChatbot` 훅 변경(`loading` → `streaming`) 대응
- `app/upload/page.tsx` — real 모드에서 데모 파일이 초기 노출되던 버그 수정

### 🗂 파일 구조 변경

```
patent-frontend/
├── backend/                          ← 백엔드 서브레포 추가 (patent_ai_agent)
│   └── src/patent_agent/
│       ├── api/routers/analysis.py   ← prior-art, rerun-strategy, rerun-amendment 추가
│       ├── core/chatbot.py           ← propose_regenerate 도구 기존 포함
│       ├── prompts/
│       │   ├── chatbot_system.j2     ← hint 작성 규칙 추가
│       │   ├── tool5.j2              ← user_instruction 블록 추가
│       │   ├── tool6_offensive.j2    ← user_instruction 블록 추가
│       │   └── tool6_defensive.j2    ← user_instruction 블록 추가
│       └── tools/
│           ├── tool5_strategy.py     ← user_instruction 파라미터 추가
│           └── tool6_amendment.py    ← user_instruction 파라미터 추가
├── components/
│   ├── amendments/
│   │   └── RerunPanel.tsx            ← 신규
│   ├── chatbot/
│   │   ├── ChatDrawer.tsx            ← 신규 (ChatPanel 대체)
│   │   ├── ChatbotFab.tsx            ← ChatDrawer로 교체
│   │   ├── MessageBubble.tsx         ← 스트리밍 + 마크다운
│   │   └── SuggestionChips.tsx       ← 탭별 동적 칩
│   └── summary/
│       └── CitedArtModal.tsx         ← 신규
├── docs/
│   ├── api-contract.md               ← 기존
│   └── chatbot-rerun-api.md          ← 신규
└── lib/
    ├── api/
    │   ├── analysis.ts               ← rerunAmendment, rerunStrategy 추가
    │   ├── chat.ts                   ← streamChat, proposals SSE 처리
    │   └── index.ts                  ← ApiSurface 확장
    ├── hooks/
    │   └── useChatbot.ts             ← 스트리밍 + localStorage + rerunProposals
    ├── mock/
    │   └── handlers.ts               ← 전체 mock 핸들러 동기화
    └── types/
        ├── analysis.ts               ← RerunAmendmentRequest, RerunStrategyRequest
        └── chat.ts                   ← RerunProposal, StreamChatCallbacks 확장
```
