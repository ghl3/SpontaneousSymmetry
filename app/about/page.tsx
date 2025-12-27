import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About',
  description: 'Spontaneous Symmetry is a site dedicated to programming, science, math, and technology. Featuring articles on statistics, machine learning, physics, and more.',
  openGraph: {
    title: 'About Spontaneous Symmetry',
    description: 'A site dedicated to programming, science, math, and technology.',
  },
};

export default function AboutPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHero 
        title="About" 
        subtitle="Programming · Science · Math · Technology" 
      />

      {/* Content */}
      <div className="space-y-5 text-text-primary leading-relaxed">
        <p>
          Welcome to SpontaneousSymmetry, a site dedicated to programming, science, math, 
          and technology.
        </p>

        <p>
          To read our latest post, visit our{' '}
          <Link href="/blog" className="font-medium">Blog</Link>.
        </p>

        <p>
          For our introduction to statistics, visit our{' '}
          <Link href="/stats" className="font-medium">Stats Guide</Link>.
        </p>

        <p>
          To learn more about the author, visit the{' '}
          <Link href="/" className="font-medium">Home</Link> page or 
          the <Link href="/work" className="font-medium">Work</Link> page. And for more details about the author&apos;s 
          physics research, visit the{' '}
          <Link href="/atlas" className="font-medium">Research</Link> page.
        </p>

        <p>
          For any questions or requests for posts or content, feel free to reach out:{' '}
          <Link href="mailto:ghl227@gmail.com" className="font-medium">ghl227@gmail.com</Link>
        </p>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Philosophy Quote with E8 Graph */}
      <figure className="text-center">
        <div className="inline-block p-6 bg-surface rounded-2xl mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/assets/images/E8_graph.svg" 
            alt="E8 Graph — a visualization of the exceptional Lie group E8" 
            width={200}
            height={200}
            className="opacity-80"
          />
        </div>
        <blockquote className="max-w-md mx-auto">
          <p className="text-text-secondary leading-relaxed italic">
            Symmetries are all around us and shape our lives in ways few understand. 
            In a deep, fundamental way, they govern how the world works—the language 
            of the most fundamental physical processes we can describe.
          </p>
        </blockquote>
      </figure>
    </div>
  );
}
