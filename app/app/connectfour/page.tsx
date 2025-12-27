import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamic import to avoid SSR issues with TensorFlow.js
const ConnectFourGame = dynamic(
  () => import('@/components/ConnectFourGame'),
  { 
    ssr: false,
    loading: () => (
      <div className="text-center py-12 text-text-secondary">
        Loading game...
      </div>
    )
  }
);

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Connect Four',
};

export default function ConnectFourPage(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Connect Four
        </h1>
        <p className="text-text-secondary mt-2">
          Play against a neural network AI trained on self-play games
        </p>
      </div>

      {/* Game */}
      <div className="bg-surface-white rounded-lg border border-border p-6">
        <ConnectFourGame />
      </div>

      {/* Info */}
      <div className="mt-8 p-4 bg-surface rounded-lg text-sm text-text-secondary leading-relaxed">
        <p>
          This game uses a convolutional neural network to evaluate board positions
          and select moves. The model was trained using reinforcement learning on 
          games of self-play. For more details, see the{' '}
          <Link href="/blog/2017-11-05-alpha-four" className="font-medium text-accent hover:text-accent-dark transition-colors duration-150">
            AlphaFour blog post
          </Link>.
        </p>
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
