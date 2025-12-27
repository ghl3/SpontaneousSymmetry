import type { Metadata } from 'next';
import Link from 'next/link';
import { getArchive, formatMonthYear } from '@/lib/posts';
import PageHero from '@/components/PageHero';
import SectionLabel from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Blog Archive',
};

export default function ArchivePage(): JSX.Element {
  const archive = getArchive();

  return (
    <div className="max-w-2xl mx-auto">
      <PageHero title="Blog Archive" subtitle="All posts organized by date" />

      {/* Archive List */}
      <div className="space-y-8">
        {archive.map((month) => (
          <section key={`${month.year}-${month.month}`}>
            <SectionLabel>
              <Link 
                href={`/blog/archive/${month.year}/${month.month}`}
                className="hover:text-text-primary transition-colors duration-150"
              >
                {formatMonthYear(month.year, month.month)}
              </Link>
            </SectionLabel>
            <ul className="space-y-2">
              {month.posts.map((post) => (
                <li key={post.url} className="flex items-baseline gap-3">
                  <span className="text-text-muted text-sm tabular-nums shrink-0">
                    {post.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <Link 
                    href={`/blog/${post.url}`}
                    className="text-text-primary hover:text-accent transition-colors duration-150"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
