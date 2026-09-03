import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import SchemeList from '@/components/SchemeList';
import { regions } from '@/data/regions';
import type { RegionId } from '@/data/types';
import { schemesInRegion } from '@/lib/schemes';

const SITE_URL = 'https://ukfunding.io';

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = regions.find((x) => x.id === params.slug);
  if (!r) return {};
  const n = schemesInRegion(r.id as RegionId).length;
  return {
    title: `Startup funding in ${r.name}: ${n} schemes tracked`,
    description: `Grants, equity schemes, loans and tax reliefs open to founders in ${r.name}. ${n} schemes tracked, with eligibility, ticket size and deadlines.`,
    alternates: { canonical: `/region/${r.id}` },
  };
}

export default function RegionPage({ params }: { params: { slug: string } }) {
  const region = regions.find((x) => x.id === params.slug);
  if (!region) notFound();

  const list = schemesInRegion(region.id as RegionId);
  const local = list.filter((s) => s.regions !== 'all');
  const national = list.filter((s) => s.regions === 'all');
  const siblings = regions.filter((x) => x.id !== region.id);
  const [annual, active, lead] = region.stats;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `Startup funding in ${region.name}`,
        url: `${SITE_URL}/region/${region.id}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Regions', item: `${SITE_URL}/region/${region.id}` },
          { '@type': 'ListItem', position: 3, name: region.name, item: `${SITE_URL}/region/${region.id}` },
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
          <span className="text-ink-mute">Region</span>
        </nav>

        <h1 className="section-em mb-5 text-display font-medium text-ink">
          Startup funding in <em>{region.name}</em>.
        </h1>

        <dl className="mb-8 grid grid-cols-3 gap-px border border-line-strong bg-line-strong">
          <Stat label="Deployed annually" value={annual} />
          <Stat label="Active schemes" value={active} />
          <Stat label="Lead body" value={lead} />
        </dl>

        <p className="mb-12 max-w-[680px] text-[16px] leading-[1.6] text-ink-mute">
          Roughly 73% of UK equity capital lands in the Greater South East, so founders elsewhere are
          working against a thinner private market. The devolved and regional bodies exist to close
          that gap, and their money is often easier to reach than national competitions because the
          applicant pool is smaller. {region.name} runs {local.length} schemes of its own on top of the{' '}
          {national.length} UK-wide programmes below.
        </p>

        <section className="mb-12">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">
            {region.name} schemes
          </h2>
          <SchemeList
            schemes={local}
            emptyLabel={`No ${region.name}-specific schemes tracked yet. The UK-wide programmes below are all open to founders here.`}
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">Regional funders</h2>
          <ul className="grid gap-px bg-line sm:grid-cols-2">
            {region.schemes.map((s) => (
              <li key={s.name} className="bg-bg p-4">
                <div className="font-sans text-[15px] font-medium text-ink">{s.name}</div>
                <div className="mt-1.5 font-mono text-[11px] text-ink-mute">
                  {s.description} · {s.amountLabel}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">
            UK-wide schemes open here
          </h2>
          <SchemeList schemes={national} />
        </section>

        <div className="my-14 border-y border-line-strong">
          <Newsletter />
        </div>

        <section className="border-t border-line pt-7">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">Other regions</h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((x) => (
              <Link
                key={x.id}
                href={`/region/${x.id}`}
                className="border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {x.name}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg px-4 py-3.5">
      <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="font-sans text-[18px] font-medium text-ink">{value}</dd>
    </div>
  );
}
