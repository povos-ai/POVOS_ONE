"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/opportunities", label: "Opportunities", icon: Briefcase },
    { href: "/my-applications", label: "Applications", icon: Users },
    { href: "/admin/applications", label: "Admin", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full overflow-hidden transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="border-4 border-red-500 py-5 px-3 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        {!collapsed ? (
          <div className="border-4 border-red-500 flex items-center justify-center w-full">
            <img
              src="/logo.png"
              alt="POVOS ONE Logo"
              className="border-4 border-red-500 h-16 w-auto max-w-[160px] object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='64' viewBox='0 0 160 64'%3E%3Crect width='160' height='64' rx='8' fill='%231557C0'/%3E%3Ctext x='16' y='40' font-family='Arial' font-size='26' fill='white' font-weight='bold'%3EPOVOS ONE%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        ) : (
          <div className="border-4 border-red-500 w-full flex justify-center">
            <img
              src="/logo.png"
              alt="POVOS ONE Logo"
              className="border-4 border-red-500 h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='6' fill='%231557C0'/%3E%3Ctext x='8' y='28' font-family='Arial' font-size='18' fill='white' font-weight='bold'%3EP%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        )}
        <button
          onClick={toggle}
          className="border-4 border-red-500 p-1 rounded hover:bg-gray-100 transition flex-shrink-0 ml-2"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="border-4 border-red-500 flex-1 p-2 space-y-0.5 overflow-y-auto min-h-0">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition focus:outline-none ${
                active
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.icon size={18} className="border-4 border-red-500 flex-shrink-0" />
              {!collapsed && <span className="border-4 border-red-500 text-sm truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-4 border-red-500 p-2 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} className="border-4 border-red-500 flex-shrink-0" />
          {!collapsed && <span className="border-4 border-red-500 text-sm font-medium truncate">Logout</span>}
        </button>
      </div>
    </aside>
  );
}





