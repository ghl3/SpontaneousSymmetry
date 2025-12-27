import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArchive, getArchiveByMonth, formatMonthYear } from '@/lib/posts';
import PageHero from '@/components/PageHero';

interface Props {
  params: { year: string; month: string };
}

export async function generateStaticParams(): Promise<{ year: string; month: string }[]> {
  const archive = getArchive();
  return archive.map((month) => ({
    year: month.year.toString(),
    month: month.month.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = parseInt(params.year);
  const month = parseInt(params.month);

  return {
    title: `Spontaneous Symmetry: Archive - ${formatMonthYear(year, month)}`,
  };
}

export default function ArchiveMonthPage({ params }: Props): JSX.Element {
  const year = parseInt(params.year);
  const month = parseInt(params.month);
  
  if (isNaN(year) || isNaN(month)) {
    notFound();
  }

  const posts = getArchiveByMonth(year, month);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHero 
        title={formatMonthYear(year, month)} 
        subtitle={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`} 
      />

      {/* Posts List */}
      <ul className="space-y-2">
        {posts.map((post) => (
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

      {/* Back Link */}
      <div className="mt-10">
        <Link 
          href="/blog/archive" 
          className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors duration-150"
        >
          <span className="mr-2">←</span>
          Back to full archive
        </Link>
      </div>
    </div>
  );
}
