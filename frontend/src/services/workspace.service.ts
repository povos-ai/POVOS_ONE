import api from './api';

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  role: string;
  isActive: boolean;
}

export const workspaceService = {
  async getUserWorkspaces(): Promise<Workspace[]> {
    const response = await api.get('/workspaces');
    return response.data;
  },

  async switchWorkspace(workspaceId: string): Promise<void> {
    localStorage.setItem('activeWorkspaceId', workspaceId);
  },

  getActiveWorkspace(): string | null {
    return localStorage.getItem('activeWorkspaceId');
  },

  clearActiveWorkspace(): void {
    localStorage.removeItem('activeWorkspaceId');
  },
};



