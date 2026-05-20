/**
 * 실제 파이프라인 출력 데이터를 프론트엔드 Mock 데이터로 활용.
 *
 * 출처: https://github.com/123owq/patent_ai_agent/tree/multi-model-support
 *   - data/analysis/10-2014-0036561/anthropic__claude-sonnet-4.6/result.json
 *   - data/analysis/10-2019-0156160/anthropic__claude-sonnet-4.6/result.json
 *
 * 백엔드와 동일한 형태로 유지하여, Mock 모드에서 개발한 컴포넌트가
 * 실제 API 모드로 전환될 때 변경 없이 동작하도록 보장한다.
 */

import type { AnalysisResult } from '../types/analysis';
import type { CitedArtDetail } from '../types/output';

/** 케이스 1: 10-2014-0036561 — 타이어 트레드용 고무 조성물 (WMB 진보성) */
export const MOCK_ANALYSIS: AnalysisResult = {
  analysis_id: '20260520-160723-10-2014-0036561',
  application_number: '10-2014-0036561',
  llm_model: 'anthropic/claude-sonnet-4.6',
  created_at: '2026-05-20T16:07:23.321149',
  version: 1,
  source_files: {},
  errors: [],

  office_action: {
    application_number: '10-2014-0036561',
    rejection_reasons: [
      {
        article: '특허법 제29조제2항',
        rejection_type: '진보성',
        target_claim_numbers: [1, 4, 5, 6, 7],
        cited_art_ids: ['인용발명1', '인용발명2'],
        examiner_reasoning:
          '이 출원 제1항 발명은 통상의 기술자가 인용발명1로부터 용이하게 발명할 수 있습니다. 해당 기술분야에서 스티렌-부타디엔 고무에서 스티렌과 비닐의 함량을 조절해 보는 것과 카본블랙의 요오드 흡착가 및 DBT 흡착량을 조절하는 것은 통상적이며, 인용발명1에 웨트 마스터 배치용 스티렌-부타디엔고무의 스티렌 함량과 카본블랙의 DBT흡착량이 이 출원 제1항 발명과 동일한 범위를 포함하고 있는바, 이를 토대로 통상의 기술자가 스티렌-부타디엔의 비닐 함량 및 카본블랙의 요오드흡착가를 조절해 보는 것은 어렵지 않고, 상기 청구항에 특정되어 있는 범위 내에서 현저히 우수한 효과를 본다고 인정하기도 어렵습니다.',
      },
      {
        article: '특허법 제42조제4항제2호',
        rejection_type: '기재불비',
        target_claim_numbers: [6],
        cited_art_ids: [],
        examiner_reasoning:
          '이 출원 제6항은 제5항의 가공오일을 특정하면서 연화제 내 각 성분들의 함량을 특정하고 있으나, 상기 연화제는 제5항 및 이것이 인용하는 항에 전혀 기재되어 있지 않으므로 이로부터 특정된 발명의 구성은 불명확합니다.',
      },
    ],
    rejected_claim_numbers: [1, 4, 5, 6, 7],
    cited_arts: [
      {
        cited_art_id: '인용발명1',
        document_number: '한국공개특허공보 제10-2000-0018563호(2000.04.06.)',
      },
      {
        cited_art_id: '인용발명2',
        document_number: '한국공개특허공보 제10-2014-0030706호(2014.03.12.)',
      },
    ],
    examiner_chart: [
      {
        comparison_id: '1-1',
        claim_number: 1,
        element_label: '구성1',
        our_claim_text:
          '웨트 마스터 배치: 50-200중량부 (스티렌부타디엔라텍스 100중량부(스티렌함량 40-85중량%, 비닐함량 15-60중량%), 잔여아로마틱추출물오일 50-200중량부, 제조방법: 회분식 중합, 카본블랙 50-200중량부(요오드흡착가 200-1000mg/g, DBT흡착량 150-800ml/100g))',
        prior_art_text:
          '웨트 마스터 배치: 130-180중량부 (방향족오일 140중량부, 스티렌부타디엔고무 100중량부(스티렌함량 40중량%), 카본블랙 140중량부(DBT흡착량 130cc/100g))',
        prior_art_id: '인용발명1',
        prior_art_location: '청구항 1; page 2(상, 하단부)',
        examiner_match: '차이',
        note: '이 출원 제1항 발명은 통상의 기술자가 인용발명1로부터 용이하게 발명할 수 있음',
      },
      {
        comparison_id: '1-2',
        claim_number: 1,
        element_label: '구성2',
        our_claim_text: '스티렌-부타디엔 고무: 60-70',
        prior_art_text: '스티렌-부타디엔 고무: 70-100중량부',
        prior_art_id: '인용발명1',
        prior_art_location: null,
        examiner_match: '동일',
        note: null,
      },
      {
        comparison_id: '1-3',
        claim_number: 1,
        element_label: '구성3',
        our_claim_text:
          '카본블랙: 50-200중량부 (요오드흡착가 200-1000mg/g, DBT흡착량 150-800ml/100g)',
        prior_art_text: '카본블랙: 140중량부 (DBT흡착량 130cc/100g)',
        prior_art_id: '인용발명1',
        prior_art_location: null,
        examiner_match: '동일',
        note: null,
      },
      {
        comparison_id: '1-4',
        claim_number: 1,
        element_label: '구성4',
        our_claim_text: '석유계 수지: 10-60중량부 (연화점 50-170℃)',
        prior_art_text: '방향족계 탄화수소 수지: 5-25중량부 (연화점 110-130℃)',
        prior_art_id: '인용발명1',
        prior_art_location: null,
        examiner_match: '동일',
        note: null,
      },
    ],
  },

  claim_parse: {
    application_number: '10-2014-0036561',
    total_claims: 7,
    independent_claims: [1, 7],
    dependent_claims: [2, 3, 4, 5, 6],
    claims: [
      {
        claim_number: 1,
        claim_type: '독립항',
        depends_on: [],
        preamble: '타이어 트레드용 고무 조성물',
        original_text:
          '웨트 마스터 배치(wet master batch) 50 내지 200 중량부 및 스티렌-부타디엔 고무 60 내지 70 중량부를 포함하는 원료고무 100중량부에 대하여; 요오드(I2) 흡착가가 200 내지 1000mg/g이고, 디부틸프탈레이트(dibutylphthalate) 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200 중량부; 그리고 50 내지 170℃의 온도범위에서 연화점을 갖는 석유계 수지 10 내지 60중량부를 포함하며, 상기 웨트 마스터 배치는 (i) 스티렌 함량 40 내지 85중량% 및 비닐 함량 15 내지 60중량%를 포함하는 스티렌부타디엔 라텍스 100중량부에 대하여, (ii) 요오드(I2) 흡착가가 200 내지 1000mg/g이고, DBP 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200중량부, 그리고 (iii) 잔여 아로마틱 추출물(residual aromatic extract) 오일 50 내지 200 중량부를 회분식 방법에 의해 중합시켜 제조된 것인 타이어 트레드용 고무 조성물.',
        elements: [
          {
            element_id: '1-A',
            element_order: 1,
            text: '웨트 마스터 배치(wet master batch) 50 내지 200 중량부 및 스티렌-부타디엔 고무 60 내지 70 중량부를 포함하는 원료고무 100중량부',
            label: '원료고무 조성',
          },
          {
            element_id: '1-B',
            element_order: 2,
            text: '요오드(I2) 흡착가가 200 내지 1000mg/g이고, 디부틸프탈레이트(dibutylphthalate) 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200 중량부',
            label: '카본블랙 사양',
          },
          {
            element_id: '1-C',
            element_order: 3,
            text: '50 내지 170℃의 온도범위에서 연화점을 갖는 석유계 수지 10 내지 60중량부',
            label: '석유계 수지',
          },
          {
            element_id: '1-D',
            element_order: 4,
            text: '상기 웨트 마스터 배치는 (i) 스티렌 함량 40 내지 85중량% 및 비닐 함량 15 내지 60중량%를 포함하는 스티렌부타디엔 라텍스 100중량부에 대하여, (ii) 요오드(I2) 흡착가가 200 내지 1000mg/g이고, DBP 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200중량부, 그리고 (iii) 잔여 아로마틱 추출물(residual aromatic extract) 오일 50 내지 200 중량부를 회분식 방법에 의해 중합시켜 제조된 것',
            label: 'WMB 제조방법',
          },
        ],
      },
      {
        claim_number: 2,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제1항에 있어서',
        original_text:
          '제1항에 있어서, 상기 스티렌-부타디엔 고무가 유리전이온도(Tg)가 -19 내지 29℃인 용액중합 스티렌-부타디엔 고무인 것인 타이어 트레드용 고무 조성물.',
        elements: [
          {
            element_id: '2-A',
            element_order: 1,
            text: '상기 스티렌-부타디엔 고무가 유리전이온도(Tg)가 -19 내지 29℃인 용액중합 스티렌-부타디엔 고무인 것',
            label: 'SBR 유리전이온도',
          },
        ],
      },
      {
        claim_number: 3,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제1항에 있어서',
        original_text:
          '제1항에 있어서, 상기 스티렌-부타디엔 고무가 스티렌 함량이 30 내지 50중량%이고, 비닐 함량이 40 내지 65중량%이며, 그리고 상기 스티렌 및 비닐의 총 합계량 100중량부에 대하여 RAE 오일을 1 내지 40중량부로 포함하는 것인 타이어 트레드용 고무 조성물.',
        elements: [
          {
            element_id: '3-A',
            element_order: 1,
            text: '상기 스티렌-부타디엔 고무가 스티렌 함량이 30 내지 50중량%이고, 비닐 함량이 40 내지 65중량%인 것',
            label: 'SBR 단량체 함량',
          },
          {
            element_id: '3-B',
            element_order: 2,
            text: '상기 스티렌 및 비닐의 총 합계량 100중량부에 대하여 RAE 오일을 1 내지 40중량부로 포함하는 것',
            label: 'RAE 오일 함량',
          },
        ],
      },
      {
        claim_number: 4,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제1항에 있어서',
        original_text:
          '제1항에 있어서, 상기 석유계 수지는 140 내지 170℃의 온도범위에서 연화점을 갖는 것인 타이어 트레드용 고무 조성물.',
        elements: [
          {
            element_id: '4-A',
            element_order: 1,
            text: '상기 석유계 수지는 140 내지 170℃의 온도범위에서 연화점을 갖는 것',
            label: '수지 연화점 범위',
          },
        ],
      },
      {
        claim_number: 5,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제1항에 있어서',
        original_text:
          '제1항에 있어서, 상기 원료고무 100 중량부에 대하여, 가공오일 1 내지 50중량부; 노화방지제 1 내지 6중량부; 가황제 0.5 내지 2중량부; 및 가황촉진제 1.5 내지 3.5중량부로 이루어진 군에서 선택되는 1종 이상의 첨가제를 더 포함하는 것인 타이어 트레드용 고무 조성물.',
        elements: [
          {
            element_id: '5-A',
            element_order: 1,
            text: '상기 원료고무 100 중량부에 대하여, 가공오일 1 내지 50중량부; 노화방지제 1 내지 6중량부; 가황제 0.5 내지 2중량부; 및 가황촉진제 1.5 내지 3.5중량부로 이루어진 군에서 선택되는 1종 이상의 첨가제를 더 포함하는 것',
            label: '첨가제 조성',
          },
        ],
      },
      {
        claim_number: 6,
        claim_type: '종속항',
        depends_on: [5],
        preamble: '제5항에 있어서',
        original_text:
          '제5항에 있어서, 상기 가공오일이 폴리사이클릭 방향족 탄화수소(Polycyclic Aromatic Hydocarbon) 성분의 총 함량이 3 중량% 이하이고, 동점도가 95℃ 이상(210 ℉ SUS), 연화제 내 방향족 성분이 15 내지 25 중량%, 나프텐계 성분이 27 내지 37 중량% 및 파라핀계 성분이 38 내지 58 중량%인 것인 타이어 트레드용 고무 조성물.',
        elements: [
          {
            element_id: '6-A',
            element_order: 1,
            text: '상기 가공오일이 폴리사이클릭 방향족 탄화수소(Polycyclic Aromatic Hydocarbon) 성분의 총 함량이 3 중량% 이하인 것',
            label: 'PAH 함량 제한',
          },
          {
            element_id: '6-B',
            element_order: 2,
            text: '동점도가 95℃ 이상(210 ℉ SUS)인 것',
            label: '가공오일 동점도',
          },
          {
            element_id: '6-C',
            element_order: 3,
            text: '연화제 내 방향족 성분이 15 내지 25 중량%, 나프텐계 성분이 27 내지 37 중량% 및 파라핀계 성분이 38 내지 58 중량%인 것',
            label: '오일 성분 조성',
          },
        ],
      },
      {
        claim_number: 7,
        claim_type: '독립항',
        depends_on: [],
        preamble: '타이어',
        original_text:
          '제1항 내지 제6항 중 어느 한 항에 따른 타이어 트레드용 고무 조성물을 이용하여 제조한 타이어.',
        elements: [
          {
            element_id: '7-A',
            element_order: 1,
            text: '제1항 내지 제6항 중 어느 한 항에 따른 타이어 트레드용 고무 조성물을 이용하여 제조한 것',
            label: '고무조성물 적용',
          },
        ],
      },
    ],
  },

  spec_mapping: {
    mappings: [
      {
        element_id: '1-A',
        paragraph_ids: ['0004'],
        rationale:
          '단락 0004에서 웨트 마스터 배치와 보강성 충진제를 포함한 원료고무 조성에 대한 연구 개발 내용을 언급하고 있어 원료고무 조성 구성요소를 뒷받침한다.',
        confidence: 0.3,
      },
      {
        element_id: '1-B',
        paragraph_ids: ['0004'],
        rationale:
          '단락 0004에서 다양한 사양을 지닌 보강성 충진제(카본블랙)가 포함된 웨트 마스터 배치에 대한 연구 개발을 언급하고 있어 카본블랙 사양 구성요소와 관련된다.',
        confidence: 0.25,
      },
      {
        element_id: '1-C',
        paragraph_ids: ['0004'],
        rationale:
          '단락 0004에서 고온 연화점을 가진 레진(석유계 수지)과의 배합을 통해 성능을 향상시키는 연구를 언급하고 있어 석유계 수지 구성요소를 뒷받침한다.',
        confidence: 0.3,
      },
      {
        element_id: '1-D',
        paragraph_ids: ['0004'],
        rationale:
          '단락 0004에서 웨트 마스터 배치 제조 및 보강성 충진제 포함에 대한 연구 개발을 언급하고 있어 WMB 제조방법과 관련된다.',
        confidence: 0.2,
      },
      { element_id: '2-A', paragraph_ids: [], rationale: '제공된 명세서 단락에서 스티렌-부타디엔 고무의 유리전이온도에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      { element_id: '3-A', paragraph_ids: [], rationale: '제공된 명세서 단락에서 스티렌-부타디엔 고무의 스티렌 함량 및 비닐 함량에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      { element_id: '3-B', paragraph_ids: [], rationale: '제공된 명세서 단락에서 RAE 오일 함량에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      {
        element_id: '4-A',
        paragraph_ids: ['0004'],
        rationale:
          '단락 0004에서 고온 연화점을 가진 레진에 대한 언급이 있어 석유계 수지의 연화점 범위 구성요소와 간접적으로 관련된다.',
        confidence: 0.25,
      },
      { element_id: '5-A', paragraph_ids: [], rationale: '제공된 명세서 단락에서 가공오일, 노화방지제, 가황제, 가황촉진제 등 첨가제 조성에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      { element_id: '6-A', paragraph_ids: [], rationale: '제공된 명세서 단락에서 폴리사이클릭 방향족 탄화수소 성분 함량 제한에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      { element_id: '6-B', paragraph_ids: [], rationale: '제공된 명세서 단락에서 가공오일의 동점도에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      { element_id: '6-C', paragraph_ids: [], rationale: '제공된 명세서 단락에서 연화제 내 방향족, 나프텐계, 파라핀계 성분 조성에 대한 구체적인 설명을 찾을 수 없다.', confidence: 0.0 },
      {
        element_id: '7-A',
        paragraph_ids: ['0002', '0003', '0004'],
        rationale:
          '단락 0002~0004에서 초고성능 타이어 개발 및 타이어 트레드용 고무 조성물의 필요성과 배경을 설명하고 있어 타이어 트레드용 고무 조성물 적용과 관련된다.',
        confidence: 0.3,
      },
    ],
  },

  claim_chart: {
    charts: [
      {
        target_claim_number: 1,
        rows: [
          {
            comparison_id: 'C0001',
            element_id: '구성1',
            element_text: '웨트 마스터 배치: 50-200중량부',
            prior_art_id: '인용발명1',
            prior_art_element:
              '마스터배치 175 내지 300 중량부 (청구항1); 웨트 마스터 배치 130~180중량부 (실시예)',
            prior_art_location: '청구항 1; page 2(상, 하단부)',
            our_match: '유사',
            our_explanation:
              '양측 모두 웨트 마스터 배치(WMB)를 원료고무 구성요소로 사용하므로 성분·기능은 동일합니다. 본원은 50~200중량부, 선행문헌 청구항1은 175~300중량부로 175~200 구간에서만 일부 중첩됩니다.',
            examiner_match: '차이',
            examiner_explanation: '웨트 마스터 배치: 130-180중량부',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 차이로 판정하였으나, 선행문헌 청구항의 175~300중량부와 본원 50~200중량부는 175~200 구간에서 일부 중첩되므로 완전한 차이가 아닌 유사로 판단합니다.',
          },
          {
            comparison_id: 'C0002',
            element_id: '구성2',
            element_text: '스티렌-부타디엔 고무: 60-70중량부',
            prior_art_id: '인용발명1',
            prior_art_element: '원료고무 0 내지 37.5 중량부 (청구항1); 스티렌-부타디엔 고무 70~100중량부 (선행문헌 기재)',
            prior_art_location: null,
            our_match: '유사',
            our_explanation:
              '양측 모두 스티렌-부타디엔 고무(SBR)를 사용하므로 성분·기능은 동일합니다. 본원 60~70중량부와 선행문헌 70~100중량부는 70중량부 지점에서만 접하는 인접 범위입니다.',
            examiner_match: '동일',
            examiner_explanation: '스티렌-부타디엔 고무: 70-100중량부',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 동일로 판정하였으나, 본원 60~70중량부와 선행문헌 70~100중량부는 70 지점에서만 접하는 인접 범위로 실질적 중첩이 거의 없습니다.',
          },
          {
            comparison_id: 'C0003',
            element_id: '구성3',
            element_text: '카본블랙: 50-200중량부 (요오드흡착가 200-1000mg/g, DBP흡착량 150-800ml/100g)',
            prior_art_id: '인용발명1',
            prior_art_element:
              '카본블랙: 요오드 흡착량 230mg/g 이상, DBP 흡유량 130cc/100g 이상 (청구항4); 마스터배치 내 카본블랙 60~150중량부 (청구항1)',
            prior_art_location: null,
            our_match: '유사',
            our_explanation:
              '양측 모두 카본블랙을 사용하므로 성분·기능은 동일합니다. DBP흡착량에서 선행문헌(130cc/100g)은 본원 하한(150ml/100g)에 미달하여 본원의 고구조 카본블랙 범위를 개시하지 못합니다.',
            examiner_match: '동일',
            examiner_explanation: '카본블랙: 140중량부 (DBT흡착량 130cc/100g)',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 동일로 판정하였으나, 선행문헌의 DBP흡착량 130cc/100g은 본원 하한 150ml/100g에 미달하여 본원 범위 밖입니다.',
          },
          {
            comparison_id: 'C0004',
            element_id: '구성4',
            element_text: '석유계 수지: 10-60중량부 (연화점 50-170℃)',
            prior_art_id: '인용발명1',
            prior_art_element: '방향족계 탄화수소 수지: 5~25중량부, 연화점 110~130℃',
            prior_art_location: null,
            our_match: '유사',
            our_explanation:
              '본원은 \'석유계 수지\'이고 선행문헌은 \'방향족계 탄화수소 수지\'입니다. 방향족계 탄화수소 수지는 석유계 수지의 하위 개념에 해당합니다. 중량부는 일부 중첩(10~25)되나 연화점은 선행문헌(110~130℃)이 본원(50~170℃) 내에 완전히 포함됩니다.',
            examiner_match: '동일',
            examiner_explanation: '방향족계 탄화수소 수지: 5-25중량부 (연화점 110-130℃)',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 동일로 판정하였으나, 중량부 범위(본원 10~60 vs 선행문헌 5~25)가 일부 중첩(10~25)에 그치고 선행문헌 하한(5)이 본원 하한(10) 미만입니다.',
          },
        ],
      },
    ],
  },

  strategy: {
    offensive: {
      strategy_type: '공격',
      rationale:
        'Claim Chart 분석 결과, 구성1~4 모두에서 심사관 판정과 우리 판정 간 불일치가 존재합니다. 특히 구성3(카본블랙 DBP흡착량)에서 선행문헌(130cc/100g)이 본원 하한(150ml/100g)에 미달하여 본원의 고구조 카본블랙 범위를 개시하지 못하며, WMB 중량부(본원 50~200 vs 선행문헌 청구항 기준 175~300)는 175~200 구간에서만 일부 중첩됩니다. 이를 근거로 청구항 변경 없이 의견서를 통해 진보성을 주장할 수 있습니다.',
      leveraged_differences: ['구성1', '구성2', '구성3', '구성4'],
      proposed_action:
        '청구항을 변경하지 않고 의견서를 제출합니다. (1) 구성1: 선행문헌 WMB 175~300중량부와 본원 50~200중량부는 175~200에서만 중첩 — 본원의 50~175 구간은 전혀 개시되지 않음. (2) 구성3: 선행문헌 DBP흡착량(130cc/100g)이 본원 하한(150ml/100g)에 미달. (3) 구성2·4: 수치범위가 경계점 또는 일부 중첩에 불과. (4) 명세서 실시예 데이터로 WMB 비율, SBR 스티렌/비닐 함량, 고구조 카본블랙 조합의 현저한 효과를 수치로 제시.',
    },
    defensive: {
      strategy_type: '방어',
      rationale:
        '거절이유를 확실히 극복하기 위해 청구항에 구성요소를 추가 한정하는 방어적 전략을 수립합니다. 구성3(카본블랙)의 DBP흡착량 하한(150ml/100g)을 청구항에서 명확히 하고, 구성1(WMB 중량부)의 상한을 선행문헌 하한(175) 미만으로 조정하거나 회분식 제조방법을 명시 추가합니다. 구성4(석유계 수지)의 연화점을 선행문헌(110~130℃)과 중첩되지 않는 범위로 좁힙니다.',
      leveraged_differences: ['구성1', '구성3', '구성4'],
      proposed_action:
        '(1) 청구항 1항 구성3: DBP흡착량 하한 150ml/100g 유지, 요오드흡착가를 230mg/g 초과~1000mg/g으로 상향. (2) 청구항 1항 구성1: WMB 중량부 범위를 50~174중량부로 조정하거나 \'회분식으로 제조된 웨트 마스터 배치로서\' 문구 추가. (3) 청구항 4항: 연화점을 130℃ 초과~170℃로 좁혀 선행문헌(110~130℃)과 중첩 제거. (4) 청구항 6항: \'연화제\' 용어를 \'가공오일\'로 통일하여 기재불비 해소.',
    },
  },

  amendment: {
    offensive_draft: {
      strategy_type: '공격',
      amended_claims: [
        {
          claim_number: 1,
          original_text: '웨트 마스터 배치(wet master batch) 50 내지 200 중량부 및 스티렌-부타디엔 고무 60 내지 70 중량부를 포함하는 원료고무 100중량부에 대하여; 요오드(I2) 흡착가가 200 내지 1000mg/g이고, 디부틸프탈레이트(dibutylphthalate) 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200 중량부; 그리고 50 내지 170℃의 온도범위에서 연화점을 갖는 석유계 수지 10 내지 60중량부를 포함하며, 상기 웨트 마스터 배치는 (i) 스티렌 함량 40 내지 85중량% 및 비닐 함량 15 내지 60중량%를 포함하는 스티렌부타디엔 라텍스 100중량부에 대하여, (ii) 요오드(I2) 흡착가가 200 내지 1000mg/g이고, DBP 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200중량부, 그리고 (iii) 잔여 아로마틱 추출물(residual aromatic extract) 오일 50 내지 200 중량부를 회분식 방법에 의해 중합시켜 제조된 것인 타이어 트레드용 고무 조성물.',
          amended_text: null,
          diff_summary:
            '원문 유지 — 의견서로 진보성 주장. WMB 중량부(50~200 vs 선행문헌 175~300)의 부분 중첩, 카본블랙 DBP흡착량(150~800ml/100g vs 선행문헌 130cc/100g 미달) 등 구성1~4 전반에 걸친 불일치를 근거로 청구항 변경 없이 진보성을 다툼.',
          spec_basis: [],
        },
        {
          claim_number: 7,
          original_text: '제1항 내지 제6항 중 어느 한 항에 따른 타이어 트레드용 고무 조성물을 이용하여 제조한 타이어.',
          amended_text: null,
          diff_summary: '원문 유지 — 독립항 제1항과 동일한 의견서 전략 적용.',
          spec_basis: [],
        },
      ],
      overall_explanation:
        '청구항 변경 없이 의견서를 통해 진보성을 주장하는 공격 전략을 채택합니다. (1) WMB 중량부: 본원 50~200 vs 선행문헌 175~300으로 175~200 구간에서만 일부 중첩, 본원의 50~175 구간은 전혀 개시 안 됨. (2) 카본블랙 DBP흡착량: 선행문헌 130cc/100g이 본원 하한 150ml/100g에 미달. (3) 구성2·4: 수치범위가 경계점 또는 일부 중첩에 불과. (4) 명세서 실시예 데이터로 현저한 효과를 수치로 제시.',
    },
    defensive_draft: {
      strategy_type: '방어',
      amended_claims: [
        {
          claim_number: 1,
          original_text: '웨트 마스터 배치(wet master batch) 50 내지 200 중량부 및 스티렌-부타디엔 고무 60 내지 70 중량부를 포함하는 원료고무 100중량부에 대하여; 요오드(I2) 흡착가가 200 내지 1000mg/g이고, 디부틸프탈레이트(dibutylphthalate) 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200 중량부; 그리고 50 내지 170℃의 온도범위에서 연화점을 갖는 석유계 수지 10 내지 60중량부를 포함하며, 상기 웨트 마스터 배치는 (i) 스티렌 함량 40 내지 85중량% 및 비닐 함량 15 내지 60중량%를 포함하는 스티렌부타디엔 라텍스 100중량부에 대하여, (ii) 요오드(I2) 흡착가가 200 내지 1000mg/g이고, DBP 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200중량부, 그리고 (iii) 잔여 아로마틱 추출물(residual aromatic extract) 오일 50 내지 200 중량부를 회분식 방법에 의해 중합시켜 제조된 것인 타이어 트레드용 고무 조성물.',
          amended_text:
            '웨트 마스터 배치(wet master batch) 50 내지 174 중량부 및 스티렌-부타디엔 고무 60 내지 70 중량부를 포함하는 원료고무 100중량부에 대하여; 요오드(I2) 흡착가가 230mg/g 초과 내지 1000mg/g이고, 디부틸프탈레이트(dibutylphthalate) 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200 중량부; 그리고 130℃ 초과 내지 170℃의 온도범위에서 연화점을 갖는 석유계 수지 10 내지 60중량부를 포함하며, 상기 웨트 마스터 배치는 회분식으로 제조된 웨트 마스터 배치로서, (i) 스티렌 함량 40 내지 85중량% 및 비닐 함량 15 내지 60중량%를 포함하는 스티렌부타디엔 라텍스 100중량부에 대하여, (ii) 요오드(I2) 흡착가가 200 내지 1000mg/g이고, DBP 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200중량부, 그리고 (iii) 잔여 아로마틱 추출물(residual aromatic extract) 오일 50 내지 200 중량부를 회분식 방법에 의해 중합시켜 제조된 것인 타이어 트레드용 고무 조성물.',
          diff_summary:
            '[구성1-WMB] 50~200 → 50~174 중량부 상한 축소. 회분식 제조방법 한정 추가. [구성3] 요오드흡착가 200~1000 → 230mg/g 초과~1000mg/g으로 하한 상향. [구성4] 연화점 50~170℃ → 130℃ 초과~170℃로 하한 상향.',
          spec_basis: ['0004'],
          diff: [
            { t: 'del', s: '50 내지 200 중량부' },
            { t: 'add', s: '50 내지 174 중량부' },
            { t: 'same', s: ' 및 스티렌-부타디엔 고무 60 내지 70 중량부를 포함하는 원료고무 100중량부에 대하여; 요오드(I2) 흡착가가 ' },
            { t: 'del', s: '200 내지 1000mg/g' },
            { t: 'add', s: '230mg/g 초과 내지 1000mg/g' },
            { t: 'same', s: '이고, 디부틸프탈레이트(dibutylphthalate) 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200 중량부; 그리고 ' },
            { t: 'del', s: '50 내지 170℃' },
            { t: 'add', s: '130℃ 초과 내지 170℃' },
            { t: 'same', s: '의 온도범위에서 연화점을 갖는 석유계 수지 10 내지 60중량부를 포함하며, 상기 웨트 마스터 배치는 ' },
            { t: 'add', s: '회분식으로 제조된 웨트 마스터 배치로서, ' },
            { t: 'same', s: '(i) 스티렌 함량 40 내지 85중량% 및 비닐 함량 15 내지 60중량%를 포함하는 스티렌부타디엔 라텍스 100중량부에 대하여, (ii) 요오드(I2) 흡착가가 200 내지 1000mg/g이고, DBP 흡착량이 150 내지 800ml/100g인 카본블랙 50 내지 200중량부, 그리고 (iii) 잔여 아로마틱 추출물(residual aromatic extract) 오일 50 내지 200 중량부를 회분식 방법에 의해 중합시켜 제조된 것인 타이어 트레드용 고무 조성물.' },
          ],
        },
        {
          claim_number: 4,
          original_text: '제1항에 있어서, 상기 석유계 수지는 140 내지 170℃의 온도범위에서 연화점을 갖는 것인 타이어 트레드용 고무 조성물.',
          amended_text:
            '제1항에 있어서, 상기 석유계 수지는 130℃ 초과 내지 170℃의 온도범위에서 연화점을 갖는 것인 타이어 트레드용 고무 조성물.',
          diff_summary:
            '연화점 범위를 140~170℃ → 130℃ 초과~170℃로 보정하여 선행문헌(110~130℃)과의 중첩을 완전히 제거.',
          spec_basis: ['0004'],
          diff: [
            { t: 'same', s: '제1항에 있어서, 상기 석유계 수지는 ' },
            { t: 'del', s: '140 내지 170℃' },
            { t: 'add', s: '130℃ 초과 내지 170℃' },
            { t: 'same', s: '의 온도범위에서 연화점을 갖는 것인 타이어 트레드용 고무 조성물.' },
          ],
        },
        {
          claim_number: 6,
          original_text:
            '제5항에 있어서, 상기 가공오일이 폴리사이클릭 방향족 탄화수소(Polycyclic Aromatic Hydocarbon) 성분의 총 함량이 3 중량% 이하이고, 동점도가 95℃ 이상(210 ℉ SUS), 연화제 내 방향족 성분이 15 내지 25 중량%, 나프텐계 성분이 27 내지 37 중량% 및 파라핀계 성분이 38 내지 58 중량%인 것인 타이어 트레드용 고무 조성물.',
          amended_text:
            '제5항에 있어서, 상기 가공오일이 폴리사이클릭 방향족 탄화수소(Polycyclic Aromatic Hydrocarbon) 성분의 총 함량이 3 중량% 이하이고, 동점도가 95℃ 이상(210℉ SUS), 가공오일 내 방향족 성분이 15 내지 25 중량%, 나프텐계 성분이 27 내지 37 중량% 및 파라핀계 성분이 38 내지 58 중량%인 것인 타이어 트레드용 고무 조성물.',
          diff_summary: '\'연화제 내 방향족 성분\' → \'가공오일 내 방향족 성분\'으로 용어 통일하여 기재불비 해소.',
          spec_basis: [],
          diff: [
            { t: 'same', s: '제5항에 있어서, 상기 가공오일이 폴리사이클릭 방향족 탄화수소(Polycyclic Aromatic ' },
            { t: 'del', s: 'Hydocarbon' },
            { t: 'add', s: 'Hydrocarbon' },
            { t: 'same', s: ') 성분의 총 함량이 3 중량% 이하이고, 동점도가 95℃ 이상(210℉ SUS), ' },
            { t: 'del', s: '연화제' },
            { t: 'add', s: '가공오일' },
            { t: 'same', s: ' 내 방향족 성분이 15 내지 25 중량%, 나프텐계 성분이 27 내지 37 중량% 및 파라핀계 성분이 38 내지 58 중량%인 것인 타이어 트레드용 고무 조성물.' },
          ],
        },
      ],
      overall_explanation:
        '방어적 전략에 따라 3개 항을 보정함. 제1항: WMB 상한을 174중량부로 축소 + 회분식 제조 한정 추가, 요오드흡착가 하한을 230mg/g 초과로 상향, 석유계 수지 연화점 하한을 130℃ 초과로 상향. 제4항: 연화점을 130℃ 초과~170℃로 좁혀 선행문헌과 중첩 제거. 제6항: \'연화제\' 용어를 \'가공오일\'로 통일하여 기재불비 해소.',
    },
  },

  claim_conclusion: {
    items: [
      {
        claim_number: 1,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '부분동의',
        our_reasoning:
          '청구항 1의 핵심 구성인 웨트 마스터 배치의 중량부 범위(50-200중량부)는 인용발명1의 범위(175-300중량부)와 일부 중복되나 완전히 동일하지 않고, SBR의 비닐 함량(15-60중량%) 및 카본블랙의 요오드 흡착가(200-1000mg/g) 범위가 인용발명1에 명시적으로 개시되어 있는지 불분명합니다. 다만 회분식 제조방법은 해당 기술분야에서 통상적이고 DBP 흡착량 범위는 일부 중복되어 일부 구성은 진보성 부정이 가능합니다.',
      },
      {
        claim_number: 4,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '부분동의',
        our_reasoning:
          '청구항 4의 연화점(140-170℃)과 인용발명1(110-130℃)은 전혀 겹치지 않아 단순한 수치 조정으로 보기 어렵습니다. 다만 모 청구항(제1항)의 진보성이 부정될 경우 이 항도 영향을 받으므로 부분동의로 판단합니다.',
      },
      {
        claim_number: 5,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '동의',
        our_reasoning:
          '청구항 5의 첨가제(가공오일, 노화방지제, 가황제, 가황촉진제)는 고무 조성물 분야에서 통상적으로 사용되는 성분들이며, 인용발명1에도 유황(가황제) 등의 첨가가 기재되어 있어 심사관의 거절 이유는 타당합니다.',
      },
      {
        claim_number: 6,
        rejection_type: '기재불비',
        merged_from: [],
        our_verdict: '동의',
        our_reasoning:
          '청구항 6은 가공오일 특성을 규정하면서 \'연화제\'를 사용하고 있으나, 해당 청구항 및 이것이 인용하는 제5항, 제1항 어디에도 \'연화제\'가 정의되거나 기재되어 있지 않습니다. 보호받고자 하는 사항이 불명확하다는 심사관의 판단은 타당합니다.',
      },
      {
        claim_number: 6,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '동의',
        our_reasoning:
          '청구항 6의 가공오일 특성(PAHs 3중량% 이하, 동점도 95 이상 등)은 인용발명2에 TDAE 오일로서 동일하게 기재되어 있습니다. 인용발명1에 인용발명2의 TDAE 오일 특성을 적용하는 것은 통상의 기술자에게 자명합니다.',
      },
      {
        claim_number: 7,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '동의',
        our_reasoning:
          '청구항 7은 제1항 내지 제6항의 고무 조성물을 이용한 타이어 제조로, 인용발명1 및 2에도 타이어 트레드용 고무 조성물을 이용한 타이어 제조가 기재되어 있으므로 자명합니다.',
      },
    ],
  },

  edit_log: [],
};

/** 케이스 2: 10-2019-0156160 — 흡착홈·흡착 삽입체를 포함한 타이어 (신규성 분쟁) */
export const MOCK_ANALYSIS_2: AnalysisResult = {
  analysis_id: '20260520-161014-10-2019-0156160',
  application_number: '10-2019-0156160',
  llm_model: 'anthropic/claude-sonnet-4.6',
  created_at: '2026-05-20T16:10:14.996410',
  version: 1,
  source_files: {},
  errors: [],

  office_action: {
    application_number: '10-2019-0156160',
    rejection_reasons: [
      {
        article: '특허법 제42조제4항제2호',
        rejection_type: '기재불비',
        target_claim_numbers: [3],
        cited_art_ids: [],
        examiner_reasoning:
          '청구항 제3항의 \'원형\' 또는 \'타원형\'은 제2항의 \'다각형\'의 범주에 속하지 않으므로 불명확합니다.',
      },
      {
        article: '특허법 제29조제1항제2호',
        rejection_type: '신규성',
        target_claim_numbers: [1],
        cited_art_ids: ['인용발명1'],
        examiner_reasoning:
          '위 표에서 살펴본 바와 같이, 제1항 발명의 구성 1, 2는 인용발명 1의 대응구성과 실질적으로 동일합니다. 따라서 제1항 발명은 인용발명 1과 실질적으로 동일합니다.',
      },
      {
        article: '특허법 제29조제2항',
        rejection_type: '진보성',
        target_claim_numbers: [1, 2, 3, 4, 5],
        cited_art_ids: ['인용발명1', '인용발명2'],
        examiner_reasoning:
          '제1항 발명은 위 2-1.에서 살펴본 바와 같이 인용발명 1과 실질적으로 동일하므로 통상의 기술자가 쉽게 발명할 수 있습니다. 제2항 발명은 인용발명 2에 홈 내부에 고무 스파이크가 설치되고 일부가 벽면으로부터 이격되는 것이 개시되어 있어 기술적 구성의 곤란성이 없습니다.',
      },
    ],
    rejected_claim_numbers: [1, 2, 3, 4, 5],
    cited_arts: [
      { cited_art_id: '인용발명1', document_number: '10-2005-0014583' },
      { cited_art_id: '인용발명2', document_number: '10-1327212' },
    ],
    examiner_chart: [
      {
        comparison_id: '제1항-구성1',
        claim_number: 1,
        element_label: '구성1',
        our_claim_text: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈',
        prior_art_text: '트레드 영역의 그루부사이에 원주방향을 따라 구비된 홈(42) (도면 2, 3 참조)',
        prior_art_id: '인용발명1',
        prior_art_location: '도면 2, 3',
        examiner_match: '동일',
        note: null,
      },
      {
        comparison_id: '제1항-구성2',
        claim_number: 1,
        element_label: '구성2',
        our_claim_text: '흡착홈의 내부에 구비된 흡착 삽입체',
        prior_art_text: '홈(42) 내부에 구비된 충전물질(5) (도면 2, 3 참조)',
        prior_art_id: '인용발명1',
        prior_art_location: '도면 2, 3',
        examiner_match: '동일',
        note: null,
      },
    ],
  },

  claim_parse: {
    application_number: '10-2019-0156160',
    total_claims: 5,
    independent_claims: [1],
    dependent_claims: [2, 3, 4, 5],
    claims: [
      {
        claim_number: 1,
        claim_type: '독립항',
        depends_on: [],
        preamble: '타이어',
        original_text:
          '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈; 및 상기 흡착홈의 내부에 구비된 흡착 삽입체; 를 포함하는 타이어.',
        elements: [
          { element_id: '1-A', element_order: 1, text: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈', label: '흡착홈 구비' },
          { element_id: '1-B', element_order: 2, text: '상기 흡착홈의 내부에 구비된 흡착 삽입체', label: '흡착 삽입체' },
        ],
      },
      {
        claim_number: 2,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제 1 항에 있어서',
        original_text:
          '제 1 항에 있어서, 상기 흡착홈은 다각형의 단면 형태를 갖고, 상기 흡착 삽입체는 상기 흡착홈의 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비되는 것을 특징으로 하는 타이어.',
        elements: [
          { element_id: '2-A', element_order: 1, text: '상기 흡착홈은 다각형의 단면 형태를 갖고', label: '흡착홈 단면형태' },
          { element_id: '2-B', element_order: 2, text: '상기 흡착 삽입체는 상기 흡착홈의 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비되는 것', label: '삽입체 돌기형태' },
        ],
      },
      {
        claim_number: 3,
        claim_type: '종속항',
        depends_on: [2],
        preamble: '제 2 항에 있어서',
        original_text:
          '제 2 항에 있어서, 상기 흡착홈은 직사각형, 정사각형, 원형 및 타원형 중 어느 하나의 단면 형태를 갖는 것을 특징으로 하는 타이어.',
        elements: [
          { element_id: '3-A', element_order: 1, text: '상기 흡착홈은 직사각형, 정사각형, 원형 및 타원형 중 어느 하나의 단면 형태를 갖는 것', label: '흡착홈 형태선택' },
        ],
      },
      {
        claim_number: 4,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제 1 항에 있어서',
        original_text:
          '제 1 항에 있어서, 상기 흡착 삽입체는 상기 흡착홈의 형태에 따라 원통형, 구형 및 럭비공형 중 어느 하나인 것을 특징으로 하는 타이어.',
        elements: [
          { element_id: '4-A', element_order: 1, text: '상기 흡착 삽입체는 상기 흡착홈의 형태에 따라 원통형, 구형 및 럭비공형 중 어느 하나인 것', label: '삽입체 형태선택' },
        ],
      },
      {
        claim_number: 5,
        claim_type: '종속항',
        depends_on: [1],
        preamble: '제 1 항에 있어서',
        original_text:
          '제 1 항에 있어서, 상기 흡착 삽입체는 상부측이 상기 타이어의 마모한계선과 동일한 위치 또는 상기 마모한계선보다 낮은 위치에 구비되는 것을 특징으로 하는 타이어.',
        elements: [
          { element_id: '5-A', element_order: 1, text: '상기 흡착 삽입체는 상부측이 상기 타이어의 마모한계선과 동일한 위치 또는 상기 마모한계선보다 낮은 위치에 구비되는 것', label: '삽입체 위치설정' },
        ],
      },
    ],
  },

  spec_mapping: {
    mappings: [
      { element_id: '1-A', paragraph_ids: ['0012', '0024', '0025'], rationale: '단락 0012는 청구항의 흡착홈 구성을 직접 기재하고, 단락 0024~0025는 흡착홈이 그루브 사이에 원주방향으로 구비되는 구체적 실시예를 설명한다.', confidence: 0.98 },
      { element_id: '1-B', paragraph_ids: ['0012', '0026', '0027'], rationale: '단락 0012는 흡착홈 내부에 구비된 흡착 삽입체를 청구항 수준에서 기재하고, 단락 0026~0027은 흡착 삽입체의 구체적 구조와 장착 방식을 상세히 설명한다.', confidence: 0.98 },
      { element_id: '2-A', paragraph_ids: ['0013', '0025'], rationale: '단락 0013은 흡착홈이 다각형의 단면 형태를 갖는다고 직접 기재하고, 단락 0025는 직사각형, 정사각형, 원형, 타원형 등 다각형 단면 형태를 구체적으로 설명한다.', confidence: 0.97 },
      { element_id: '2-B', paragraph_ids: ['0013', '0027', '0029'], rationale: '단락 0013은 흡착 삽입체가 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비됨을 직접 기재하고, 단락 0027~0029는 이격 틈새 및 돌기 형태의 구체적 실시예를 설명한다.', confidence: 0.96 },
      { element_id: '3-A', paragraph_ids: ['0014', '0025'], rationale: '단락 0014는 흡착홈의 단면 형태가 직사각형, 정사각형, 원형, 타원형 중 어느 하나임을 청구항 수준에서 기재하고, 단락 0025는 이를 구체적으로 설명한다.', confidence: 0.98 },
      { element_id: '4-A', paragraph_ids: ['0015', '0028'], rationale: '단락 0015는 흡착 삽입체가 흡착홈 형태에 따라 원통형, 구형, 럭비공형 중 어느 하나임을 직접 기재하고, 단락 0028은 각 형태별 구체적 실시예를 상세히 설명한다.', confidence: 0.98 },
      { element_id: '5-A', paragraph_ids: ['0016', '0027'], rationale: '단락 0016은 흡착 삽입체의 상부측이 마모한계선과 동일하거나 낮은 위치에 구비됨을 직접 기재하고, 단락 0027은 이를 구체적 실시예로 설명한다.', confidence: 0.98 },
    ],
  },

  claim_chart: {
    charts: [
      {
        target_claim_number: 1,
        rows: [
          {
            comparison_id: 'C0001',
            element_id: '구성1',
            element_text: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈',
            prior_art_id: '인용발명1',
            prior_art_element: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 홈(42) (도면 2, 3 참조)',
            prior_art_location: null,
            our_match: '유사',
            our_explanation:
              '위치(그루브 사이, 원주방향)와 구조(홈)는 동일하나, 본원의 \'흡착홈\'은 흡착 기능이라는 특정 기능적 한정을 포함하고 있고, 선행문헌의 홈(42, 커프)은 흡착 기능을 명시적으로 개시하지 않습니다.',
            examiner_match: '동일',
            examiner_explanation: '트레드 영역의 그루부사이에 원주방향을 따라 구비된 홈(42) (도면 2, 3 참조)',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 동일로 판단하였으나, 본원의 \'흡착홈\'은 흡착이라는 특정 기능적 특성을 내포하는 반면 선행문헌의 홈(42)은 단순한 홈으로서 흡착 기능이 명시적으로 개시되어 있지 않아 완전히 동일하다고 보기 어렵습니다.',
          },
          {
            comparison_id: 'C0002',
            element_id: '구성2',
            element_text: '흡착홈의 내부에 구비된 흡착 삽입체',
            prior_art_id: '인용발명1',
            prior_art_element: '홈(42) 내부에 구비된 충전물질(5) (도면 2, 3 참조)',
            prior_art_location: null,
            our_match: '유사',
            our_explanation:
              '홈 내부에 별도 물질을 삽입한다는 구조적 유사성은 있으나, 본원의 흡착 삽입체는 흡착 기능을 목적으로 하는 반면 선행문헌의 충전물질은 강성 조절 및 마모 표시 목적으로 기능·목적이 다릅니다.',
            examiner_match: '동일',
            examiner_explanation: '홈(42) 내부에 구비된 충전물질(5) (도면 2, 3 참조)',
            agreement: '불일치',
            disagreement_rationale:
              '심사관은 동일로 판단하였으나, 본원의 \'흡착 삽입체\'는 흡착 기능을 수행하는 구성인 반면 선행문헌의 \'충전물질(5)\'은 강성 조절을 목적으로 하는 고무조성물로서 기능·목적이 상이합니다.',
          },
        ],
      },
    ],
  },

  strategy: {
    offensive: {
      strategy_type: '공격',
      rationale:
        '심사관은 구성1(흡착홈)과 구성2(흡착 삽입체)를 선행문헌과 동일하다고 판단하였으나, 두 구성 모두 \'유사\'에 해당하며 완전히 동일하지 않습니다. 구성1의 \'흡착홈\'은 단순한 홈(커프, 42)과 달리 흡착이라는 특정 기능적 특성을 내포하고, 구성2의 \'흡착 삽입체\'는 선행문헌의 \'충전물질(5)\'과 기능·목적이 상이합니다.',
      leveraged_differences: ['구성1', '구성2'],
      proposed_action:
        '청구항 변경 없이 의견서를 제출하여 다음을 주장합니다. (1) 구성1: 본원의 \'흡착홈\'은 흡착 기능을 내포하는 반면 선행문헌 홈(42)은 흡착 기능이 미개시. (2) 구성2: 본원의 \'흡착 삽입체\'는 흡착 목적인 반면 충전물질(5)은 강성 조절·마모 표시 목적으로 기능·목적이 본질적으로 상이. (3) 두 구성의 결합에 의한 노면 흡착력 향상 효과는 선행문헌에 개시 또는 암시된 바 없음.',
    },
    defensive: {
      strategy_type: '방어',
      rationale:
        '의견서만으로 거절이유를 극복하기 어려운 경우를 대비하여, 청구항에 구성요소를 추가 한정합니다. 흡착홈의 구체적 구조(깊이, 배치, 흡착력 발생 방식)와 흡착 삽입체의 재질·구조(탄성 재질, 이격 구조)를 추가하여 선행문헌과의 차별성을 청구항 문언상 명확히 합니다. 기재불비 문제(제3항 원형·타원형이 제2항 다각형 범주 불포함)도 동시에 해소합니다.',
      leveraged_differences: ['구성1', '구성2'],
      proposed_action:
        '(1) 제1항 보정: 흡착홈에 깊이 및 흡착력 발생 구조, 흡착 삽입체에 이격·탄성 재질 특징 추가. (2) 제2항 보정: \'다각형\'을 \'다각형, 원형 또는 타원형\'으로 수정하여 기재불비 해소. (3) 제3항 보정: 제2항 종속을 제1항 직접 종속으로 변경하는 대안적 보정 병행.',
    },
  },

  amendment: {
    offensive_draft: {
      strategy_type: '공격',
      amended_claims: [
        { claim_number: 1, original_text: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈; 및 상기 흡착홈의 내부에 구비된 흡착 삽입체; 를 포함하는 타이어.', amended_text: null, diff_summary: '원문 유지 — 의견서로 신규성·진보성 주장.', spec_basis: [] },
        { claim_number: 2, original_text: '제 1 항에 있어서, 상기 흡착홈은 다각형의 단면 형태를 갖고, 상기 흡착 삽입체는 상기 흡착홈의 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비되는 것을 특징으로 하는 타이어.', amended_text: null, diff_summary: '원문 유지 — 의견서로 진보성 주장.', spec_basis: [] },
        { claim_number: 3, original_text: '제 2 항에 있어서, 상기 흡착홈은 직사각형, 정사각형, 원형 및 타원형 중 어느 하나의 단면 형태를 갖는 것을 특징으로 하는 타이어.', amended_text: null, diff_summary: '원문 유지 — 의견서로 진보성 주장.', spec_basis: [] },
        { claim_number: 4, original_text: '제 1 항에 있어서, 상기 흡착 삽입체는 상기 흡착홈의 형태에 따라 원통형, 구형 및 럭비공형 중 어느 하나인 것을 특징으로 하는 타이어.', amended_text: null, diff_summary: '원문 유지 — 의견서로 진보성 주장.', spec_basis: [] },
        { claim_number: 5, original_text: '제 1 항에 있어서, 상기 흡착 삽입체는 상부측이 상기 타이어의 마모한계선과 동일한 위치 또는 상기 마모한계선보다 낮은 위치에 구비되는 것을 특징으로 하는 타이어.', amended_text: null, diff_summary: '원문 유지 — 의견서로 진보성 주장.', spec_basis: [] },
      ],
      overall_explanation:
        '청구항 변경 없이 의견서를 통해 다음을 주장합니다. (1) \'흡착홈\'은 흡착 기능적 한정을 포함하여 선행문헌의 단순 홈(커프, 42)과 동일하지 않습니다. (2) \'흡착 삽입체\'는 흡착 기능 목적인 반면 선행문헌 충전물질(5)은 강성 조절 목적으로 기능·목적이 상이합니다. (3) 두 구성의 결합에 의한 노면 흡착력 향상 효과는 선행문헌에 개시 또는 암시된 바 없어 신규성 및 진보성이 있습니다.',
    },
    defensive_draft: {
      strategy_type: '방어',
      amended_claims: [
        {
          claim_number: 1,
          original_text: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈; 및 상기 흡착홈의 내부에 구비된 흡착 삽입체; 를 포함하는 타이어.',
          amended_text:
            '트레드 영역의 그루브 사이에 원주방향을 따라 구비되고, 서브 트레드로부터 일정 깊이(t)를 가지며 탄성 재질로 이루어진 흡착 삽입체와의 결합에 의해 노면과의 흡착력을 발생시키는 흡착홈; 및 상기 흡착홈의 내부에 상기 흡착홈의 내부 벽면으로부터 이격되어 구비되고, 타이어의 탄성과 동일하거나 그보다 높은 탄성을 갖는 탄성 재질로 이루어진 흡착 삽입체; 를 포함하는 타이어.',
          diff_summary:
            '흡착홈에 \'서브 트레드로부터 일정 깊이 + 흡착력 발생\' 구조 추가. 흡착 삽입체에 \'벽면 이격 + 탄성 재질\' 특징 추가.',
          spec_basis: ['0025', '0026', '0027'],
          diff: [
            { t: 'del', s: '트레드 영역의 그루브 사이에 원주방향을 따라 구비된 흡착홈' },
            { t: 'add', s: '트레드 영역의 그루브 사이에 원주방향을 따라 구비되고, 서브 트레드로부터 일정 깊이(t)를 가지며 탄성 재질로 이루어진 흡착 삽입체와의 결합에 의해 노면과의 흡착력을 발생시키는 흡착홈' },
            { t: 'same', s: '; 및 상기 흡착홈의 내부에 ' },
            { t: 'add', s: '상기 흡착홈의 내부 벽면으로부터 이격되어 구비되고, 타이어의 탄성과 동일하거나 그보다 높은 탄성을 갖는 탄성 재질로 이루어진 ' },
            { t: 'same', s: '흡착 삽입체; 를 포함하는 타이어.' },
          ],
        },
        {
          claim_number: 2,
          original_text: '제 1 항에 있어서, 상기 흡착홈은 다각형의 단면 형태를 갖고, 상기 흡착 삽입체는 상기 흡착홈의 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비되는 것을 특징으로 하는 타이어.',
          amended_text:
            '제1항에 있어서, 상기 흡착홈은 다각형, 원형 또는 타원형의 단면 형태를 갖고, 상기 흡착 삽입체는 상기 흡착홈의 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비되는 것을 특징으로 하는 타이어.',
          diff_summary: '기재불비 해소를 위해 \'다각형\' → \'다각형, 원형 또는 타원형\'으로 보정하여 제3항과의 모순 해소.',
          spec_basis: ['0013', '0025', '0027'],
          diff: [
            { t: 'same', s: '제1항에 있어서, 상기 흡착홈은 ' },
            { t: 'del', s: '다각형' },
            { t: 'add', s: '다각형, 원형 또는 타원형' },
            { t: 'same', s: '의 단면 형태를 갖고, 상기 흡착 삽입체는 상기 흡착홈의 내부 벽면으로부터 이격되어 하부면에 돌기 형태로 구비되는 것을 특징으로 하는 타이어.' },
          ],
        },
        {
          claim_number: 3,
          original_text: '제 2 항에 있어서, 상기 흡착홈은 직사각형, 정사각형, 원형 및 타원형 중 어느 하나의 단면 형태를 갖는 것을 특징으로 하는 타이어.',
          amended_text:
            '제1항에 있어서, 상기 흡착홈은 직사각형, 정사각형, 원형 및 타원형 중 어느 하나의 단면 형태를 갖는 것을 특징으로 하는 타이어.',
          diff_summary: '제2항 종속 → 제1항 직접 종속으로 변경 (대안적 보정).',
          spec_basis: ['0014', '0025'],
          diff: [
            { t: 'del', s: '제 2 항' },
            { t: 'add', s: '제1항' },
            { t: 'same', s: '에 있어서, 상기 흡착홈은 직사각형, 정사각형, 원형 및 타원형 중 어느 하나의 단면 형태를 갖는 것을 특징으로 하는 타이어.' },
          ],
        },
      ],
      overall_explanation:
        '방어적 전략에 따라 3개 항을 보정함. (1) 제1항: 흡착홈에 깊이·흡착력 발생 구조, 흡착 삽입체에 이격·탄성 재질 특징 추가하여 선행문헌과의 차별성을 문언상 명확히 함. (2) 제2항: \'다각형\'을 \'다각형, 원형 또는 타원형\'으로 보정하여 기재불비 해소. (3) 제3항: 제2항 종속을 제1항 직접 종속으로 변경하는 대안적 보정. 모든 보정은 단락 0013~0016, 0025~0029 범위 내.',
    },
  },

  claim_conclusion: {
    items: [
      {
        claim_number: 1,
        rejection_type: '신규성',
        merged_from: ['신규성', '진보성'],
        our_verdict: '부분동의',
        our_reasoning:
          '\'흡착홈\' 및 \'흡착 삽입체\'는 인용발명1의 홈(42)과 충전물질(5)에 각각 구조적으로 대응되나, \'흡착\'이라는 기능적 특성이 인용발명1에 명시적으로 개시되어 있는지 불분명합니다. 실질적 동일성 판단에 부분적 이견이 있습니다.',
      },
      {
        claim_number: 2,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '부분동의',
        our_reasoning:
          '인용발명2에 홈 내부 고무 스파이크가 벽면으로부터 이격되는 구성이 개시되어 있어 진보성 부정 방향은 타당하나, \'하부면에 돌기 형태\'의 구체적 구성이 명확히 대응되는지 충분히 설명되지 않았습니다.',
      },
      {
        claim_number: 3,
        rejection_type: '기재불비',
        merged_from: [],
        our_verdict: '동의',
        our_reasoning: '청구항 3에서 \'원형\' 및 \'타원형\'은 상위 청구항(제2항)의 \'다각형\' 범주에 속하지 않아 상위 청구항과 모순됩니다. 기재불비 거절은 타당합니다.',
      },
      {
        claim_number: 3,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '부분동의',
        our_reasoning: '인용발명1의 홈(42)이 원형 단면을 가진다는 점에서 진보성 부정 방향은 수긍할 수 있으나, 기재불비 문제가 선결되어야 합니다.',
      },
      {
        claim_number: 4,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '부분동의',
        our_reasoning: '인용발명2의 고무 스파이크가 둥근 형태인 점에서 진보성 부정 방향은 타당하나, \'럭비공형\'이 명확히 개시되어 있는지 충분히 설명되지 않았습니다.',
      },
      {
        claim_number: 5,
        rejection_type: '진보성',
        merged_from: [],
        our_verdict: '부분동의',
        our_reasoning: '마모한계선 대비 삽입체 위치 설정이 인용발명1에 직접 개시되어 있는지 불분명하나, 타이어 기술분야에서 통상적 설계사항으로 볼 여지가 있어 부분적 이견이 있습니다.',
      },
    ],
  },

  edit_log: [],
};

/** 인용발명 상세 Mock 데이터 */
export const MOCK_CITED_ART_DETAILS: Record<string, CitedArtDetail> = {
  인용발명1: {
    cited_art_id: '인용발명1',
    document_number: '10-2000-0018563',
    title: '웨트 마스터 배치용 스티렌부타디엔고무 조성물 및 이를 이용한 타이어 트레드용 고무 조성물',
    applicant: '한국타이어 주식회사',
    filing_date: '1998-11-04',
    abstract:
      '본 발명은 회분식 중합에 의해 제조된 웨트 마스터 배치를 포함하는 타이어 트레드용 고무 조성물에 관한 것이다. 스티렌부타디엔 라텍스와 카본블랙을 포함한 웨트 마스터 배치, 스티렌-부타디엔 고무, 방향족계 탄화수소 수지를 포함하며, 타이어의 내마모성 및 웨트 그립을 동시에 향상시킨다.',
    key_claims: [
      {
        claim_number: 1,
        text: '스티렌부타디엔라텍스 100 중량부에 대하여 방향족오일 140중량부 및 카본블랙 140중량부(DBT흡착량 130cc/100g)를 포함하는 웨트 마스터 배치 175 내지 300 중량부, 스티렌-부타디엔 고무 0 내지 37.5 중량부, 방향족계 탄화수소 수지(연화점 110~130℃) 5~25중량부를 포함하는 타이어 트레드용 고무 조성물.',
      },
      {
        claim_number: 4,
        text: '제1항에 있어서, 카본블랙이 요오드 흡착량 230mg/g 이상, DBP 흡유량 130cc/100g 이상인 것을 특징으로 하는 타이어 트레드용 고무 조성물.',
      },
    ],
    relevant_paragraphs: [
      {
        paragraph_id: '0023',
        text: '[0023] 웨트 마스터 배치는 스티렌부타디엔라텍스 100중량부에 대해 방향족오일 140중량부, 카본블랙 140중량부를 회분식으로 혼합하여 제조하였다. 스티렌 함량은 40중량%이다.',
      },
      {
        paragraph_id: '0031',
        text: '[0031] 상기 웨트 마스터 배치 175 내지 300중량부에 스티렌-부타디엔 고무 0 내지 37.5중량부를 혼합하고 방향족계 탄화수소 수지(연화점 110~130℃) 5~25중량부를 첨가하였다.',
      },
    ],
  },
  인용발명2: {
    cited_art_id: '인용발명2',
    document_number: '10-2014-0030706',
    title: 'TDAE 오일을 포함하는 타이어 트레드용 고무 조성물',
    applicant: '금호타이어 주식회사',
    filing_date: '2012-09-10',
    abstract:
      '본 발명은 스티렌-부타디엔 마스터배치를 포함하는 고무 조성물에서 TDAE(Treated Distillate Aromatic Extract) 오일을 가공유로 사용하는 타이어 트레드용 고무 조성물에 관한 것이다.',
    key_claims: [
      {
        claim_number: 1,
        text: '스티렌-부타디엔 마스터배치를 포함하는 고무 조성물에 있어서, PAHs 총 함량 3중량% 이하, 동점도 95 이상(210℉ SUS), 방향족 성분 15~25중량%, 나프텐계 성분 27~37중량%, 파라핀계 성분 38~58중량%인 TDAE 오일을 가공유로 사용하는 타이어 트레드용 고무 조성물.',
      },
    ],
    relevant_paragraphs: [
      {
        paragraph_id: '0054',
        text: '[0054] 가공유로서 TDAE 오일을 사용할 수 있으며, PAHs 성분의 총 함량이 3중량% 이하이고, 동점도가 95 이상(210℉ SUS)인 것이 바람직하다.',
      },
      {
        paragraph_id: '0055',
        text: '[0055] TDAE 오일은 연화제 내의 방향족 성분이 15 내지 25중량%, 나프텐계 성분이 27 내지 37중량% 및 파라핀계 성분이 38 내지 58중량%인 것이 특히 바람직하다.',
      },
    ],
  },
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
