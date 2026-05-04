export function DiffLegend() {
  return (
    <div className="flex gap-4 text-[12px] text-muted px-3.5 py-2.5 bg-bg border border-border-light rounded-md items-center">
      <span className="font-semibold">범례:</span>
      <del className="bg-diff-del-bg text-diff-del px-1.5 rounded-sm no-underline line-through">삭제</del>
      <ins className="bg-diff-add-bg text-diff-add px-1.5 rounded-sm no-underline">추가</ins>
    </div>
  );
}
