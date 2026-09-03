import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import { schemes } from '@/data/schemes';
import type { Scheme } from '@/data/types';
import { formatTicket, hasDetail } from '@/lib/schemes';

const SITE_URL = 'https://ukfunding.io';

/** Rebuild daily so the countdowns stay honest. */
export const revalidate = 86_400;

function monthLabel(d: Date) {
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function generateMetadata(): Metadata {
  return {
    title: `Open UK startup funding deadlines, ${monthLabel(new Date())}`,
    description:
      'Every UK grant, equity scheme and tax relief with an open deadline, sorted by what closes first. Updated monthly.',
    alternates: { canonical: '/deadlines' },
  };
}

function daysLeft(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}

export default function DeadlinesPage() {
  const now = new Date();

  const dated = schemes
    .filter((s): s is Scheme & { deadlineDate: string } => Boolean(s.deadlineDate))
    .map((s) => ({ s, left: daysLeft(s.deadlineDate) }))
    .filter((x) => x.left >= 0)
    .sort((a, b) => a.left - b.left);

  const closingSoon = dated.filter((x) => x.left <= 30);
  const later = dated.filter((x) => x.left > 30);
  const rolling = schemes.filter((s) => !s.deadlineDate);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Open UK startup funding deadlines, ${monthLabel(now)}`,
    numberOfItems: dated.length,
    itemListElement: dated.slice(0, 40).map((x, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: x.s.name,
      url: hasDetail(x.s) ? `${SITE_URL}/funding/${x.s.slug}` : SITE_URL,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="mx-auto max-w-[960px] px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-16">
        <h1 className="section-em mb-5 text-display font-medium text-ink">
          Open UK funding <em>deadlines</em>, {monthLabel(now)}.
        </h1>
        <p className="mb-12 max-w-[680px] text-[16px] leading-[1.6] text-ink-mute">
          Everything we track with a published closing date, soonest first. Deadlines move and
          competitions get pulled, so treat this as a prompt to check the funder&rsquo;s own page
          rather than as the last word. {rolling.length} further schemes run on a rolling or evergreen
          basis and are listed at the bottom.
        </p>

        {closingSoon.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-mono text-label uppercase tracking-[0.14em] text-accent">
              Closing within 30 days
            </h2>
            <DeadlineTable rows={closingSoon} showCountdown />
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">Open later</h2>
          <DeadlineTable rows={later} showCountdown />
        </section>

        <div className="my-14 border-y border-line-strong">
          <Newsletter />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 font-sans text-[21px] font-medium text-ink">Rolling and evergreen</h2>
          <p className="mb-4 text-[15px] text-ink-mute">
            No fixed closing date. Apply when the work is ready.
          </p>
          <DeadlineTable rows={rolling.map((s) => ({ s, left: -1 }))} showCountdown={false} />
        </section>
      </main>

      <Footer />
    </>
  );
}

function DeadlineTable({
  rows,
  showCountdown,
}: {
  rows: { s: Scheme; left: number }[];
  showCountdown: boolean;
}) {
  if (rows.length === 0) {
    return <p className="py-6 text-[15px] text-ink-faint">Nothing here right now.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line-strong font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            <th className="py-2.5 pr-4 font-normal">Scheme</th>
            <th className="py-2.5 pr-4 font-normal">Funder</th>
            <th className="py-2.5 pr-4 font-normal">Ticket</th>
            <th className="py-2.5 pr-4 font-normal">Type</th>
            <th className="py-2.5 font-normal">{showCountdown ? 'Closes' : 'Status'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ s, left }) => (
            <tr key={s.slug} className="border-b border-line align-top">
              <td className="py-3 pr-4 text-[14px] font-medium text-ink">
                {hasDetail(s) ? (
                  <Link href={`/funding/${s.slug}`} className="hover:text-accent">
                    {s.name}
                  </Link>
                ) : (
                  s.name
                )}
              </td>
              <td className="py-3 pr-4 font-mono text-[12px] text-ink-mute">{s.funder}</td>
              <td className="py-3 pr-4 font-mono text-[12px] text-ink-mute">
                {formatTicket(s.ticketMin, s.ticketMax)}
              </td>
              <td className="py-3 pr-4 font-mono text-[12px] capitalize text-ink-mute">{s.type}</td>
              <td className="py-3 font-mono text-[12px] text-ink-mute">
                {showCountdown ? (
                  <>
                    {s.deadline}
                    {left >= 0 && (
                      <span className={left <= 30 ? 'ml-2 text-accent' : 'ml-2 text-ink-faint'}>
                        {left}d
                      </span>
                    )}
                  </>
                ) : (
                  s.deadline
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
