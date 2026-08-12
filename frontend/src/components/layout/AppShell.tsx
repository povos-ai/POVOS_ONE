'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Opportunities', href: '/opportunities' },
  { name: 'Applications', href: '/applications' },
  { name: 'My Applications', href: '/my-applications' },
  { name: 'Admin', href: '/admin/applications' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={clsx(
          'bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-200 px-4">
          <img
            src="/logo.png"
            alt="POVOS ONE"
            className="h-14 w-auto object-contain"
          />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition',
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {item.name}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className={clsx(
              'flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition mt-2',
              'text-red-600 hover:bg-red-50 hover:text-red-800'
            )}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            â˜°
          </button>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search opportunities, schemes, grants & tenders..."
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>

        <div className="text-center text-[9px] font-medium text-gray-400 border-t border-gray-200 py-1 flex-shrink-0">
          One Platform. Unlimited Opportunities. — POVOS ONE
        </div>
      </div>
    </div>
  );
}





