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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <div className="document">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}


