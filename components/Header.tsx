'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="w-full">
      <div id="header" className="mx-auto text-center py-6">
        <div className="text-center">
          <Link 
            href="/about" 
            className="text-xl font-bold no-underline hover:text-accent"
          >
            Spontaneous Symmetry
          </Link>
        </div>

        <nav id="navbar" className="mt-2">
          <Link 
            href="/" 
            className={isActive('/') && pathname === '/' ? 'active' : ''}
          >
            HOME
          </Link>
          {' | '}
          <Link 
            href="/work" 
            className={isActive('/work') ? 'active' : ''}
          >
            WORK
          </Link>
          {' | '}
          <Link 
            href="/blog" 
            className={isActive('/blog') ? 'active' : ''}
          >
            BLOG
          </Link>
        </nav>
      </div>
    </div>
  );
}

