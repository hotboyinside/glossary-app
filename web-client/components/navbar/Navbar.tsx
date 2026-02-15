'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import Container from '../container/Container';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/keywords', label: 'Глоссарий' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-black/10 dark:border-white/10">
      <Container className="h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-semibold text-lg">
          ITMO 2026
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-medium transition',
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Открыть меню"
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-5 bg-black dark:bg-white" />
            <span className="block h-0.5 w-5 bg-black dark:bg-white" />
            <span className="block h-0.5 w-5 bg-black dark:bg-white" />
          </div>
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-black/10 dark:border-white/10 bg-white dark:bg-gray-900">
          <Container className="py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  'block rounded-lg px-3 py-2 text-sm font-medium transition',
                  pathname === link.href
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10'
                    : 'text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10',
                )}
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
