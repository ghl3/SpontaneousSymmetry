import Link from 'next/link';
import SectionLabel from '@/components/SectionLabel';

interface RecentPost {
  url: string;
  title: string;
  dateStr: string;
}

interface BlogSidebarProps {
  recentPosts: RecentPost[];
}

export default function BlogSidebar({ recentPosts }: BlogSidebarProps): JSX.Element {
  return (
    <aside className="w-44 text-sm">
      <div className="sticky top-24">
        <SectionLabel>Recent</SectionLabel>
        
        <ul className="space-y-2">
          {recentPosts.map((post) => (
            <li key={post.url}>
              <Link 
                href={`/blog/${post.url}`}
                className="block group"
              >
                <span className="text-text-muted text-xs tabular-nums">
                  {post.dateStr}
                </span>
                <span className="block text-text-secondary group-hover:text-accent transition-colors duration-150 leading-snug text-sm">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        
        <Link 
          href="/blog/archive" 
          className="block mt-4 text-xs text-text-muted hover:text-text-primary transition-colors duration-150"
        >
          All posts →
        </Link>
      </div>
    </aside>
  );
}
