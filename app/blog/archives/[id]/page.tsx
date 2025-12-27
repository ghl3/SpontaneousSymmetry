import { redirect, notFound } from 'next/navigation';
import { getPostByLegacyId, getAllPostsMeta } from '@/lib/posts';

interface Props {
  params: { id: string };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const posts = getAllPostsMeta();
  return posts
    .filter((post) => post.id !== null)
    .map((post) => ({
      id: post.id!.toString(),
    }));
}

export default function LegacyArchiveRedirect({ params }: Props): never {
  const id = parseInt(params.id);
  
  if (isNaN(id)) {
    notFound();
  }

  const post = getPostByLegacyId(id);
  
  if (!post) {
    notFound();
  }

  redirect(`/blog/${post.url}`);
}
