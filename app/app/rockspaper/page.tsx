import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const RocksPaperGame = dynamic(
  () => import('@/components/RocksPaperGame'),
  { 
    ssr: false,
    loading: () => <p className="text-center">Loading game...</p>
  }
);

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Rock Paper Scissors',
};

export default function RocksPaperPage() {
  return (
    <div className="content mx-auto max-w-3xl">
      <RocksPaperGame />
    </div>
  );
}

