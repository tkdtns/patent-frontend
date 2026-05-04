/**
 * 백엔드 `src/patent_agent/models/input.py`와 1:1 대응.
 */

export interface PatentDoc {
  application_number: string;
  title: string | null;
  abstract: string | null;
  claims_text: string;
  spec_text: string | null;
  filing_date: string | null;
}

export interface PriorArtDoc {
  cited_art_id: string;
  document_number: string;
  title: string | null;
  abstract: string | null;
  claims_text: string | null;
  full_text: string | null;
}

export interface OfficeActionRaw {
  application_number: string;
  raw_text: string;
  received_date: string | null;
}
