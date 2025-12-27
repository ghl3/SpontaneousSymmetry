interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps): JSX.Element {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-secondary text-lg mt-1.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

