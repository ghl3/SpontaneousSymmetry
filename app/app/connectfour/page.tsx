import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with TensorFlow.js
const ConnectFourGame = dynamic(
  () => import('@/components/ConnectFourGame'),
  { 
    ssr: false,
    loading: () => <p className="text-center">Loading game...</p>
  }
);

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Connect Four',
};

export default function ConnectFourPage() {
  return (
    <div className="content mx-auto max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold">Connect Four</h1>
        <p className="text-gray-600 mt-2">
          Play against a neural network AI trained on self-play games.
        </p>
      </div>

      <ConnectFourGame />

      <div className="mt-8 text-sm text-gray-600">
        <p>
          This game uses a convolutional neural network to evaluate board positions
          and select moves. The model was trained using reinforcement learning on 
          games of self-play. For more details, see the{' '}
          <a href="/blog/2017-11-05-alpha-four" className="text-accent">
            AlphaFour blog post
          </a>.
        </p>
      </div>
    </div>
  );
}

