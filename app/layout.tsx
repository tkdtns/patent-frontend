import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Patent AI — 특허 심사대응 플랫폼',
  description: '공격·방어 전략 기반 보정청구항 자동 생성 AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Serif+KR:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
