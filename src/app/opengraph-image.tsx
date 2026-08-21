import { ImageResponse } from 'next/og';

import { CAREER_START, PROFILE } from '@/data/profile';
import { computeTenure } from '@/lib/tenure';

export const alt = `${PROFILE.name} — ${PROFILE.title} and Backend Architect`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social preview card, generated at build time.
 *
 * Mirrors the hero's structure — name, role, then credentials as data — so a
 * link preview and the page itself read as the same design.
 *
 * Satori is not a browser: it requires an explicit `display` on any element with
 * more than one child, and adjacent text nodes count. Every string below is
 * therefore built as a single interpolated child.
 */
export default function OpengraphImage() {
  const tenure = computeTenure(CAREER_START);

  const credentials = [tenure.label, 'Go · Node.js', 'Kafka · PostgreSQL', 'Kubernetes'];

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#05060a',
        padding: 72,
        // A single wash, echoing the page's ambient background.
        backgroundImage:
          'radial-gradient(900px 500px at 12% -10%, rgba(99,102,241,0.28), transparent), radial-gradient(700px 420px at 105% 60%, rgba(139,92,246,0.22), transparent)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6 55%, #22D3EE)',
            color: '#fff',
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {PROFILE.initials}
        </div>
        <div style={{ color: '#22D3EE', fontSize: 20, letterSpacing: 3 }}>
          {PROFILE.availability.toUpperCase()}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            color: '#ffffff',
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          {PROFILE.name}
        </div>
        <div style={{ color: '#a5b4fc', fontSize: 36, marginTop: 12 }}>
          {`${PROFILE.title} · Backend Architect`}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 40,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: 28,
          color: '#94a3b8',
          fontSize: 24,
        }}
      >
        {credentials.map((credential) => (
          <div key={credential}>{credential}</div>
        ))}
      </div>
    </div>,
    size,
  );
}
