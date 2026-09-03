import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import { getSectorPage, sectorPages } from '@/data/sectorPages';
import SchemeList from '@/components/SchemeList';
import { schemesInSector } from '@/lib/schemes';

const SITE_URL = 'https://ukfunding.io';

export const dynamicParams = false;

export function generateStaticParams() {
  return sectorPages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sp = getSectorPage(params.slug);
  if (!sp) return {};
  const n = schemesInSector(sp.id).length;
  return {
    title: `${sp.title} funding in the UK: ${n} schemes tracked`,
    description: `Every UK grant, equity scheme, loan and tax relief open to ${sp.title.toLowerCase()} founders. ${n} schemes tracked, with eligibility, ticket size and deadlines.`,
    alternates: { canonical: `/sector/${sp.slug}` },
  };
}

export default function SectorPage({ params }: { params: { slug: string } }) {
  const sp = getSectorPage(params.slug);
  if (!sp) notFound();

  const list = schemesInSector(sp.id);
  const siblings = sectorPages.filter((x) => x.slug !== sp.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${sp.title} funding in the UK`,
        description: sp.intro.slice(0, 200),
        url: `${SITE_URL}/sector/${sp.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Sectors', item: `${SITE_URL}/sector/${sp.slug}` },
          { '@type': 'ListItem', position: 3, name: sp.title, item: `${SITE_URL}/sector/${sp.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="mx-auto max-w-[900px] px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink-mute">Sector</span>
        </nav>

        <h1 className="section-em mb-5 text-display font-medium text-ink">
          {sp.title} funding in the <em>UK</em>.
        </h1>
        <p className="mb-3 font-mono text-label uppercase text-ink-mute">
          {list.length} schemes tracked · Lead funders: {sp.leadFunders}
        </p>
        <p className="mb-12 max-w-[680px] text-[16px] leading-[1.6] text-ink-mute">{sp.intro}</p>

        <SchemeList schemes={list} emptyLabel="No schemes tracked in this sector yet." />

        <div className="my-14 border-y border-line-strong">
          <Newsletter />
        </div>

        <section className="border-t border-line pt-7">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">Other sectors</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((x) => (
              <Link
                key={x.slug}
                href={`/sector/${x.slug}`}
                className="border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {x.title}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
