import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArchive, getArchiveByMonth, formatMonthYear } from '@/lib/posts';

interface Props {
  params: { year: string; month: string };
}

export async function generateStaticParams() {
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

export default function ArchiveMonthPage({ params }: Props) {
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
    <div className="content mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Archive: {formatMonthYear(year, month)}
      </h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.url}>
            <Link href={`/blog/${post.url}`} className="text-lg">
              {post.title}
            </Link>
            <span className="text-gray-500 text-sm ml-2">
              ({post.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href="/blog/archive" className="text-accent hover:underline">
          ← Back to full archive
        </Link>
      </div>
    </div>
  );
}


