import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Interactive web applications including AI-powered games. Play Connect Four against a neural network trained with TensorFlow, Rock-Paper-Scissors with adaptive AI, and physics simulations.',
  openGraph: {
    title: 'Interactive Apps - Games & Simulations',
    description: 'AI-powered games and physics simulations built with TensorFlow and JavaScript.',
  },
};

interface AppItem {
  name: string;
  href: string;
  description: string;
}

const apps: AppItem[] = [
  {
    name: 'RocksPaper',
    href: '/app/rockspaper',
    description: 'Play Rocks-Paper-Scissors against a computer that attempts to learn your tendencies.',
  },
  {
    name: 'ConnectFour',
    href: '/app/connectfour',
    description: 'Play Connect Four against an AI trained using self-play with TensorFlow.',
  },
  {
    name: 'Bouncing Balls',
    href: '/app/bouncingballs',
    description: 'Physics simulation with elastic collisions between colorful bouncing balls.',
  },
];

export default function AppsPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <PageHero title="Apps" subtitle="Interactive toy applications" />

      {/* Apps List */}
      <div className="space-y-4">
        {apps.map((app) => (
          <Link 
            key={app.name}
            href={app.href}
            className="block p-5 rounded-lg border border-border bg-surface-white hover:border-accent hover:shadow-sm transition-all duration-150 group"
          >
            <h3 className="font-semibold text-lg text-text-primary group-hover:text-accent transition-colors duration-150">
              {app.name}
            </h3>
            <p className="text-text-secondary mt-1">
              {app.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
