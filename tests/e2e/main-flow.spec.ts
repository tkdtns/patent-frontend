import { test, expect } from '@playwright/test';

const APP_NUM = '10-2014-0036561';
const BASE    = 'http://localhost:3000';

/* ─── 1. 루트 → /upload 리다이렉트 ───────────────────── */
test('루트 페이지가 /upload로 리다이렉트된다', async ({ page }) => {
  await page.goto(BASE);
  await expect(page).toHaveURL(/\/upload/);
});

/* ─── 2. Upload 화면 렌더링 ───────────────────────────── */
test('Upload 화면이 올바르게 렌더링된다', async ({ page }) => {
  await page.goto(`${BASE}/upload`);

  await expect(page.getByText('특허 심사대응 분석 플랫폼')).toBeVisible();
  await expect(page.getByText('분석 시작 — Run Analysis')).toBeVisible();

  /* 출원번호 입력 필드 */
  const input = page.locator('input[placeholder*="출원번호"], input[value*="10-"]').first();
  await expect(input).toBeVisible();

  /* 준비된 파일 목록 */
  await expect(page.getByText('준비된 파일')).toBeVisible();
});

/* ─── 3. 분석 시작 → Progress 화면 이동 ─────────────── */
test('분석 시작 버튼 클릭 시 Progress 화면으로 이동한다', async ({ page }) => {
  await page.goto(`${BASE}/upload`);

  /* 출원번호 입력 (기본값 사용) */
  const btn = page.getByRole('button', { name: /분석 시작/ });
  await btn.click();

  /* /analysis/.../progress 로 이동 확인 */
  await expect(page).toHaveURL(/\/analysis\/.+\/progress/, { timeout: 8_000 });
  await expect(page.getByText('분석 진행 중...')).toBeVisible();
});

/* ─── 4. Progress → Summary 자동 이동 ───────────────── */
test('Mock SSE 완료 후 Summary 탭으로 자동 이동한다', async ({ page }) => {
  await page.goto(`${BASE}/upload`);
  await page.getByRole('button', { name: /분석 시작/ }).click();

  /* Progress 화면 확인 */
  await expect(page).toHaveURL(/\/progress/);

  /* Mock SSE 시뮬레이션 완료 대기 (~14초) */
  await expect(page).toHaveURL(/\/summary/, { timeout: 20_000 });
  await expect(page.getByText('분석 리포트 요약')).toBeVisible();
});

/* ─── 5. Summary 탭 콘텐츠 검증 ─────────────────────── */
test('Summary 탭이 KPI 카드와 거절이유를 표시한다', async ({ page }) => {
  await page.goto(`${BASE}/analysis/${encodeURIComponent(APP_NUM)}/summary`);

  await expect(page.getByText('분석 리포트 요약')).toBeVisible();
  await expect(page.getByText('거절 청구항')).toBeVisible();
  await expect(page.getByText('인용발명', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('불일치 항목')).toBeVisible();
  /* 불일치 배너 */
  await expect(page.getByText(/불일치.*발견/)).toBeVisible();
});

/* ─── 6. Claim Chart 탭 ─────────────────────────────── */
test('Claim Chart 탭이 구성요소 카드를 표시하고 클릭 시 펼쳐진다', async ({ page }) => {
  await page.goto(`${BASE}/analysis/${encodeURIComponent(APP_NUM)}/chart`);

  await expect(page.getByText('Claim Chart — 구성비교표')).toBeVisible();

  /* 첫 번째 구성요소 카드 클릭 → 펼침 */
  const firstCard = page.locator('[class*="rounded"]').filter({ hasText: '1-A' }).first();
  await firstCard.click();
  await expect(page.getByText('우리 측 분석')).toBeVisible();
});

/* ─── 7. Strategy 탭 ─────────────────────────────────── */
test('Strategy 탭이 공격·방어 전략을 분할 화면으로 표시한다', async ({ page }) => {
  await page.goto(`${BASE}/analysis/${encodeURIComponent(APP_NUM)}/strategy`);

  await expect(page.getByRole('heading', { name: '공격·방어 전략', level: 2 })).toBeVisible();
  await expect(page.getByText('공격 전략', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('방어 전략', { exact: true }).first()).toBeVisible();

  /* 공격 단독 보기 */
  await page.getByRole('button', { name: /공격/ }).first().click();
  await expect(page.getByText('방어 전략', { exact: true }).first()).not.toBeVisible();
});

/* ─── 8. Amendments 탭 ───────────────────────────────── */
test('Amendments 탭이 diff 렌더링과 범례를 표시한다', async ({ page }) => {
  await page.goto(`${BASE}/analysis/${encodeURIComponent(APP_NUM)}/amendments`);

  await expect(page.getByText('보정청구항')).toBeVisible();
  await expect(page.getByText('방어 전략 설명', { exact: false }).or(page.getByText('전략 설명'))).toBeVisible();

  /* 방어안 → 공격안 전환 */
  await page.getByRole('button', { name: /공격안/ }).click();
  await expect(page.getByText('보정 없음', { exact: true }).first()).toBeVisible();
});

/* ─── 9. Chatbot FAB ─────────────────────────────────── */
test('Chatbot FAB 클릭 시 채팅 패널이 열린다', async ({ page }) => {
  await page.goto(`${BASE}/analysis/${encodeURIComponent(APP_NUM)}/summary`);

  const fab = page.getByTestId('chatbot-fab');
  await expect(fab).toBeVisible();

  await fab.click();
  await expect(page.getByTestId('chat-panel')).toBeVisible();
  await expect(page.getByTestId('chat-input')).toBeVisible();

  /* 메시지 전송 */
  await page.getByTestId('chat-input').fill('1-A 불일치 설명해줘');
  await page.getByTestId('chat-send').click();
  /* Mock 응답 대기 (~900ms) */
  await expect(page.getByText(/Mock 응답/)).toBeVisible({ timeout: 5_000 });
});

/* ─── 10. 사이드바 탭 네비게이션 ──────────────────────── */
test('사이드바로 4개 탭을 순회할 수 있다', async ({ page }) => {
  await page.goto(`${BASE}/analysis/${encodeURIComponent(APP_NUM)}/summary`);

  const tabs = [
    { link: 'Claim Chart', heading: 'Claim Chart' },
    { link: '공격·방어 전략', heading: '공격·방어 전략' },
    { link: '보정청구항', heading: '보정청구항' },
    { link: '분석 요약', heading: '분석 리포트 요약' },
  ];

  for (const { link, heading } of tabs) {
    await page.getByRole('link', { name: link }).click();
    await expect(page.getByRole('heading', { name: heading, level: 2 })).toBeVisible();
  }
});
