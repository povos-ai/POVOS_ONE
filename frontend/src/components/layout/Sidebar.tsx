"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950 text-white">

      {/* Logo */}
      <div className="border-b border-zinc-800 px-8 py-8">
        <h1 className="text-3xl font-bold tracking-wide">
          POVOS ONE
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Enterprise Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <div className="space-y-2">

          {navigation
            .filter((item) => item.enabled)
            .map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon size={20} />

                  <div className="flex flex-col">
                    <span className="font-medium">
                      {item.title}
                    </span>

                    <span className="text-xs opacity-70">
                      {item.module}
                    </span>
                  </div>
                </Link>
              );
            })}

        </div>

      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800 p-6">

        <div className="rounded-xl bg-zinc-900 p-4">

          <div className="font-semibold">
            POVOS ONE
          </div>

          <div className="mt-1 text-sm text-zinc-400">
            Version 1.0 Enterprise
          </div>

        </div>

      </div>

    </aside>
  );
}