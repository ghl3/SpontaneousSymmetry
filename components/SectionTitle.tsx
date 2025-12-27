interface SectionTitleProps {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({ children, centered = false, className = '' }: SectionTitleProps): JSX.Element {
  return (
    <h2 className={`text-2xl font-semibold text-text-primary mb-6 ${centered ? 'text-center' : ''} ${className}`}>
      {children}
    </h2>
  );
}

