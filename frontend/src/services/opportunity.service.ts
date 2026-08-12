import api from './api';

export interface workspace {
  id: string;
  name: string;
  slug: string;
}

export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  type: string;
  level: string;
  state: string | null;
  district: string | null;
  status: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  workspace: workspace;
  aiSummary?: string;
  applicationUrl?: string;
  benefits?: any;
  eligibility?: any;
  requiredDocuments?: any;
  lastDate?: string;
  startDate?: string;
  metadata?: any;
}

export const opportunityService = {
  // Get all opportunities
  async getAll(): Promise<Opportunity[]> {
    // âœ… Use /api prefix
    const response = await api.get('/api/opportunities');
    return response.data;
  },

  // Get opportunity by slug
  async getBySlug(slug: string): Promise<Opportunity> {
    // âœ… Use /api prefix
    const response = await api.get(`/api/opportunities/slug/${slug}`);
    return response.data;
  },

  // Get opportunity by ID
  async getById(id: string): Promise<Opportunity> {
    // âœ… Use /api prefix
    const response = await api.get(`/api/opportunities/${id}`);
    return response.data;
  },

  // Search opportunities with filters
  async search(params: {
    search?: string;
    category?: string;
    type?: string;
    state?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: Opportunity[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    // âœ… Use /api prefix
    const response = await api.get(`/api/opportunities/search?${queryParams.toString()}`);
    return response.data;
  },

  // Get AI recommendations
  async getRecommendations(): Promise<Opportunity[]> {
    // âœ… Use /api prefix
    const response = await api.get('/api/opportunities/recommendations');
    return response.data;
  },

  // Create opportunity
  async create(data: any): Promise<Opportunity> {
    // âœ… Use /api prefix
    const response = await api.post('/api/opportunities', data);
    return response.data;
  },

  // Update opportunity
  async update(id: string, data: any): Promise<Opportunity> {
    // âœ… Use /api prefix
    const response = await api.patch(`/api/opportunities/${id}`, data);
    return response.data;
  },

  // Delete opportunity
  async delete(id: string): Promise<void> {
    // âœ… Use /api prefix
    await api.delete(`/api/opportunities/${id}`);
  },

  // Get AI summary
  async getSummary(id: string): Promise<{ summary: string }> {
    // âœ… Use /api prefix
    const response = await api.get(`/api/opportunities/${id}/summary`);
    return response.data;
  },

  // Get AI score
  async getScore(id: string): Promise<{ score: number }> {
    // âœ… Use /api prefix
    const response = await api.get(`/api/opportunities/${id}/score`);
    return response.data;
  },

  // Get AI keywords
  async getKeywords(id: string): Promise<{ keywords: string[] }> {
    // âœ… Use /api prefix
    const response = await api.get(`/api/opportunities/${id}/keywords`);
    return response.data;
  },
};

export default opportunityService;



