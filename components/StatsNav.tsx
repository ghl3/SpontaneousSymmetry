import Link from 'next/link';
import { STATS_PAGES } from '@/lib/pages';
import SectionLabel from '@/components/SectionLabel';

interface StatsNavProps {
  currentSlug?: string;
}

export default function StatsNav({ currentSlug }: StatsNavProps): JSX.Element {
  return (
    <nav>
      <SectionLabel>Statistics Guide</SectionLabel>
      <ul className="space-y-1">
        {STATS_PAGES.map((page) => {
          const isActive = currentSlug === page.slug;
          return (
            <li key={page.slug}>
              <Link
                href={`/stats/${page.slug}`}
                className={`
                  block py-1.5 text-sm transition-colors duration-150
                  ${isActive 
                    ? 'text-accent font-medium' 
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
