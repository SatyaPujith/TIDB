export interface Profile {
  id: number;
  name: string;
  summary: string;
  hero_image_url?: string;
  created_at: string;
}

export interface Event {
  id: number;
  person_id: number;
  date: string;
  event_text: string;
  categories: string[];
  source_url?: string;
  source_snippet?: string;
  confidence: number;
}

export interface Provenance {
  id: number;
  event_id: number;
  url: string;
  fetch_time: string;
  snippet: string;
  note?: string;
}

export interface SearchResult {
  profiles: Profile[];
  totalCount: number;
}

export interface TimelineEvent extends Event {
  provenance?: Provenance[];
}

export interface Candidate {
  name: string;
  descriptor: string;
  source_url: string;
  snippet: string;
  similarity_score: number;
}