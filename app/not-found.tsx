import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="content mx-auto max-w-3xl text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-xl mb-6">Page Not Found</h2>
      <p className="mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="text-accent hover:underline">
        ← Return Home
      </Link>
    </div>
  );
}

