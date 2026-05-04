import { AnalysisProvider } from '@/lib/providers/AnalysisProvider';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChatbotFab } from '@/components/chatbot/ChatbotFab';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

/**
 * 결과 화면 공통 레이아웃.
 * - AnalysisProvider 가 SWR 캐시를 모든 탭에 공유
 * - progress 페이지는 route group 밖에 있으므로 사이드바가 표시되지 않음
 */
export default function ResultsLayout({ children, params }: Props) {
  const applicationNumber = decodeURIComponent(params.id);

  return (
    <AnalysisProvider applicationNumber={applicationNumber}>
      <div className="flex min-h-screen bg-bg">
        <Sidebar applicationNumber={applicationNumber} />
        <main
          id="main-content"
          className="flex-1 ml-sidebar min-h-screen overflow-y-auto px-9 py-7"
        >
          {children}
        </main>
        <ChatbotFab applicationNumber={applicationNumber} />
      </div>
    </AnalysisProvider>
  );
}
