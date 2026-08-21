import type { MetadataRoute } from 'next';

import { PROFILE } from '@/data/profile';

/**
 * Served at `/manifest.webmanifest`. Generated rather than kept as a static file
 * so the name, description and theme colour come from the same source as the
 * rest of the site and cannot go stale.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PROFILE.name} — ${PROFILE.title} & Backend Architect`,
    short_name: PROFILE.name,
    description: PROFILE.summary,
    start_url: '/',
    display: 'standalone',
    background_color: '#05060a',
    theme_color: '#6366f1',
    orientation: 'portrait-primary',
    categories: ['business', 'productivity'],
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
