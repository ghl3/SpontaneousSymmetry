import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry: Apps',
};

export default function AppsPage() {
  return (
    <div className="content mx-auto max-w-3xl">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">APPS</h2>
      </div>

      <p>The following is a list of toy apps I&apos;ve written:</p>

      <ul className="list-disc pl-6 space-y-4 mt-6">
        <li>
          <Link href="/app/rockspaper">RocksPaper</Link>: Play Rocks-Paper-Scissors against a 
          computer that attempts to learn your tendencies.
        </li>
        <li>
          <Link href="/app/connectfour">ConnectFour</Link>: Play Connect Four against an AI 
          trained using self-play with TensorFlow.
        </li>
      </ul>
    </div>
  );
}


