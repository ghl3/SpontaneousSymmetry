import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const BouncingBalls = dynamic(
  () => import('@/components/BouncingBalls'),
  { 
    ssr: false,
    loading: () => (
      <div className="text-center py-12 text-text-secondary">
        Loading simulation...
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Bouncing Balls',
};

export default function BouncingBallsPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Bouncing Balls
        </h1>
        <p className="text-text-secondary mt-2">
          Physics simulation with elastic collisions
        </p>
      </div>

      {/* Game */}
      <div className="flex justify-center">
        <BouncingBalls />
      </div>

      {/* Back Link */}
      <div className="mt-8 text-center">
        <Link 
          href="/apps" 
          className="inline-flex items-center text-text-secondary hover:text-accent transition-colors duration-150"
        >
          <span className="mr-2">←</span>
          Back to Apps
        </Link>
      </div>
    </div>
  );
}
