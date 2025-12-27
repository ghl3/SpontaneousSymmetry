import Link from 'next/link';
import type { Post, PostMeta } from '@/lib/posts';

interface PostContentProps {
  post: Post | PostMeta;
  contentHtml?: string;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostContent({ post, contentHtml }: PostContentProps): JSX.Element {
  return (
    <article className="max-w-2xl mx-auto">
      {/* Title */}
      <header className="text-center mb-6">
        <Link 
          href={`/blog/${post.url}`}
          className="group"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-150 tracking-tight">
            {post.title}
          </h1>
        </Link>
        
        {/* Date */}
        <time className="block text-text-secondary text-sm mt-1.5">
          {formatDate(post.date)}
        </time>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 justify-center mt-3 flex-wrap">
            {post.categories.map((category) => (
              <span 
                key={category} 
                className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface text-text-secondary border border-border"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-6" />

      {/* Content */}
      {contentHtml && (
        <div 
          className="post-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
    </article>
  );
}
