import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import { regions as regionData } from '@/data/regions';
import { sectorPages } from '@/data/sectorPages';
import type { SchemeWithDetail } from '@/data/types';
import {
  formatTicket,
  getScheme,
  hasDetail,
  publishableSchemes,
  resolveRegions,
} from '@/lib/schemes';

const SITE_URL = 'https://ukfunding.io';

export const dynamicParams = false;

export function generateStaticParams() {
  return publishableSchemes().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getScheme(params.slug);
  if (!s) return {};
  const ticket = formatTicket(s.ticketMin, s.ticketMax);
  return {
    title: `${s.name}: eligibility, ticket size & deadlines`,
    description: `${s.name} is a ${s.type} from ${s.funder}. Ticket ${ticket}, deadline ${s.deadline}. Who can apply, how to apply, and why applications get turned down.`,
    alternates: { canonical: `/funding/${s.slug}` },
  };
}

/** Two to four FAQs per page, built from the record so they stay accurate. */
function buildFaqs(s: SchemeWithDetail) {
  const ticket = formatTicket(s.ticketMin, s.ticketMax);
  const faqs = [
    {
      q: `How much can you get from ${s.name}?`,
      a: `${ticket}. ${s.amountLabel === ticket ? '' : `Published as ${s.amountLabel}. `}Awards sit at the lower end far more often than the top of the range.`.trim(),
    },
    {
      q: `What is the deadline for ${s.name}?`,
      a:
        s.deadlineDate === null
          ? `${s.deadline}. There is no fixed closing date, so you can apply when you are ready.`
          : `${s.deadline}. Deadlines move, so check the official page before you commit to a submission date.`,
    },
    {
      q: `Why do ${s.name} applications get rejected?`,
      a: s.commonRejections[0],
    },
  ];
  if (s.successRate) {
    faqs.push({
      q: `What are the odds of winning ${s.name}?`,
      a: `${s.successRate}. Treat that as a planning number rather than a prediction.`,
    });
  }
  return faqs;
}

export default function SchemePage({ params }: { params: { slug: string } }) {
  const scheme = getScheme(params.slug);
  if (!scheme || !hasDetail(scheme)) notFound();

  const s = scheme;
  const ticket = formatTicket(s.ticketMin, s.ticketMax);
  const faqs = buildFaqs(s);
  const schemeRegions = resolveRegions(s.regions);
  const isNational = s.regions === 'all';
  const related = (s.relatedSchemes ?? [])
    .map((slug) => getScheme(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r) && r!.slug !== s.slug)
    .slice(0, 4);
  const sectorLinks = sectorPages.filter((sp) => s.sectors.includes(sp.id));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GovernmentService',
        name: s.name,
        serviceType: s.type,
        description: `${s.name} is a ${s.type} from ${s.funder}. Ticket ${ticket}.`,
        provider: { '@type': 'Organization', name: s.funder },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        url: `${SITE_URL}/funding/${s.slug}`,
        ...(s.officialUrl ? { sameAs: s.officialUrl } : {}),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Funding', item: `${SITE_URL}/funding` },
          { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}/funding/${s.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="mx-auto max-w-[860px] px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-16">
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink-mute">{s.funder}</span>
        </nav>

        <h1 className="section-em mb-6 text-display font-medium text-ink">
          {s.name}: <em>eligibility, ticket size &amp; deadlines</em>
        </h1>

        {/* 2. Key facts strip */}
        <dl className="mb-12 grid grid-cols-2 gap-px border border-line-strong bg-line-strong md:grid-cols-3">
          <Fact label="Funder" value={s.funder} />
          <Fact label="Type" value={s.type} />
          <Fact label="Ticket" value={ticket} />
          <Fact label="Deadline" value={s.deadline} />
          <Fact label="Success rate" value={s.successRate ?? 'Not published'} />
          <Fact label="Last verified" value={s.lastVerified} />
        </dl>

        {/* 3. Can you apply? */}
        <Block title="Can you apply?">
          <ul className="flex flex-col gap-2.5">
            {s.eligibility.map((e) => (
              <li key={e} className="flex gap-3 text-[15px] leading-[1.55] text-ink-mute">
                <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-accent" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* 4. How to apply */}
        <Block title="How to apply">
          <ol className="flex flex-col gap-3">
            {s.howToApply.map((step, i) => (
              <li key={step} className="flex gap-4 text-[15px] leading-[1.55] text-ink-mute">
                <span className="shrink-0 font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {s.officialUrl && (
            <a
              href={s.officialUrl}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-block border border-line-strong px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink transition-colors hover:bg-bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Apply on the official site
            </a>
          )}
        </Block>

        {/* 5. Common rejection reasons */}
        <Block title="Why applications get turned down">
          <ul className="flex flex-col gap-2.5">
            {s.commonRejections.map((r) => (
              <li key={r} className="flex gap-3 text-[15px] leading-[1.55] text-ink-mute">
                <span aria-hidden className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-ink-faint" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* 6. Stack it with */}
        {related.length > 0 && (
          <Block title="Stack it with">
            <div className="grid gap-px bg-line sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/funding/${r.slug}`}
                  className="bg-bg p-4 transition-colors hover:bg-bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                >
                  <div className="font-sans text-[15px] font-medium text-ink">{r.name}</div>
                  <div className="mt-1 font-mono text-[11px] text-ink-mute">
                    {r.funder} · {formatTicket(r.ticketMin, r.ticketMax)}
                  </div>
                </Link>
              ))}
            </div>
          </Block>
        )}

        {/* 7. Region + sector chips */}
        <Block title="Where this sits">
          <div className="flex flex-wrap gap-2">
            {sectorLinks.map((sp) => (
              <Chip key={sp.slug} href={`/sector/${sp.slug}`}>
                {sp.title}
              </Chip>
            ))}
            {isNational ? (
              <Chip href="/region/london">UK-wide</Chip>
            ) : (
              schemeRegions.map((rid) => {
                const r = regionData.find((x) => x.id === rid);
                return r ? (
                  <Chip key={rid} href={`/region/${rid}`}>
                    {r.name}
                  </Chip>
                ) : null;
              })
            )}
          </div>
        </Block>

        {/* 8. Newsletter capture */}
        <div className="my-14 border-y border-line-strong">
          <Newsletter />
        </div>

        {/* 9. FAQ */}
        <Block title="Questions people ask">
          <div className="flex flex-col gap-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="mb-1.5 font-sans text-[16px] font-medium text-ink">{f.q}</h3>
                <p className="text-[15px] leading-[1.55] text-ink-mute">{f.a}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* 10. Verification footer */}
        <p className="mt-12 border-l-2 border-line-strong pl-5 text-[12px] leading-[1.55] text-ink-faint">
          Figures checked against the funder&rsquo;s own published material on {s.lastVerified}. Scheme
          terms change without notice, so verify on the official page before you apply. Spot something
          wrong?{' '}
          <a href="mailto:contact@ip3.studio" className="text-accent underline-offset-4 hover:underline">
            Tell us
          </a>
          .
        </p>
      </main>

      <Footer />
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg px-4 py-3.5">
      <dt className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</dt>
      <dd className="font-sans text-[14px] capitalize text-ink">{value}</dd>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 border-t border-line pt-7">
      <h2 className="mb-4 font-sans text-[21px] font-medium tracking-[-0.01em] text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Chip({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </Link>
  );
}
