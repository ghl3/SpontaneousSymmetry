import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostByUrl, getLatestPosts } from '@/lib/posts';
import PostContent from '@/components/PostContent';
import BlogSidebar from '@/components/BlogSidebar';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostByUrl(params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `Spontaneous Symmetry: ${post.title}`,
    description: post.content.substring(0, 160),
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

  return (
    <div className="max-w-2xl mx-auto relative">
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
