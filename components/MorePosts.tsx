import Link from 'next/link';
import { getLatestPosts } from '@/lib/posts';

interface MorePostsProps {
  maxPosts?: number;
  currentPostUrl?: string;
}

export default function MorePosts({ maxPosts = 5, currentPostUrl }: MorePostsProps): JSX.Element {
  const recentPosts = getLatestPosts(maxPosts + 1)
    .filter(post => post.url !== currentPostUrl)
    .slice(0, maxPosts);

  if (recentPosts.length === 0) {
    return <></>;
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
        More Posts
      </h2>
      
      <ul className="space-y-2">
        {recentPosts.map((post) => (
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
      
      <div className="mt-4">
        <Link 
          href="/blog/archive" 
          className="text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}

