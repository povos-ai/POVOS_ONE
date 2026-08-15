"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/opportunities", label: "Opportunities", icon: "💼" },
    { href: "/profile", label: "Profile", icon: "👤" },
    { href: "/workspaces", label: "Workspaces", icon: "🏢" },
    { href: "/search", label: "Search", icon: "🔍" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0">
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              pathname === link.href
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

