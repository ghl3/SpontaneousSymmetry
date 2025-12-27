import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BouncingBalls = dynamic(
  () => import('@/components/BouncingBalls'),
  { 
    ssr: false,
    loading: () => <p className="text-center">Loading simulation...</p>
  }
);

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Bouncing Balls',
};

export default function BouncingBallsPage() {
  return (
    <div className="content mx-auto max-w-3xl">
      <BouncingBalls />
    </div>
  );
}

