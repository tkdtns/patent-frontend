interface DisagreementAlertProps {
  elementIds: string[];
}

export function DisagreementAlert({ elementIds }: DisagreementAlertProps) {
  if (!elementIds.length) return null;
  return (
    <div className="flex gap-3 items-start bg-orange-light border border-orange/30 rounded-lg px-4 py-3.5 mb-5">
      <span className="text-[18px] mt-0.5">⚠️</span>
      <div>
        <div className="font-bold text-orange text-[14px] mb-1">
          심사관 구성비교표 불일치 {elementIds.length}건 발견
        </div>
        <div className="text-[13px] text-orange/90">
          구성요소{' '}
          <span className="font-mono font-bold">{elementIds.join(', ')}</span>에서
          심사관 판단에 오류가 있습니다. 공격 전략의 핵심 근거로 활용 가능합니다.
        </div>
      </div>
    </div>
  );
}
