/** 0.0~1.0 → "85%" */
export function pct(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

/** ISO 날짜 → "2026-04-28 15:30" */
export function formatDateTime(iso: string): string {
  return new Date(iso)
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\. /g, '-')
    .replace('.', '');
}

/** 단락 ID 배열 → "[0012], [0018]" */
export function formatParaIds(ids: string[]): string {
  return ids.map((id) => `[${id}]`).join(', ');
}
