import Link from 'next/link';
import { STATS_PAGES } from '@/lib/pages';

interface StatsNavProps {
  currentSlug?: string;
}

export default function StatsNav({ currentSlug }: StatsNavProps) {
  return (
    <nav className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Statistics Guide</h3>
      <ul className="space-y-2">
        {STATS_PAGES.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/stats/${page.slug}`}
              className={currentSlug === page.slug ? 'font-bold text-accent' : ''}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


