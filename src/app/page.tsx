import AriaSpotlight from '@/components/AriaSpotlight';
import CapitalStack from '@/components/CapitalStack';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import FundingMatchmaker from '@/components/FundingMatchmaker';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Insights from '@/components/Insights';
import Newsletter from '@/components/Newsletter';
import OpportunitiesTable from '@/components/OpportunitiesTable';
import PrivateCapital from '@/components/PrivateCapital';
import RdCalculator from '@/components/RdCalculator';
import RegionMap from '@/components/RegionMap';
import Sectors from '@/components/Sectors';
import Ticker from '@/components/Ticker';
import { schemes } from '@/data';
import { faq } from '@/data/faq';
import { deadlineUrgency } from '@/lib/format';

const SITE_URL = 'https://ukfunding.io';

/**
 * ItemList of MonetaryGrant — open schemes only.
 * Static at build time; closed-by-date schemes are filtered out.
 */
function buildOpportunitiesJsonLd() {
  const open = schemes.filter((s) => deadlineUrgency(s.deadlineDate) !== 'closed');
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}#open-opportunities`,
    name: 'Open UK startup funding opportunities',
    description:
      'A maintained list of currently open UK startup funding schemes — grants, equity, loans, accelerators, and tax relief.',
    numberOfItems: open.length,
    itemListElement: open.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'MonetaryGrant',
        name: s.name,
        description: s.tag,
        ...(s.url ? { url: s.url } : {}),
        funder: { '@type': 'Organization', name: s.body },
        amount: {
          '@type': 'MonetaryAmount',
          currency: 'GBP',
          maxValue: s.amountCeiling,
        },
        ...(s.deadlineDate ? { validThrough: s.deadlineDate } : {}),
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        audience: { '@type': 'BusinessAudience', audienceType: 'Startups and SMEs' },
      },
    })),
  };
}

function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}#faq`,
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };
}

export default function Home() {
  const opportunitiesJsonLd = buildOpportunitiesJsonLd();
  const faqJsonLd = buildFaqJsonLd();

  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <Ticker />
      </div>
      <main id="top">
        <Hero />
        <Insights />
        <FundingMatchmaker />
        <CapitalStack />
        <Sectors />
        <RegionMap />
        <PrivateCapital />
        <OpportunitiesTable />
        <RdCalculator />
        <Faq />
        <Newsletter />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(opportunitiesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
