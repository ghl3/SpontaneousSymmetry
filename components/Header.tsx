'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/stats', label: 'Stats' },
  { href: '/atlas', label: 'Research' },
];

export default function Header(): JSX.Element {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path) ?? false;
  };

  return (
    <header className="w-full border-b border-border-light bg-surface-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Centered Layout */}
        <div className="text-center">
          {/* Logo */}
          <Link 
            href="/about" 
            className="inline-block text-xl font-semibold tracking-tight text-text-primary hover:text-accent transition-colors duration-150"
          >
            Spontaneous Symmetry
          </Link>

          {/* Navigation */}
          <nav className="flex items-center justify-center gap-6 mt-3">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-sm tracking-wide uppercase transition-colors duration-150
                    ${active 
                      ? 'text-accent font-medium' 
                      : 'text-text-muted hover:text-text-primary'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
