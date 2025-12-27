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

export default function PostContent({ post, contentHtml }: PostContentProps) {
  return (
    <article className="post">
      <Link href={`/blog/${post.url}`}>
        <h2 className="text-2xl font-semibold text-center mb-2 hover:text-accent">
          {post.title}
        </h2>
      </Link>
      
      <div className="text-center text-gray-600 italic mb-4">
        {formatDate(post.date)}
      </div>

      {post.categories && post.categories.length > 0 && (
        <ul className="flex gap-2 justify-center mb-6">
          {post.categories.map((category) => (
            <li 
              key={category} 
              className="text-sm bg-gray-100 px-2 py-1 rounded"
            >
              {category}
            </li>
          ))}
        </ul>
      )}

      {contentHtml && (
        <div 
          className="post-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}
    </article>
  );
}

