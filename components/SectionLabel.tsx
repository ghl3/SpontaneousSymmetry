interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps): JSX.Element {
  return (
    <h2 className={`text-sm font-medium text-text-muted uppercase tracking-wider mb-4 ${className}`}>
      {children}
    </h2>
  );
}

