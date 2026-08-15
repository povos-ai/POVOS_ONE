import api from './api';

export interface Submission {
  id: string;
  status: string;
  applicationData: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  userId: string;
  opportunityId: string;
  opportunity?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    type: string;
    status: string;
    state: string;
    district: string;
    lastDate: string;
    startDate: string;
    published: boolean;
  };
}

export interface CreateSubmissionData {
  opportunityId: string;
  applicationData?: Record<string, any>;
}

export const applicationService = {
  /**
   * Create a new application/submission (DRAFT)
   */
  async create(data: CreateSubmissionData): Promise<Submission> {
    const response = await api.post('/submissions', {
      opportunityId: data.opportunityId,
      applicationData: data.applicationData ? JSON.stringify(data.applicationData) : undefined,
    });
    return response.data;
  },

  /**
   * Get all applications for the current user
   */
  async getUserApplications(): Promise<Submission[]> {
    const response = await api.get('/submissions');
    return response.data;
  },

  /**
   * Get a specific application by ID
   */
  async getApplication(id: string): Promise<Submission> {
    const response = await api.get(`/submissions/${id}`);
    return response.data;
  },

  /**
   * Update a draft application
   */
  async updateApplication(id: string, data: Record<string, any>): Promise<Submission> {
    const response = await api.put(`/submissions/${id}`, {
      applicationData: JSON.stringify(data),
    });
    return response.data;
  },

  /**
   * Submit a draft application (DRAFT → SUBMITTED)
   */
  async submitApplication(id: string): Promise<Submission> {
    const response = await api.post(`/submissions/${id}/submit`);
    return response.data;
  },

  /**
   * Check if the user has already applied to an opportunity
   */
  async hasApplied(opportunityId: string): Promise<boolean> {
    try {
      const submissions = await this.getUserApplications();
      return submissions.some(s => s.opportunityId === opportunityId);
    } catch {
      return false;
    }
  },

  /**
   * Get the user's application for a specific opportunity
   */
  async getApplicationForOpportunity(opportunityId: string): Promise<Submission | null> {
    try {
      const submissions = await this.getUserApplications();
      return submissions.find(s => s.opportunityId === opportunityId) || null;
    } catch {
      return null;
    }
  }
};
