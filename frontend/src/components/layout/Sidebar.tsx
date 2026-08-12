"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Opportunities", href: "/opportunities" },
  { name: "Applications", href: "/applications" },
  { name: "Admin", href: "/admin" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white shadow-sm p-4 h-full flex flex-col">
      <div className="mb-6 text-xl font-bold text-blue-600">POVOS ONE</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md transition ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t pt-4">
        <Link href="/logout" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
          Logout
        </Link>
      </div>
    </aside>
  );
}
