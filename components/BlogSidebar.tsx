import Link from 'next/link';
import { getArchive, formatMonthYear, type ArchiveMonth } from '@/lib/posts';

interface BlogSidebarProps {
  maxMonths?: number;
}

export default function BlogSidebar({ maxMonths = 5 }: BlogSidebarProps) {
  const archive = getArchive().slice(0, maxMonths);

  return (
    <aside className="sidebar w-full lg:w-48 flex-shrink-0">
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Posts:</h2>
        <ul className="space-y-1">
          {archive.map((month) => (
            <li key={`${month.year}-${month.month}`}>
              <Link 
                href={`/blog/archive/${month.year}/${month.month}`}
                className="font-semibold"
              >
                {formatMonthYear(month.year, month.month)}
              </Link>
              <ul className="ml-4 space-y-1">
                {month.posts.map((post) => (
                  <li key={post.url}>
                    <Link href={`/blog/${post.url}`}>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="mt-4">
            <Link href="/blog/archive" className="font-semibold text-lg">
              All Posts
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

