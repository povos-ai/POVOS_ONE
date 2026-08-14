"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useWorkspace } from "@/context/WorkspaceContext";

export function WorkspaceSwitcher() {
  const { workspaces, activeWorkspace, loading, setActiveWorkspace } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!activeWorkspace && workspaces.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
        No workspace
      </div>
    );
  }

  const handleSelect = async (workspaceId: string) => {
    await setActiveWorkspace(workspaceId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass hover:bg-white/30 dark:hover:bg-slate-700/30 transition text-sm font-medium dark:text-white"
      >
        {activeWorkspace?.name || workspaces[0]?.name || "Select Workspace"}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => handleSelect(workspace.id)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                activeWorkspace?.id === workspace.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {workspace.name}
              {activeWorkspace?.id === workspace.id && (
                <span className="ml-2 text-xs text-blue-600 dark:text-blue-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
