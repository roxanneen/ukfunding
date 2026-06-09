import { regions, schemes } from '@/data';

/**
 * "Updated MMM YYYY" — captured at build/render time. For static export this
 * freezes at `npm run build:static`; for Vercel dynamic it updates each
 * request (or each static-prerender pass).
 */
function lastUpdatedLabel(now = new Date()): string {
  const month = now.toLocaleString('en-GB', { month: 'short' }).toUpperCase(); // "MAY"
  return `LIVE · UPDATED ${month} ${now.getFullYear()}`;
}

export default function Hero() {
  // Data-derived so the numbers stay honest as the dataset grows.
  const schemeCount = schemes.length;
  const regionCount = regions.length;

  return (
    <section className="mx-auto grid max-w-[1440px] items-end gap-12 border-b border-line px-5 py-16 md:grid-cols-[1fr_380px] md:gap-20 md:px-8 md:pb-[60px] md:pt-20">
      <div>
        <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.2em] text-accent">
          Every pound, mapped.
        </p>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <span className="live-dot border border-line-strong px-3 py-[5px] font-mono text-[11px] tracking-[0.08em] text-ink-mute">
            {lastUpdatedLabel()}
          </span>
          <span className="border border-line-strong px-3 py-[5px] font-mono text-[11px] tracking-[0.08em] text-ink-mute">
            {schemeCount} SCHEMES TRACKED
          </span>
        </div>

        <h1 className="section-em mb-7 max-w-[860px] text-display-xl font-medium text-ink">
          The capital infrastructure of <em>British innovation</em>, mapped.
        </h1>

        <p className="mb-10 max-w-[620px] text-[19px] leading-[1.5] text-ink-mute">
          <strong className="font-medium text-ink">
            {schemeCount}+ schemes. {regionCount} regions. £2.8&thinsp;billion deployable this fiscal year.
          </strong>{' '}
          Every grant, equity scheme, ARIA programme, accelerator, VC, loan and tax credit available to UK founders —
          sorted by stage, sector and geography.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#matchmaker"
            className="group inline-flex items-center gap-2.5 border border-ink bg-ink px-[22px] py-3.5 font-mono text-[13px] tracking-[0.04em] text-bg transition-colors hover:bg-transparent hover:text-ink"
          >
            Find your match{' '}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#stack"
            className="inline-flex items-center gap-2.5 border border-ink bg-transparent px-[22px] py-3.5 font-mono text-[13px] tracking-[0.04em] text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            See the stack
          </a>
        </div>
      </div>

      <aside className="flex flex-col border-line md:border-l md:pl-8">
        <Stat value="£2.8" unit="B+" label="Deployable Capital · FY26" foot="across grants, equity & tax relief" />
        <Stat value={String(schemeCount)} label="Tracked Schemes" foot="public, private, ARIA & tax" />
        <Stat value={String(regionCount)} label="UK Regions Covered" foot="incl. devolved nations" />
      </aside>
    </section>
  );
}

function Stat({ value, unit, label, foot }: { value: string; unit?: string; label: string; foot: string }) {
  return (
    <div className="border-b border-line py-4 last:border-b-0">
      <div className="font-sans text-[40px] font-medium leading-none tracking-[-0.025em] text-ink tabular-nums">
        {value}
        {unit ? <span className="ml-1 font-medium text-ink">{unit}</span> : null}
      </div>
      <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">{label}</div>
      <div className="mt-1 text-[12px] text-ink-faint">{foot}</div>
    </div>
  );
}
