/**
 * API Data Transfer Objects & Domain Models for Legal AI Backend
 */

export interface HealthResponse {
  status: string;
  service: string;
  version: string;
  environment: string;
}

export interface ReadinessResponse {
  status: 'ready' | 'degraded' | string;
  checks: {
    postgres: string;
    weaviate: string;
    [key: string]: string;
  };
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  bar_council_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name: string;
  bar_council_id?: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Thread {
  id: string;
  project_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  threads: Thread[];
}

export interface ProjectCreate {
  title: string;
  description?: string | null;
}

export interface ProjectUpdate {
  title?: string;
  description?: string | null;
}

export interface ThreadCreate {
  title: string;
}

export interface ThreadUpdate {
  title?: string;
}

export interface DocumentChunkCreate {
  doc_id: string;
  chunk_index?: number;
  title?: string | null;
  content: string;
  metadata?: Record<string, unknown>;
  vector?: number[] | null;
}

export interface VectorSearchQuery {
  query?: string;
  vector?: number[];
  limit?: number;
  alpha?: number;
  filter_doc_id?: string;
}

export interface VectorSearchResultItem {
  id: string;
  doc_id?: string | null;
  chunk_index?: number | null;
  title?: string | null;
  content?: string | null;
  metadata?: {
    case_title?: string;
    court_name?: string;
    case_type?: string;
    year?: number;
    decision_date?: string;
    source_url?: string;
    influence_score?: number;
    [key: string]: unknown;
  };
  score?: number | null;
  distance?: number | null;
}

export interface VectorSearchResponse {
  total_results: number;
  query?: string | null;
  results: VectorSearchResultItem[];
}

export interface VectorStatus {
  connected: boolean;
  configured_url: string;
  default_collection: string;
  available_collections: string[];
}

export interface LegalRAGRequest {
  query: string;
  limit?: number;
  case_type?: string | null;
  min_year?: number;
  search_mode?: "hybrid" | "vector" | "bm25" | string;
  model?: string | null;
  max_tokens?: number;
  thread_id?: string | null;
}

export interface LegalRAGResponse {
  query: string;
  answer: string;
  model_used: string;
  precedents_count: number;
  precedents: VectorSearchResultItem[];
  search_mode_used: string;
  execution_time_ms: number;
}

export interface LegalRAGModelInfo {
  default_model: string;
  supported_models: string[];
  groq_configured: boolean;
}
