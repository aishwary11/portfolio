import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SkipLink } from '@/components/layout/SkipLink';
import { PROFILE, SITE_URL } from '@/data/profile';
import { buildPersonSchema, buildWebSiteSchema } from '@/lib/structured-data';
import { THEME_INIT_SCRIPT } from '@/lib/theme';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const SOCIAL_DESCRIPTION = `${PROFILE.title} with 8+ years building distributed, event-driven fintech and BFSI platforms on Node.js, Go, Kafka, PostgreSQL and Kubernetes.`;

export const metadata: Metadata = {
  /** Makes every relative URL below resolve absolutely, as crawlers require. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — ${PROFILE.title} & Backend Architect`,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.summary,
  applicationName: `${PROFILE.name} Portfolio`,
  keywords: [
    PROFILE.name,
    'Technical Lead',
    'Backend Architect',
    'Distributed Systems',
    'Event-Driven Architecture',
    'Node.js',
    'Golang',
    'PostgreSQL',
    'Apache Kafka',
    'Redis',
    'Kubernetes',
    'AWS EKS',
    'Microservices',
    'Multi-Tenant SaaS',
    'Fintech',
    'BFSI',
    'RAG',
    'pgvector',
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: '/',
    siteName: `${PROFILE.name} — ${PROFILE.title}`,
    title: `${PROFILE.name} — ${PROFILE.title} & Backend Architect`,
    description: SOCIAL_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} — ${PROFILE.title} & Backend Architect`,
    description: SOCIAL_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: PROFILE.name,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Capping or locking zoom fails WCAG 1.4.4; the previous max of 5 is removed.
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#05060a' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    /* The init script below sets `class` and `style` on this element before React
       hydrates, which is a mismatch React should be told to expect. */
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking on purpose: it has to win the race against first paint, or
            the page renders in the wrong palette and then corrects itself. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SkipLink />
        <div aria-hidden="true" className="scroll-progress" />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        {/* Structured data, so the resume resolves to an entity rather than
            leaving crawlers to infer one from the prose. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }}
        />
      </body>
    </html>
  );
}
