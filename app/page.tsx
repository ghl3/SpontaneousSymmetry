import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { PersonSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'George Lewis - Programmer, Data Scientist, Physicist',
  description: 'George Lewis is a Machine Learning Engineer at Google Maps with a PhD in Physics from NYU/CERN. Explore articles on programming, data science, statistics, and particle physics.',
  openGraph: {
    title: 'George Lewis - Programmer, Data Scientist, Physicist',
    description: 'Machine Learning Engineer at Google Maps with a PhD in Physics from NYU/CERN.',
  },
};

export default function Home(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <PersonSchema
        name="George Lewis"
        jobTitle="Machine Learning Engineer"
        worksFor="Google"
        url="https://spontaneoussymmetry.com"
        email="ghl227@gmail.com"
        sameAs={[
          'https://github.com/ghl3',
          'https://twitter.com/ghl3',
        ]}
      />
      <PageHero 
        title="George Lewis" 
        subtitle="Programmer · Data Scientist · Physicist" 
      />

      {/* Introduction */}
      <div className="space-y-5 text-text-primary leading-relaxed">
        <p>
          I&apos;m a programmer, data scientist, physicist, and technology lover, and I&apos;m 
          fascinated by learning how almost anything works.
        </p>

        <p>
          I&apos;m currently a Machine Learning Engineer at{' '}
          <Link href="https://www.google.com" className="font-medium">Google</Link>, where I work on the Location Platform at{' '}
          <Link href="https://www.google.com/maps" className="font-medium">Google Maps</Link>.
        </p>

        <p>
          Previously, I worked at{' '}
          <Link href="https://www.lendup.com" className="font-medium">LendUp</Link>, a startup whose 
          goal is to safely extend credit to all who need it.
        </p>

        <p>
          I obtained a PhD in High Energy Experimental Particle Physics from New York University, 
          where I worked on the{' '}
          <Link href="https://atlas.ch/" className="font-medium">ATLAS</Link> experiment on the Large 
          Hadron Collider at{' '}
          <Link href="https://public.web.cern.ch/public/" className="font-medium">CERN</Link>.
        </p>

        <p>
          I was also a fellow at the{' '}
          <Link href="https://insightdatascience.com/" className="font-medium">Insight Data Science Program</Link>.
        </p>
      </div>

      <p className="text-center text-text-secondary mt-8">
        Reach me at{' '}
        <Link href="mailto:ghl227@gmail.com" className="font-medium">ghl227@gmail.com</Link>
      </p>

      {/* Divider */}
      <div className="divider" />

      {/* Philosophy Quote with E8 Graph */}
      <figure className="text-center">
        <div className="inline-block p-6 bg-surface rounded-2xl mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/assets/images/E8_graph.svg" 
            alt="E8 Graph — a visualization of the exceptional Lie group E8" 
            width={280}
            height={280}
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
