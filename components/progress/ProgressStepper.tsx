import { clsx } from 'clsx';

export interface Step {
  label: string;   /* 한국어 */
  en: string;      /* 영문 약자 (스텝 원 아래) */
}

export const ANALYSIS_STEPS: Step[] = [
  { label: '통지서 분석',    en: 'Office Action' },
  { label: '청구항 파싱',    en: 'Claim Parsing' },
  { label: '상세설명 매핑',  en: 'Spec Mapping'  },
  { label: 'Claim Chart 생성', en: 'Claim Chart'  },
  { label: '공격·방어 전략', en: 'Strategy'       },
  { label: '보정청구항 생성', en: 'Amendments'    },
];

interface ProgressStepperProps {
  /** 현재 실행 중인 step 인덱스 (0-based). ratio >= 1 이면 -1 전달 */
  currentIndex: number;
  ratio: number;
}

export function ProgressStepper({ currentIndex, ratio }: ProgressStepperProps) {
  const done = ratio >= 1;
  return (
    <div className="flex justify-between mt-[22px]">
      {ANALYSIS_STEPS.map((s, i) => {
        const isStepDone   = i < currentIndex || done;
        const isStepActive = i === currentIndex && !done;
        return (
          <div key={s.en} className="flex flex-col items-center gap-1.5 flex-1">
            <div
              className={clsx(
                'w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all duration-300',
                isStepDone  && 'bg-accent border-accent text-white',
                isStepActive && 'bg-accent-light border-accent text-accent',
                !isStepDone && !isStepActive && 'bg-bg border-border text-muted',
              )}
            >
              {isStepDone ? '✓' : i + 1}
            </div>
            <span
              className={clsx(
                'text-[9.5px] text-center leading-tight',
                isStepDone   && 'text-accent font-bold',
                isStepActive && 'text-text  font-bold',
                !isStepDone && !isStepActive && 'text-muted',
              )}
            >
              {s.en}
            </span>
          </div>
        );
      })}
    </div>
  );
}
