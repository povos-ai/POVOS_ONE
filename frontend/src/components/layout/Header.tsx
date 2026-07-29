"use client";

import { Search, Bot } from "lucide-react";
import NotificationBell from "@/components/dashboard/NotificationBell";
import UserMenu from "@/components/dashboard/UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Search */}
      <div className="flex-1 max-w-2xl">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search opportunities, schemes, startups..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
          />

        </div>

      </div>

      {/* Right Side */}
      <div className="ml-8 flex items-center gap-4">

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 transition hover:bg-slate-100">

          <Bot size={18} />

          <span className="font-medium">
            AI
          </span>

        </button>

        <NotificationBell />

        <UserMenu />

      </div>

    </header>
  );
}