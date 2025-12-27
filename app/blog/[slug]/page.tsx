import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostByUrl } from '@/lib/posts';
import BlogSidebar from '@/components/BlogSidebar';
import PostContent from '@/components/PostContent';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
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

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostByUrl(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="sidebar w-full lg:w-48 flex-shrink-0 order-2 lg:order-1">
        <BlogSidebar />
      </aside>
      
      <main className="content flex-1 max-w-3xl order-1 lg:order-2">
        <PostContent post={post} contentHtml={post.contentHtml} />
      </main>

      <div className="hidden lg:block w-48 flex-shrink-0 order-3">
        {/* Right sidebar placeholder for layout balance */}
      </div>
    </div>
  );
}


