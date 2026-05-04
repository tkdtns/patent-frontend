import { redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default function AnalysisRootPage({ params }: Props) {
  redirect(`/analysis/${params.id}/summary`);
}
