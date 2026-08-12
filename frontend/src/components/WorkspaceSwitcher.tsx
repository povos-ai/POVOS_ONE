"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function WorkspaceSwitcher() {
  const [workspaces] = useState([
    { id: "1", name: "POVOS Platform", role: "APPLICANT" },
  ]);

  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass hover:bg-white/30 dark:hover:bg-slate-700/30 transition text-sm font-medium dark:text-white">
        {workspaces[0]?.name || "Select Workspace"}
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}

