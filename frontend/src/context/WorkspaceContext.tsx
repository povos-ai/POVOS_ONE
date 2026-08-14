'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { workspaceService, Workspace } from '@/services/workspace.service';

interface WorkspaceContextType {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
  setActiveWorkspace: (workspaceId: string) => Promise<void>;
  fetchWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await workspaceService.getUserWorkspaces();
      setWorkspaces(data);

      // Restore active workspace from localStorage if exists
      const savedWorkspaceId = workspaceService.getActiveWorkspace();
      if (savedWorkspaceId) {
        const found = data.find(w => w.id === savedWorkspaceId);
        if (found) {
          setActiveWorkspaceState(found);
          return;
        }
      }

      // Select first workspace if available
      if (data.length > 0) {
        setActiveWorkspaceState(data[0]);
        await workspaceService.switchWorkspace(data[0].id);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load workspaces';
      setError(errorMessage);
      console.error('Workspace fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const setActiveWorkspace = async (workspaceId: string) => {
    const found = workspaces.find(w => w.id === workspaceId);
    if (found) {
      setActiveWorkspaceState(found);
      await workspaceService.switchWorkspace(workspaceId);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const value = {
    workspaces,
    activeWorkspace,
    loading,
    error,
    setActiveWorkspace,
    fetchWorkspaces,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};
