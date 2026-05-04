/**
 * HTML 목업(`Patent_Analysis.html`)의 인라인 `DATA` 객체를
 * 백엔드 `AnalysisResult` 타입에 맞게 정규화한 fixture.
 *
 * 백엔드와 동일한 형태로 유지하여, Mock 모드에서 개발한 컴포넌트가
 * 실제 API 모드로 전환될 때 변경 없이 동작하도록 보장한다.
 */

import type { AnalysisResult } from '../types/analysis';

export const MOCK_ANALYSIS: AnalysisResult = {
  application_number: '10-2014-0036561',
  analysis_id: '20260428-153012-1020140036561',
  version: 1,
  created_at: '2026-04-28T15:30:12+09:00',

  office_action: {
    application_number: '10-2014-0036561',
    rejected_claim_numbers: [1, 4, 5, 6, 7],
    rejection_reasons: [
      {
        article: '특허법 제29조 제2항',
        rejection_type: '진보성',
        target_claim_numbers: [1, 4, 5, 6, 7],
        cited_art_ids: ['인용발명1', '인용발명2'],
        examiner_reasoning:
          '청구항 제1항의 카본블랙 슬러리와 고무 라텍스 혼합 단계는 인용발명1(공개특허 10-2014-0030706)의 혼합 단계와 실질적으로 동일하며, 나머지 구성요소의 결합은 통상의 기술자가 용이하게 도출할 수 있다.',
      },
    ],
    cited_arts: [
      { cited_art_id: '인용발명1', document_number: '10-2014-0030706' },
      { cited_art_id: '인용발명2', document_number: '10-2013-0098123' },
    ],
    examiner_chart: null,
  },

  claim_parse: {
    application_number: '10-2014-0036561',
    total_claims: 7,
    independent_claims: [1],
    dependent_claims: [2, 3, 4, 5, 6, 7],
    claims: [
      {
        claim_number: 1,
        claim_type: '독립항',
        depends_on: [],
        preamble: null,
        original_text:
          '카본블랙 슬러리와 고무 라텍스를 혼합하여 혼합물을 제조하는 단계; 상기 혼합물에 응집제를 첨가하여 응집물을 형성하는 단계; 상기 응집물을 여과하여 분리하는 단계; 및 상기 분리된 응집물을 건조하는 단계;를 포함하는 웨트 마스터배치의 제조방법.',
        elements: [
          {
            element_id: '1-A',
            element_order: 1,
            label: '혼합 단계',
            text: '카본블랙 슬러리와 고무 라텍스를 혼합하여 혼합물을 제조하는 단계',
          },
          {
            element_id: '1-B',
            element_order: 2,
            label: '응집 단계',
            text: '상기 혼합물에 응집제를 첨가하여 응집물을 형성하는 단계',
          },
          {
            element_id: '1-C',
            element_order: 3,
            label: '여과·분리 단계',
            text: '상기 응집물을 여과하여 분리하는 단계',
          },
          {
            element_id: '1-D',
            element_order: 4,
            label: '건조 단계',
            text: '상기 분리된 응집물을 건조하는 단계',
          },
        ],
      },
      {
        claim_number: 4,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제1항에 있어서,',
        original_text:
          '제1항에 있어서, 상기 카본블랙 슬러리는 카본블랙의 농도가 20~40wt%인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
        elements: [
          {
            element_id: '4-A',
            element_order: 1,
            label: '슬러리 농도 한정',
            text: '카본블랙 슬러리의 카본블랙 농도 20~40wt%',
          },
        ],
      },
      {
        claim_number: 5,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제1항에 있어서,',
        original_text:
          '제1항에 있어서, 상기 응집제는 황산인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
        elements: [
          {
            element_id: '5-A',
            element_order: 1,
            label: '응집제 종류 한정',
            text: '응집제가 황산인 것',
          },
        ],
      },
      {
        claim_number: 6,
        claim_type: '종속항',
        depends_on: [4],
        preamble: '제4항에 있어서,',
        original_text:
          '제4항에 있어서, 상기 혼합 단계는 40~60°C에서 수행되는 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
        elements: [
          {
            element_id: '6-A',
            element_order: 1,
            label: '혼합 온도 한정',
            text: '혼합 단계를 40~60°C에서 수행하는 것',
          },
        ],
      },
      {
        claim_number: 7,
        claim_type: '종속항',
        depends_on: [4],
        preamble: '제4항에 있어서,',
        original_text:
          '제4항에 있어서, 상기 카본블랙의 평균 입경은 10~100nm인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
        elements: [
          {
            element_id: '7-A',
            element_order: 1,
            label: '카본블랙 입경 한정',
            text: '카본블랙 평균 입경 10~100nm',
          },
        ],
      },
    ],
  },

  spec_mapping: {
    mappings: [
      {
        element_id: '1-A',
        paragraph_ids: ['0012', '0013', '0018'],
        rationale: '혼합 단계의 슬러리 농도 임계 의의가 [0018]에 명시',
        confidence: 0.92,
      },
      {
        element_id: '1-B',
        paragraph_ids: ['0024'],
        rationale: '황산 응집제 사용 효과가 [0024]에 기재',
        confidence: 0.88,
      },
      {
        element_id: '1-C',
        paragraph_ids: ['0029', '0030'],
        rationale: '여과 분리 단계의 구체적 조건이 [0029]에 기재',
        confidence: 0.85,
      },
      {
        element_id: '1-D',
        paragraph_ids: ['0035'],
        rationale: '건조 단계 온도 및 시간 조건이 [0035]에 기재',
        confidence: 0.90,
      },
      {
        element_id: '4-A',
        paragraph_ids: ['0018', '0019'],
        rationale: '슬러리 농도 20~40wt% 임계 범위 및 실험 데이터가 [0018]~[0019]에 기재',
        confidence: 0.95,
      },
      {
        element_id: '5-A',
        paragraph_ids: ['0024', '0025'],
        rationale: '황산 응집제의 입도 분포 제어 효과가 [0024]~[0025]에 기재',
        confidence: 0.91,
      },
      {
        element_id: '6-A',
        paragraph_ids: ['0021', '0022'],
        rationale: '혼합 온도 40~60°C 범위의 분산성 개선 효과가 [0021]에 기재',
        confidence: 0.87,
      },
      {
        element_id: '7-A',
        paragraph_ids: ['0010', '0011'],
        rationale: '카본블랙 평균 입경 10~100nm 범위가 [0010]에 정의됨',
        confidence: 0.89,
      },
    ],
  },

  claim_chart: {
    charts: [
      {
        target_claim_number: 1,
        rows: [
          {
            element_id: '1-A',
            element_text: '카본블랙 슬러리와 고무 라텍스를 혼합',
            prior_art_id: '인용발명1',
            prior_art_element: '카본블랙 분산액과 고무 라텍스의 혼합',
            prior_art_location: '청구항 1, 단락 [0023]',
            our_match: '차이',
            our_explanation:
              '본 발명의 슬러리 농도(20~40wt%)는 인용발명1에 전혀 개시되어 있지 않음. 해당 수치범위는 분산성 향상에 임계적 의의를 가짐.',
            examiner_match: '동일',
            examiner_explanation: '혼합 단계의 기본 구성이 실질적으로 동일함',
            agreement: '불일치',
            disagreement_rationale:
              "슬러리 농도 수치한정(20~40wt%)이 인용발명1에 개시되지 않으므로 심사관의 '동일' 판정은 부당함",
          },
          {
            element_id: '1-B',
            element_text: '응집제를 첨가하여 응집물을 형성',
            prior_art_id: '인용발명1',
            prior_art_element: '응집제 첨가 후 응집물 형성',
            prior_art_location: '청구항 1, 단락 [0031]',
            our_match: '유사',
            our_explanation:
              '응집 단계는 유사하나 응집제 종류(황산)가 인용발명1(염산)과 달라 응집물 입도 분포가 상이함.',
            examiner_match: '유사',
            examiner_explanation: '응집 단계 기본 구성이 유사함',
            agreement: '일치',
            disagreement_rationale: null,
          },
          {
            element_id: '1-C',
            element_text: '응집물을 여과하여 분리',
            prior_art_id: '인용발명1',
            prior_art_element: null,
            prior_art_location: null,
            our_match: '차이',
            our_explanation:
              '인용발명1은 원심분리를 사용하며 여과에 의한 분리 단계를 개시하지 않음.',
            examiner_match: '차이',
            examiner_explanation: '인용발명1에 여과 분리 단계 미개시',
            agreement: '일치',
            disagreement_rationale: null,
          },
          {
            element_id: '1-D',
            element_text: '분리된 응집물을 건조',
            prior_art_id: '인용발명1',
            prior_art_element: '건조 단계 (열풍 건조)',
            prior_art_location: '단락 [0038]',
            our_match: '동일',
            our_explanation:
              '건조 단계는 인용발명1의 열풍 건조 방식과 실질적으로 동일함.',
            examiner_match: '동일',
            examiner_explanation: '동일한 건조 단계',
            agreement: '일치',
            disagreement_rationale: null,
          },
        ],
      },
      /* ── 청구항 4: 슬러리 농도 20~40wt% ── */
      {
        target_claim_number: 4,
        rows: [
          {
            element_id: '4-A',
            element_text: '카본블랙 슬러리 농도 20~40wt%',
            prior_art_id: '인용발명1',
            prior_art_element: null,
            prior_art_location: null,
            our_match: '차이',
            our_explanation:
              '인용발명1은 슬러리 농도를 특정하지 않으며 20~40wt% 수치범위를 전혀 개시하지 않음. 해당 범위는 분산성·가공성에 임계적 의의를 가짐.',
            examiner_match: '동일',
            examiner_explanation: '슬러리 혼합 단계가 실질적으로 동일함',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 수치범위의 임계적 의의를 간과하고 단순 혼합 단계와 동일하게 판정하였으나, 농도 한정이 없는 인용발명1과는 명백히 구별됨.',
          },
        ],
      },
      /* ── 청구항 5: 황산 응집제 ── */
      {
        target_claim_number: 5,
        rows: [
          {
            element_id: '5-A',
            element_text: '응집제 — 황산',
            prior_art_id: '인용발명1',
            prior_art_element: '응집제 — 염산',
            prior_art_location: '청구항 1, 단락 [0031]',
            our_match: '차이',
            our_explanation:
              '본 발명은 황산을 응집제로 사용하여 균일한 입도 분포를 달성하나, 인용발명1은 염산을 사용하여 입도 분포 편차가 크게 나타남. 응집제 종류에 따른 입도 제어 효과가 상이함.',
            examiner_match: '유사',
            examiner_explanation: '응집제 첨가 단계가 유사함',
            agreement: '불일치',
            disagreement_rationale:
              '황산과 염산은 이온화 특성이 달라 응집물의 입도 분포에 기술적으로 상이한 효과를 나타내므로 단순 유사 판정은 부당함.',
          },
        ],
      },
      /* ── 청구항 6: 혼합 온도 40~60°C ── */
      {
        target_claim_number: 6,
        rows: [
          {
            element_id: '6-A',
            element_text: '혼합 온도 40~60°C',
            prior_art_id: '인용발명1',
            prior_art_element: null,
            prior_art_location: null,
            our_match: '차이',
            our_explanation:
              '인용발명1은 혼합 온도를 특정하지 않으며, 40~60°C 임계 온도 범위를 개시하지 않음. 해당 온도 범위에서 분산 균일성이 현저히 향상됨.',
            examiner_match: '차이',
            examiner_explanation: '인용발명1에 혼합 온도 조건 미개시',
            agreement: '일치',
            disagreement_rationale: null,
          },
        ],
      },
      /* ── 청구항 7: 카본블랙 입경 10~100nm ── */
      {
        target_claim_number: 7,
        rows: [
          {
            element_id: '7-A',
            element_text: '카본블랙 평균 입경 10~100nm',
            prior_art_id: '인용발명2',
            prior_art_element: '카본블랙 입경 (범위 미특정)',
            prior_art_location: '단락 [0015]',
            our_match: '차이',
            our_explanation:
              '인용발명2는 카본블랙 입경을 단락 [0015]에서 언급하나 구체적 수치범위를 특정하지 않음. 10~100nm 범위는 분산성과 보강 효과의 균형을 위한 임계적 범위임.',
            examiner_match: '유사',
            examiner_explanation: '카본블랙 입경이 일반적으로 유사한 범위에 해당',
            agreement: '불일치',
            disagreement_rationale:
              '인용발명2는 구체적 수치를 특정하지 않아 임계 범위의 기술적 의의를 개시하지 않으므로 유사 판정은 부당함.',
          },
        ],
      },
    ],
  },

  strategy: {
    offensive: {
      strategy_type: '공격',
      rationale:
        "심사관은 구성요소 1-A(카본블랙 슬러리 혼합 단계)를 인용발명1과 '동일'로 판정하였으나, 본 발명의 핵심인 슬러리 농도(20~40wt%)는 인용발명1에 전혀 개시되어 있지 않습니다. 이는 단순한 수치한정이 아니라 분산성·가공성에 임계적 의의를 갖는 요건입니다. 구성요소 1-A에 대한 심사관의 '동일' 판정은 명백히 부당하며, 이를 의견서에서 정면으로 반박하여 보정 없이 거절 이유를 해소할 수 있습니다.",
      leveraged_differences: ['1-A', '4-A', '5-A'],
      proposed_action:
        '의견서에서 슬러리 농도(20~40wt%, 청구항 4), 황산 응집제(청구항 5), 혼합 온도(40~60°C, 청구항 6)의 임계적 의의를 실험 데이터로 뒷받침하며 심사관의 구성비교표 오류를 지적. 청구항 보정 없이 거절 이유 해소 시도.',
    },
    defensive: {
      strategy_type: '방어',
      rationale:
        '공격 전략이 받아들여지지 않을 경우를 대비하여 독립항에 추가 한정을 가하는 방어적 보정안을 동시에 준비합니다. 종속항 제2항의 슬러리 농도(20~40wt%)와 제3항의 응집제(황산)를 독립항으로 흡수하여 선행기술과의 차이를 명시적으로 확보합니다.',
      leveraged_differences: ['1-A', '1-B', '4-A', '5-A', '7-A'],
      proposed_action:
        "청구항 1에 슬러리 농도(20~40wt%) 및 황산 응집제 조건 흡수 보정. 청구항 6(혼합 온도), 청구항 7(입경)은 독립된 한정 사항으로 유지. 상세설명 [0018], [0024] 단락을 뒷받침 근거로 활용.",
    },
  },

  amendment: {
    offensive_draft: {
      strategy_type: '공격',
      overall_explanation:
        "청구항을 보정하지 않고 의견서만으로 대응합니다. 구성요소 1-A·4-A의 슬러리 농도 수치범위(20~40wt%), 5-A의 황산 응집제, 7-A의 입경 범위(10~100nm)는 인용발명에 일절 개시되어 있지 않으며, 심사관 판정은 명세서를 간과한 오류입니다.",
      amended_claims: [
        {
          claim_number: 1,
          is_same: true,
          diff_summary: '보정 없음 (청구항 원문 유지)',
          spec_basis: ['0012', '0013'],
          original_text:
            '카본블랙 슬러리와 고무 라텍스를 혼합하여 혼합물을 제조하는 단계; 상기 혼합물에 응집제를 첨가하여 응집물을 형성하는 단계; 상기 응집물을 여과하여 분리하는 단계; 및 상기 분리된 응집물을 건조하는 단계;를 포함하는 웨트 마스터배치의 제조방법.',
          diff: null,
          amended_text: null,
        },
        {
          claim_number: 4,
          is_same: true,
          diff_summary: '보정 없음 (청구항 원문 유지)',
          spec_basis: ['0018', '0019'],
          original_text:
            '제1항에 있어서, 상기 카본블랙 슬러리는 카본블랙의 농도가 20~40wt%인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: null,
          amended_text: null,
        },
        {
          claim_number: 5,
          is_same: true,
          diff_summary: '보정 없음 (청구항 원문 유지)',
          spec_basis: ['0024', '0025'],
          original_text:
            '제1항에 있어서, 상기 응집제는 황산인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: null,
          amended_text: null,
        },
        {
          claim_number: 6,
          is_same: true,
          diff_summary: '보정 없음 (청구항 원문 유지)',
          spec_basis: ['0021', '0022'],
          original_text:
            '제4항에 있어서, 상기 혼합 단계는 40~60°C에서 수행되는 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: null,
          amended_text: null,
        },
        {
          claim_number: 7,
          is_same: true,
          diff_summary: '보정 없음 (청구항 원문 유지)',
          spec_basis: ['0010', '0011'],
          original_text:
            '제4항에 있어서, 상기 카본블랙의 평균 입경은 10~100nm인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: null,
          amended_text: null,
        },
      ],
    },
    defensive_draft: {
      strategy_type: '방어',
      overall_explanation:
        '청구항 1에 슬러리 농도(20~40wt%)·황산 응집제를 흡수하여 선행기술과의 차이를 강화합니다. 청구항 4·5는 독립항 보정에 흡수되어 삭제하고, 청구항 6·7은 보정된 청구항 1에 의존하도록 항번을 조정합니다. 보정 범위는 명세서 단락 [0018], [0024]에 의해 충분히 뒷받침됩니다.',
      amended_claims: [
        {
          claim_number: 1,
          is_same: false,
          diff_summary: '슬러리 농도(20~40wt%) 및 응집제 종류(황산) 한정 추가',
          spec_basis: ['0012', '0013', '0018', '0024'],
          original_text:
            '카본블랙 슬러리와 고무 라텍스를 혼합하여 혼합물을 제조하는 단계; 상기 혼합물에 응집제를 첨가하여 응집물을 형성하는 단계; 상기 응집물을 여과하여 분리하는 단계; 및 상기 분리된 응집물을 건조하는 단계;를 포함하는 웨트 마스터배치의 제조방법.',
          diff: [
            { t: 'del', s: '카본블랙 슬러리' },
            { t: 'add', s: '농도 20~40wt%의 카본블랙 슬러리' },
            { t: 'same', s: '와 고무 라텍스를 혼합하여 혼합물을 제조하는 단계; 상기 혼합물에 ' },
            { t: 'del', s: '응집제' },
            { t: 'add', s: '황산 응집제' },
            { t: 'same', s: '를 첨가하여 응집물을 형성하는 단계; 상기 응집물을 여과하여 분리하는 단계; 및 상기 분리된 응집물을 건조하는 단계;를 포함하는 웨트 마스터배치의 제조방법.' },
          ],
          amended_text:
            '농도 20~40wt%의 카본블랙 슬러리와 고무 라텍스를 혼합하여 혼합물을 제조하는 단계; 상기 혼합물에 황산 응집제를 첨가하여 응집물을 형성하는 단계; 상기 응집물을 여과하여 분리하는 단계; 및 상기 분리된 응집물을 건조하는 단계;를 포함하는 웨트 마스터배치의 제조방법.',
        },
        {
          claim_number: 4,
          is_same: false,
          diff_summary: '청구항 1 흡수로 삭제 처리',
          spec_basis: ['0018'],
          original_text:
            '제1항에 있어서, 상기 카본블랙 슬러리는 카본블랙의 농도가 20~40wt%인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: [
            { t: 'del', s: '제1항에 있어서, 상기 카본블랙 슬러리는 카본블랙의 농도가 20~40wt%인 것을 특징으로 하는 웨트 마스터배치의 제조방법.' },
            { t: 'add', s: '(삭제) — 청구항 1에 흡수' },
          ],
          amended_text: '(삭제)',
        },
        {
          claim_number: 5,
          is_same: false,
          diff_summary: '청구항 1 흡수로 삭제 처리',
          spec_basis: ['0024'],
          original_text:
            '제1항에 있어서, 상기 응집제는 황산인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: [
            { t: 'del', s: '제1항에 있어서, 상기 응집제는 황산인 것을 특징으로 하는 웨트 마스터배치의 제조방법.' },
            { t: 'add', s: '(삭제) — 청구항 1에 흡수' },
          ],
          amended_text: '(삭제)',
        },
        {
          claim_number: 6,
          is_same: false,
          diff_summary: '인용항을 제4항→제1항으로 변경',
          spec_basis: ['0021', '0022'],
          original_text:
            '제4항에 있어서, 상기 혼합 단계는 40~60°C에서 수행되는 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: [
            { t: 'del', s: '제4항' },
            { t: 'add', s: '제1항' },
            { t: 'same', s: '에 있어서, 상기 혼합 단계는 40~60°C에서 수행되는 것을 특징으로 하는 웨트 마스터배치의 제조방법.' },
          ],
          amended_text:
            '제1항에 있어서, 상기 혼합 단계는 40~60°C에서 수행되는 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
        },
        {
          claim_number: 7,
          is_same: false,
          diff_summary: '인용항을 제4항→제1항으로 변경',
          spec_basis: ['0010', '0011'],
          original_text:
            '제4항에 있어서, 상기 카본블랙의 평균 입경은 10~100nm인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
          diff: [
            { t: 'del', s: '제4항' },
            { t: 'add', s: '제1항' },
            { t: 'same', s: '에 있어서, 상기 카본블랙의 평균 입경은 10~100nm인 것을 특징으로 하는 웨트 마스터배치의 제조방법.' },
          ],
          amended_text:
            '제1항에 있어서, 상기 카본블랙의 평균 입경은 10~100nm인 것을 특징으로 하는 웨트 마스터배치의 제조방법.',
        },
      ],
    },
  },

  edit_log: [],
};

/**
 * 진행 단계 시뮬레이션 — 백엔드 6 Tool 단계와 매핑.
 * 각 단계 종료 시점의 누적 ratio.
 */
export const MOCK_PROGRESS_STEPS = [
  { step: '통지서 분석', ratio: 0.15, durationMs: 1800 },
  { step: '청구항 파싱', ratio: 0.3, durationMs: 2200 },
  { step: '상세설명 매핑', ratio: 0.45, durationMs: 1800 },
  { step: 'Claim Chart 생성', ratio: 0.65, durationMs: 2500 },
  { step: '공격·방어 전략', ratio: 0.85, durationMs: 2000 },
  { step: '보정청구항 생성', ratio: 1.0, durationMs: 1800 },
] as const;
