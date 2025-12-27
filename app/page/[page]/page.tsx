import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/pages';
import fs from 'fs';
import path from 'path';

interface Props {
  params: { page: string };
}

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), 'pages');
  const files = fs.readdirSync(pagesDir);
  
  return files
    .filter((file) => file.endsWith('.markdown') && !fs.statSync(path.join(pagesDir, file)).isDirectory())
    .map((file) => ({
      page: file.replace('.markdown', ''),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.page);
  
  return {
    title: `Spontaneous Symmetry: ${page?.title || params.page}`,
  };
}

export default async function GenericPage({ params }: Props) {
  const page = await getPage(params.page);

  if (!page) {
    notFound();
  }

  return (
    <div className="content mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold text-center mb-8">{page.title}</h1>
      <div
        className="post-content prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </div>
  );
}


