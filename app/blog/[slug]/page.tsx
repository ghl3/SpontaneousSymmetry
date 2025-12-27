import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostByUrl, getLatestPosts } from '@/lib/posts';
import PostContent from '@/components/PostContent';
import BlogSidebar from '@/components/BlogSidebar';
import { ArticleSchema } from '@/components/JsonLd';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Extract a clean description from markdown content
 * Strips markdown syntax and limits to ~155 chars for SEO
 */
function extractDescription(content: string): string {
  // Remove markdown headers
  let cleaned = content.replace(/^#{1,6}\s+.+$/gm, '');
  // Remove markdown links but keep text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove markdown bold/italic
  cleaned = cleaned.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1');
  // Remove code blocks
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  cleaned = cleaned.replace(/`[^`]+`/g, '');
  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  // Collapse whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  // Limit to 155 chars, break at word boundary
  if (cleaned.length > 155) {
    cleaned = cleaned.substring(0, 155).replace(/\s+\S*$/, '') + '...';
  }
  return cleaned;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostByUrl(params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const description = extractDescription(post.content);

  return {
    title: post.title,
    description,
    authors: [{ name: post.author || 'George Lewis' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date.toISOString(),
      authors: [post.author || 'George Lewis'],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: Props): Promise<JSX.Element> {
  const post = await getPostByUrl(params.slug);

  if (!post) {
    notFound();
  }

  // Prepare sidebar data (server-side)
  const recentPosts = getLatestPosts(7)
    .filter(p => p.url !== post.url)
    .slice(0, 6)
    .map(p => ({
      url: p.url,
      title: p.title,
      dateStr: p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

  const description = extractDescription(post.content);

  return (
    <div className="max-w-2xl mx-auto relative">
      <ArticleSchema
        title={post.title}
        description={description}
        url={`https://spontaneoussymmetry.com/blog/${post.url}`}
        datePublished={post.date.toISOString()}
        author={post.author || 'George Lewis'}
      />
      {/* Main Content - centered like other pages */}
      <main>
        <PostContent post={post} contentHtml={post.contentHtml} />
      </main>

      {/* Collapsible Sidebar - positioned to the right, outside the centered content */}
      <div className="hidden lg:block absolute left-full top-0 ml-8">
        <BlogSidebar recentPosts={recentPosts} />
      </div>
    </div>
  );
}
