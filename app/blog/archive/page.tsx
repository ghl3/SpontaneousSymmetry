import type { Metadata } from 'next';
import Link from 'next/link';
import { getArchive, formatMonthYear } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Blog Archive',
};

export default function ArchivePage() {
  const archive = getArchive();

  return (
    <div className="content mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold text-center mb-8">Blog Archive</h1>

      <div className="space-y-8">
        {archive.map((month) => (
          <div key={`${month.year}-${month.month}`}>
            <h2 className="text-xl font-semibold mb-4">
              <Link href={`/blog/archive/${month.year}/${month.month}`}>
                {formatMonthYear(month.year, month.month)}
              </Link>
            </h2>
            <ul className="space-y-2 ml-4">
              {month.posts.map((post) => (
                <li key={post.url}>
                  <Link href={`/blog/${post.url}`}>
                    {post.title}
                  </Link>
                  <span className="text-gray-500 text-sm ml-2">
                    ({post.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

