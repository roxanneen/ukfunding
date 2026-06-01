import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(40px, 5.4vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display': ['clamp(32px, 4.2vw, 52px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'label': ['11px', { lineHeight: '1.2', letterSpacing: '0.18em' }],
      },
      colors: {
        // These map to CSS custom properties set on :root
        bg: 'var(--bg)',
        'bg-elev': 'var(--bg-elev)',
        'bg-paper': 'var(--bg-paper)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        ink: 'var(--ink)',
        'ink-mute': 'var(--ink-mute)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        warn: 'var(--warn)',
      },
      spacing: {
        'section': '96px',
        'section-mobile': '64px',
      },
    },
  },
  plugins: [],
};

export default config;
