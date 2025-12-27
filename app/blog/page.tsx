import type { Metadata } from 'next';
import { getLatestPosts, getPostByUrl } from '@/lib/posts';
import BlogSidebar from '@/components/BlogSidebar';
import PostContent from '@/components/PostContent';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Blog',
};

export default async function BlogPage() {
  const latestPosts = getLatestPosts(1);
  
  if (latestPosts.length === 0) {
    return (
      <div className="content mx-auto max-w-3xl">
        <p>No posts found.</p>
      </div>
    );
  }

  const latestPost = await getPostByUrl(latestPosts[0].url);
  
  if (!latestPost) {
    return (
      <div className="content mx-auto max-w-3xl">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="sidebar w-full lg:w-48 flex-shrink-0 order-2 lg:order-1">
        <BlogSidebar />
      </aside>
      
      <main className="content flex-1 max-w-3xl order-1 lg:order-2">
        <PostContent post={latestPost} contentHtml={latestPost.contentHtml} />
      </main>

      <div className="hidden lg:block w-48 flex-shrink-0 order-3">
        {/* Right sidebar placeholder for layout balance */}
      </div>
    </div>
  );
}


