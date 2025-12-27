import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStatsPage, getStatsSlugs, STATS_PAGES } from '@/lib/pages';
import StatsNav from '@/components/StatsNav';

interface Props {
  params: { page: string };
}

export async function generateStaticParams(): Promise<{ page: string }[]> {
  const slugs = getStatsSlugs();
  return slugs.map((page) => ({ page }));
}

// Descriptions for each stats page
const STATS_DESCRIPTIONS: Record<string, string> = {
  'introduction': 'An introduction to statistics and statistical inference. Learn the fundamentals of data analysis and probabilistic thinking.',
  'probability': 'Understanding probability theory, random variables, and the mathematical foundations of statistical inference.',
  'distributions': 'Common probability distributions including normal, binomial, Poisson, and their applications in data science.',
  'estimators': 'Statistical estimators, bias, variance, and the properties of good estimators for inference.',
  'frequentist-hypothesis-testing': 'Frequentist hypothesis testing, p-values, significance levels, and Type I/II errors explained.',
  'confidence-intervals': 'Confidence intervals, their interpretation, construction, and relationship to hypothesis testing.',
  'statistical-tests': 'Common statistical tests including t-tests, chi-squared tests, and ANOVA with practical examples.',
  'regression': 'Linear and logistic regression, model fitting, and predictive modeling techniques.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = STATS_PAGES.find((p) => p.slug === params.page);
  const title = pageData?.title || params.page;
  const description = STATS_DESCRIPTIONS[params.page] || `Statistics guide: ${title}`;

  return {
    title: `Statistics: ${title}`,
    description,
    openGraph: {
      title: `${title} - Statistics Guide`,
      description,
    },
  };
}

export default async function StatsPage({ params }: Props): Promise<JSX.Element> {
  const page = await getStatsPage(params.page);

  if (!page) {
    notFound();
  }

  // Find current index for prev/next navigation
  const currentIndex = STATS_PAGES.findIndex((p) => p.slug === params.page);
  const prevPage = currentIndex > 0 ? STATS_PAGES[currentIndex - 1] : null;
  const nextPage = currentIndex < STATS_PAGES.length - 1 ? STATS_PAGES[currentIndex + 1] : null;
  const pageTitle = STATS_PAGES.find((p) => p.slug === params.page)?.title || page.title;

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Main Content */}
      <article>
        {/* Centered Header - matching blog post style */}
        <header className="text-center mb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1.5">
            Statistics Guide
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
            {pageTitle}
          </h1>
        </header>

        {/* Divider */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto mb-6" />

        <div
          className="post-content hide-first-h1 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: page.contentHtml }}
        />

        {/* Prev/Next Navigation */}
        <nav className="flex justify-between mt-12 pt-6 border-t border-border">
          {prevPage ? (
            <Link 
              href={`/stats/${prevPage.slug}`} 
              className="group flex items-center text-text-secondary hover:text-accent transition-colors duration-150"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-150">←</span>
              <span className="font-medium">{prevPage.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextPage ? (
            <Link 
              href={`/stats/${nextPage.slug}`} 
              className="group flex items-center text-text-secondary hover:text-accent transition-colors duration-150"
            >
              <span className="font-medium">{nextPage.title}</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-150">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      {/* Sidebar - positioned to the right, outside the centered content */}
      <aside className="hidden lg:block absolute left-full top-0 ml-8 w-44">
        <div className="sticky top-24">
          <StatsNav currentSlug={params.page} />
        </div>
      </aside>
    </div>
  );
}
