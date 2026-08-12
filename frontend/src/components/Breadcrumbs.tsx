"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-slate-500 dark:text-slate-400">
      <Link href="/dashboard" className="hover:text-blue-500">Home</Link>
      {paths.map((path, i) => (
        <span key={i}>
          {' / '}
          <Link href={`/${paths.slice(0, i + 1).join('/')}`} className="capitalize hover:text-blue-500">
            {path}
          </Link>
        </span>
      ))}
    </nav>
  );
}

