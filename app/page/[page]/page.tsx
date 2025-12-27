import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/pages';
import fs from 'fs';
import path from 'path';

interface Props {
  params: { page: string };
}

export async function generateStaticParams(): Promise<{ page: string }[]> {
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

export default async function GenericPage({ params }: Props): Promise<JSX.Element> {
  const page = await getPage(params.page);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {page.title}
        </h1>
      </div>

      {/* Content */}
      <article
        className="post-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </div>
  );
}
