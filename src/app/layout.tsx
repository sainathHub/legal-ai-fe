import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JurisAI — Legal AI for the Indian Legal System',
  description: 'AI-powered legal intelligence platform for the Indian legal system. Instant judgment summarization and high-dimensional semantic case precedent search.',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`light ${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white text-black font-sans antialiased min-h-screen selection:bg-black selection:text-white">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
