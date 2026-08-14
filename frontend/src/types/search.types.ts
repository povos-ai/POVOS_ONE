/**
 * Search module type definitions
 * Matches the backend API contract exactly
 */

export interface SearchParams {
  q?: string;
  category?: string;
  type?: string;
  status?: string;
  state?: string;
  district?: string;
  workspaceId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'lastDate' | 'startDate';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResponse {
  items: SearchResult[];
  total: number;
}

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  type: string | null;
  level: string | null;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  state: string | null;
  district: string | null;
  lastDate: string | null;
  startDate: string | null;
  published: boolean;
  aiSummary: string | null;
  workspaceId: string | null;
  workspace: {
    id: string;
    name: string;
  } | null;
}
