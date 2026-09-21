import {
  HealthResponse,
  ReadinessResponse,
  User,
  UserCreate,
  LoginRequest,
  Token,
  Project,
  ProjectDetail,
  ProjectCreate,
  ProjectUpdate,
  Thread,
  ThreadCreate,
  ThreadUpdate,
  ThreadMessage,
  VectorSearchQuery,
  VectorSearchResponse,
  VectorStatus,
  DocumentChunkCreate,
  LegalRAGRequest,
  LegalRAGResponse,
  LegalRAGModelInfo,
} from './types';

const STORAGE_KEY_TOKEN = 'legal_ai_access_token';
const STORAGE_KEY_API_URL = 'legal_ai_api_url';
const isProd = process.env.NODE_ENV === 'production';
export const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (isProd ? 'https://legal-ai-backend-75al.onrender.com' : 'http://localhost:8000');

/**
 * Custom error class with status code and detail message
 */
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Retrieve current API base URL
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem(STORAGE_KEY_API_URL);
    // In local development, if customUrl was pointing to Render, reset it so local dev uses localhost
    if (!isProd && customUrl && customUrl.includes('legal-ai-backend-75al.onrender.com')) {
      localStorage.removeItem(STORAGE_KEY_API_URL);
      return DEFAULT_API_URL.replace(/\/$/, '');
    }
    if (customUrl && customUrl.trim()) {
      return customUrl.trim().replace(/\/$/, '');
    }
  }
  return DEFAULT_API_URL.replace(/\/$/, '');
}

/**
 * Override API base URL (e.g. from UI settings)
 */
export function setApiBaseUrl(url: string | null): void {
  if (typeof window === 'undefined') return;
  if (url && url.trim()) {
    localStorage.setItem(STORAGE_KEY_API_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API_URL);
  }
}

/**
 * Get stored JWT token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY_TOKEN);
}

/**
 * Save or clear stored JWT token
 */
export function setAuthToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }
}

/**
 * Core fetch wrapper with auth header and error normalization
 */
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  let jsonResponse: unknown;
  try {
    jsonResponse = await response.json();
  } catch {
    jsonResponse = null;
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    if (jsonResponse && typeof jsonResponse === 'object' && 'detail' in jsonResponse) {
      const detail = (jsonResponse as { detail: unknown }).detail;
      if (typeof detail === 'string') {
        errorMessage = detail;
      } else if (Array.isArray(detail)) {
        errorMessage = detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).join(', ');
      }
    }
    throw new ApiError(errorMessage, response.status, jsonResponse);
  }

  return jsonResponse as T;
}

export const api = {
  // Health & Diagnostics
  health: {
    check: () => request<HealthResponse>('/api/v1/health'),
    ready: () => request<ReadinessResponse>('/api/v1/ready'),
  },

  // Authentication & Profile
  auth: {
    register: (userData: UserCreate) =>
      request<User>('/api/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    login: (credentials: LoginRequest) =>
      request<Token>('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    getMe: () => request<User>('/api/v1/auth/me'),
  },

  // Case / Projects Management
  projects: {
    list: (skip = 0, limit = 100) =>
      request<Project[]>(`/api/v1/projects/?skip=${skip}&limit=${limit}`),
    get: (projectId: string) =>
      request<ProjectDetail>(`/api/v1/projects/${projectId}`),
    create: (data: ProjectCreate) =>
      request<Project>('/api/v1/projects/', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (projectId: string, data: ProjectUpdate) =>
      request<Project>(`/api/v1/projects/${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (projectId: string) =>
      request<void>(`/api/v1/projects/${projectId}`, {
        method: 'DELETE',
      }),
  },

  // Chat Threads
  threads: {
    list: (projectId: string) =>
      request<Thread[]>(`/api/v1/projects/${projectId}/threads`),
    get: (threadId: string) =>
      request<Thread>(`/api/v1/threads/${threadId}`),
    create: (projectId: string, data: ThreadCreate) =>
      request<Thread>(`/api/v1/projects/${projectId}/threads`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (threadId: string, data: ThreadUpdate) =>
      request<Thread>(`/api/v1/threads/${threadId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (threadId: string) =>
      request<void>(`/api/v1/threads/${threadId}`, {
        method: 'DELETE',
      }),
    getMessages: (threadId: string) =>
      request<ThreadMessage[]>(`/api/v1/threads/${threadId}/messages`),
    clearMessages: (threadId: string) =>
      request<void>(`/api/v1/threads/${threadId}/messages`, {
        method: 'DELETE',
      }),
  },

  // Vectors & Precedent Semantic RAG
  vectors: {
    status: () => request<VectorStatus>('/api/v1/vectors/status'),
    search: (query: VectorSearchQuery) =>
      request<VectorSearchResponse>('/api/v1/vectors/search', {
        method: 'POST',
        body: JSON.stringify(query),
      }),
    ingestChunk: (chunk: DocumentChunkCreate) =>
      request<{ status: string; weaviate_id: string; message: string }>('/api/v1/vectors/chunks', {
        method: 'POST',
        body: JSON.stringify(chunk),
      }),
  },

  // Legal RAG & LLM Advisory Opinion
  rag: {
    query: (data: LegalRAGRequest) =>
      request<LegalRAGResponse>("/api/v1/rag/query", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    models: () =>
      request<LegalRAGModelInfo>("/api/v1/rag/models"),
  },
};