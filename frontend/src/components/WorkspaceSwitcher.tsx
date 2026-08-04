'use client';

import { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ChevronDown, Check, Building2 } from 'lucide-react';

export default function WorkspaceSwitcher() {
  const { workspaces, activeWorkspace, setActiveWorkspace, loading } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-gray-500">
        <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        <span className="text-sm">Loading...</span>
      </div>
    );
  }

  if (!activeWorkspace || workspaces.length === 0) {
    return null;
  }

  const handleSelect = async (workspaceId: string) => {
    await setActiveWorkspace(workspaceId);
    setIsOpen(false);
    // Refresh page to update context
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Building2 size={18} className="text-blue-600" />
        <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
          {activeWorkspace.name}
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
              Switch Workspace
            </div>
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => handleSelect(workspace.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  workspace.id === activeWorkspace.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-gray-700">{workspace.name}</span>
                  <span className="text-xs text-gray-400 ml-1">({workspace.role})</span>
                </div>
                {workspace.id === activeWorkspace.id && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}