import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStatsPage, getStatsSlugs, STATS_PAGES } from '@/lib/pages';
import StatsNav from '@/components/StatsNav';

interface Props {
  params: { page: string };
}

export async function generateStaticParams() {
  const slugs = getStatsSlugs();
  return slugs.map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = STATS_PAGES.find((p) => p.slug === params.page);
  const title = pageData?.title || params.page;

  return {
    title: `Spontaneous Symmetry: Statistics - ${title}`,
  };
}

export default async function StatsPage({ params }: Props) {
  const page = await getStatsPage(params.page);

  if (!page) {
    notFound();
  }

  // Find current index for prev/next navigation
  const currentIndex = STATS_PAGES.findIndex((p) => p.slug === params.page);
  const prevPage = currentIndex > 0 ? STATS_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < STATS_PAGES.length - 1 ? STATS_PAGES[currentIndex + 1] : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="sidebar w-full lg:w-48 flex-shrink-0 order-2 lg:order-1">
        <StatsNav currentSlug={params.page} />
      </aside>

      <main className="content flex-1 max-w-3xl order-1 lg:order-2">
        <div
          className="post-content prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.contentHtml }}
        />

        {/* Prev/Next Navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t">
          {prevPage ? (
            <a href={`/stats/${prevPage.slug}`} className="text-accent hover:underline">
              ← {prevPage.title}
            </a>
          ) : (
            <span />
          )}
          {nextPage ? (
            <a href={`/stats/${nextPage.slug}`} className="text-accent hover:underline">
              {nextPage.title} →
            </a>
          ) : (
            <span />
          )}
        </div>
      </main>

      <div className="hidden lg:block w-48 flex-shrink-0 order-3">
        {/* Right sidebar placeholder for layout balance */}
      </div>
    </div>
  );
}


