"use client";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm p-4 h-screen">
      <nav>
        <ul className="space-y-2">
          <li><a href="/dashboard" className="text-blue-600">Dashboard</a></li>
          <li><a href="/opportunities">Opportunities</a></li>
          <li><a href="/applications">Applications</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>
    </aside>
  );
}
