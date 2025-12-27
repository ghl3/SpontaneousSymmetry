export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border-light bg-surface-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <p className="text-sm text-text-muted text-center">
          &copy; {currentYear} George Herbert Lewis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
