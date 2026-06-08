import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const SITE_URL = 'https://ukfunding.io';
const SITE_DESCRIPTION =
  'An independent editorial atlas of UK startup funding — public schemes, private capital, ARIA programmes, and tax relief in one place. No vendors, no affiliate links.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ukfunding.io — an atlas of British funding',
    template: '%s · ukfunding.io',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'UK startup funding',
    'Innovate UK',
    'ARIA',
    'UKRI',
    'British Business Bank',
    'SEIS',
    'EIS',
    'R&D tax credits',
    'UK grants',
    'UK accelerators',
    'venture capital UK',
  ],
  authors: [{ name: 'ukfunding.io editorial' }],
  alternates: {
    canonical: '/',
    languages: {
      'en-GB': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'ukfunding.io',
    title: 'ukfunding.io — an atlas of British funding',
    description: SITE_DESCRIPTION,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ukfunding_io',
    creator: '@ukfunding_io',
    title: 'ukfunding.io — an atlas of British funding',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'ukfunding.io',
      legalName: 'IP3 Studio Ltd',
      url: SITE_URL,
      description:
        'Independent editorial atlas of UK startup funding — public schemes, private capital, ARIA, and tax relief.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '112 Morden Road',
        addressLocality: 'London',
        postalCode: 'SW19 3BP',
        addressCountry: 'GB',
      },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      sameAs: [
        'https://x.com/ukfunding_io',
        'https://github.com/IP3-Studio/ukfunding',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: 'ukfunding.io',
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}#organization` },
      inLanguage: 'en-GB',
    },
  ],
};

const themeInitScript = `
try {
  var t = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" data-theme="dark" className={`${roboto.variable} ${robotoMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
