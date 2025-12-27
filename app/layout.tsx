import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { WebsiteSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://spontaneoussymmetry.com'),
  title: {
    default: 'Spontaneous Symmetry',
    template: '%s | Spontaneous Symmetry',
  },
  description: 'George Lewis - Programmer, Data Scientist, Physicist. Articles on programming, physics, statistics, and machine learning.',
  keywords: 'spontaneous symmetry, spontaneoussymmetry, george lewis, Higgs, ATLAS, CERN, Statistics, physics, quark, machine learning, data science',
  authors: [{ name: 'George Lewis' }],
  creator: 'George Lewis',
  icons: {
    icon: '/assets/images/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Spontaneous Symmetry',
  },
  twitter: {
    card: 'summary',
    creator: '@ghl3',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <GoogleAnalytics />
        <WebsiteSchema
          name="Spontaneous Symmetry"
          url="https://spontaneoussymmetry.com"
          description="George Lewis - Programmer, Data Scientist, Physicist. Articles on programming, physics, statistics, and machine learning."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="document flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
