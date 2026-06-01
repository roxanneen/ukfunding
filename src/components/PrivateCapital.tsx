import { privateFirms } from '@/data';
import type { PrivateCategory, PrivateFirm } from '@/data/types';
import AriaSpotlight from './AriaSpotlight';

const columns: { key: PrivateCategory; num: string; title: string; sub: (count: number) => string }[] = [
  { key: 'vc_lead', num: 'COLUMN A', title: 'Lead VCs', sub: (n) => `Series A onwards · ${n} firms` },
  { key: 'vc_seed', num: 'COLUMN B', title: 'Seed & Early-Stage', sub: (n) => `Pre-seed → Seed · ${n} firms` },
  { key: 'accelerator', num: 'COLUMN C', title: 'Accelerators', sub: (n) => `Programs & talent · ${n} tracked` },
  { key: 'angel_crowd', num: 'COLUMN D', title: 'Angels & Crowd', sub: (n) => `Networks & platforms · ${n} tracked` },
];

export default function PrivateCapital() {
  const grouped: Record<PrivateCategory, PrivateFirm[]> = {
    vc_lead: [],
    vc_seed: [],
    accelerator: [],
    angel_crowd: [],
  };
  for (const firm of privateFirms) grouped[firm.category].push(firm);

  return (
    <section id="private" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          Where the <em>institutional</em> money sits.
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          A directory of UK-active venture funds, accelerators, angel networks, and crowdfunding platforms. Curated by
          stage and ticket size. No affiliate relationships, no pay-to-list.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => {
          const firms = grouped[col.key];
          return (
            <div key={col.key} className="flex flex-col bg-bg px-6 py-7">
              <header className="mb-4 border-b border-ink pb-3.5">
                <div className="mb-2 font-mono text-[10.5px] tracking-[0.18em] text-ink-mute">{col.num}</div>
                <h4 className="font-sans text-[20px] font-medium leading-[1.1] tracking-[-0.015em]">{col.title}</h4>
                <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.04em] text-ink-mute">{col.sub(firms.length)}</div>
              </header>
              <div className="flex flex-col">
                {firms.map((firm, idx) => (
                  <div
                    key={firm.name}
                    className={`py-3.5 ${idx < firms.length - 1 ? 'border-b border-dashed border-line' : ''}`}
                  >
                    <div className="mb-1 flex items-baseline justify-between gap-3 text-[13.5px] font-medium">
                      <span>{firm.name}</span>
                      <span className="whitespace-nowrap font-mono text-[11px] font-normal text-ink-mute">
                        {firm.ticketLabel}
                      </span>
                    </div>
                    <div className="text-[12.5px] leading-[1.4] text-ink-mute">{firm.description}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <BpcNote />

      <AriaSpotlight />

      <p className="mt-8 max-w-[720px] border-l-2 border-line-strong pl-5 text-[13px] leading-[1.55] text-ink-faint">
        Tickets shown are typical ranges, not floors or ceilings. Crowdfunding rounds are net of platform fees
        (typically 7%). ARIA program budgets per <em>aria.org.uk</em> opportunity-space announcements; total deployment
        depends on contract awards.
      </p>
    </section>
  );
}

function BpcNote() {
  return (
    <div className="mt-10 grid gap-8 border-t border-ink pt-8 md:grid-cols-[260px_1fr] md:gap-12">
      <div>
        <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
          THE INDIRECT PATH
        </div>
        <h3 className="font-sans text-[26px] font-medium leading-[1.05] tracking-[-0.015em]">
          How institutional capital <em className="not-italic font-light text-ink-mute">actually</em> reaches founders.
        </h3>
      </div>
      <div className="flex flex-col gap-3.5 text-[14px] leading-[1.6] text-ink-mute">
        <p>
          <strong className="font-medium text-ink">British Patient Capital</strong> (a BBB subsidiary) and the wider
          British Business Bank don&rsquo;t write cheques to founders. They commit to and co-invest alongside UK
          venture and growth-equity managers — Balderton, Northzone, Octopus, Plural and others in the atlas above —
          who then back companies on their normal terms. The BPC stamp is what makes those funds bigger and more
          patient than they would otherwise be.
        </p>
        <p>
          The <strong className="font-medium text-ink">Mansion House Accord (2023)</strong> and{' '}
          <strong className="font-medium text-ink">Mansion House Compact (2024–25)</strong> extend the same logic to
          UK pension capital: DC schemes have publicly committed a share of assets to UK private markets, routed via
          fund managers (including the British Growth Partnership) rather than directly. Founders don&rsquo;t apply to
          Mansion House — they raise from a fund that has Mansion House money inside it.
        </p>
        <p>
          <strong className="font-medium text-ink">Practical implication for founders:</strong> when a UK VC tells you
          its LP base includes BBB / BPC / Mansion House signatories, that&rsquo;s typically a positive signal on fund
          stability and follow-on capacity — not a separate channel you can apply to.
        </p>
      </div>
    </div>
  );
}
