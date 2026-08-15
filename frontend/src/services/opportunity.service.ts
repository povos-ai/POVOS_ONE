import api from './api';

export interface Opportunity {
  slug: string;
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  status: string;
  state: string;
  district: string;
  lastDate: string;
  startDate: string;
  published: boolean;
  providerId: string;
  workspaceId: string;
}

export interface AIIntelligence {
  summary: string;
  eligibility: string[];
  benefits: string[];
  requiredDocuments: string[];
  applicationProcess: string;
  targetUsers: string[];
  tags: string[];
}

export async function getOpportunities(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return api.get(`/opportunities${query ? `?${query}` : ""}`);
}

export async function getOpportunity(id: string) {
  return api.get(`/opportunities/${id}`);
}

export async function getOpportunityBySlug(slug: string) {
  return api.get(`/opportunities/slug/${slug}`);
}

export async function createOpportunity(data: Partial<Opportunity>) {
  return api.post("/opportunities", data);
}

export async function updateOpportunity(id: string, data: Partial<Opportunity>) {
  return api.patch(`/opportunities/${id}`, data);
}

export async function deleteOpportunity(id: string) {
  return api.delete(`/opportunities/${id}`);
}

export async function generateAIIntelligence(opportunityData: any): Promise<AIIntelligence> {
  return api.post("/ai/intelligence", { opportunity: opportunityData });
}
