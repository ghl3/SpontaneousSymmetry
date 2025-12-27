import type { Metadata } from 'next';
import { getLatestPosts, getPostByUrl } from '@/lib/posts';
import PostContent from '@/components/PostContent';
import BlogSidebar from '@/components/BlogSidebar';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on programming, data science, machine learning, statistics, and physics. Technical deep-dives and explorations from a physicist turned ML engineer.',
  openGraph: {
    title: 'Blog - Programming, Data Science & Physics',
    description: 'Technical articles on programming, data science, machine learning, and physics.',
  },
};

export default async function BlogPage(): Promise<JSX.Element> {
  const latestPosts = getLatestPosts(1);
  
  if (latestPosts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-text-secondary">No posts found.</p>
      </div>
    );
  }

  const latestPost = await getPostByUrl(latestPosts[0].url);
  
  if (!latestPost) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-text-secondary">Post not found.</p>
      </div>
    );
  }

  // Prepare sidebar data (server-side)
  const recentPosts = getLatestPosts(7)
    .filter(post => post.url !== latestPost.url)
    .slice(0, 6)
    .map(post => ({
      url: post.url,
      title: post.title,
      dateStr: post.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Main Content - centered like other pages */}
      <main>
        <PostContent post={latestPost} contentHtml={latestPost.contentHtml} />
      </main>

      {/* Collapsible Sidebar - positioned to the right, outside the centered content */}
      <div className="hidden lg:block absolute left-full top-0 ml-8">
        <BlogSidebar recentPosts={recentPosts} />
      </div>
    </div>
  );
}
