import Link from 'next/link';

export default function NotFound(): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text-secondary mb-6">Page Not Found</h2>
      <p className="text-text-secondary mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center px-5 py-2.5 rounded-full bg-text-primary text-surface-white font-medium hover:bg-accent transition-colors duration-150"
      >
        <span className="mr-2">←</span>
        Return Home
      </Link>
    </div>
  );
}
