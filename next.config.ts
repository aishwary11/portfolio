import type { NextConfig } from 'next';

/**
 * Headers that cost nothing to set and close off the common classes of attack a
 * static marketing site is still exposed to — clickjacking, MIME sniffing and
 * referrer leakage.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  // The React Compiler memoises components automatically, which is why none of
  // the components in this project reach for `useMemo` or `memo` by hand.
  reactCompiler: true,

  // Turns `href` values into a checked union, so a typo in a section anchor or a
  // renamed route fails the build instead of shipping a dead link.
  typedRoutes: true,

  poweredByHeader: false,

  experimental: {
    // Both icon packs are large barrel files; this rewrites imports to the
    // individual modules so only the icons actually used are bundled.
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
