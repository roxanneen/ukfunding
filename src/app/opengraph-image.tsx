import { ImageResponse } from 'next/og';

// Use nodejs runtime so the OG image renders both on Vercel and during
// `next build` for static export.
export const runtime = 'nodejs';
export const alt = 'ukfunding.io — an atlas of British funding';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          color: '#f5f3ec',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Brand mark — absolutely positioned so it can't collide with the title block. */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontFamily: 'monospace',
            fontSize: '20px',
            letterSpacing: '0.04em',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid #f5f3ec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', width: '12px', height: '12px', background: '#f5f3ec' }} />
          </div>
          <span>
            ukfunding<span style={{ color: '#8a8884' }}>.io</span>
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '18px', letterSpacing: '0.18em', color: '#5A86C9', textTransform: 'uppercase', marginBottom: '24px' }}>
            An atlas of British funding
          </div>
          <div style={{ fontSize: '88px', lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 500, maxWidth: '1000px' }}>
            Every pound, mapped.
          </div>
          <div style={{ fontSize: '26px', lineHeight: 1.4, color: '#8a8884', marginTop: '28px', maxWidth: '900px' }}>
            The capital infrastructure of British innovation — 58+ schemes, 9 regions, £2.8B deployable.
          </div>
        </div>

        {/* Bottom-right credit, diagonal-balanced with the brand mark in top-left. */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace',
            fontSize: '14px',
            letterSpacing: '0.08em',
            color: '#5e5b52',
            textTransform: 'uppercase',
          }}
        >
          Built by IP3 Studio
        </div>
      </div>
    ),
    size
  );
}
