import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Spontaneous Symmetry',
  description: 'George Lewis - Programmer, Data Scientist, Physicist',
  keywords: 'spontaneous symmetry, spontaneoussymmetry, george lewis, Higgs, ATLAS, CERN, Statistics, physics, quark',
  icons: {
    icon: '/assets/images/favicon.ico',
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
