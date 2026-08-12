"use client";

import { Bell, Search, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-1.5 flex items-center justify-between h-12">
      <div className="flex-1 max-w-2xl mx-auto">
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
      </div>
      <div className="flex items-center gap-3 flex-shrink-0 ml-3">
        <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition">
          <Bell size={17} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 border-l border-gray-200 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold leading-tight text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}


