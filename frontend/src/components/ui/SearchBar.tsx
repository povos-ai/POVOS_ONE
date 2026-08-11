"use client";

import { Search, Sparkles } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 text-gray-400" size={15} />
      <input
        type="text"
        placeholder="Search opportunities, schemes, grants & tenders… (⌘K)"
        className="w-full pl-9 pr-28 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      <button className="absolute right-1.5 px-3 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1 shadow-sm">
        <Sparkles size={12} />
        Ask AI
      </button>
    </div>
  );
}


