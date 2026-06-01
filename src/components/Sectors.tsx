import { sectors } from '@/data';

export default function Sectors() {
  return (
    <section id="sectors" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          Where the <em>policy money</em> is, <span className="block">by sector.</span>
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          UK industrial strategy concentrates non-dilutive capital into a handful of frontier areas. These are the six
          with the most distinct, named funding pathways.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector) => (
          <article
            key={sector.number}
            className="hover-glow relative flex min-h-[320px] flex-col overflow-hidden bg-bg p-8 transition-colors hover:bg-bg-paper"
          >
            <header className="mb-7 flex items-start justify-between">
              <span className="font-mono text-[11px] tracking-[0.15em] text-ink-mute">{sector.number}</span>
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center border border-line-strong font-mono text-sm text-accent"
              >
                {sector.icon}
              </span>
            </header>

            {sector.isPriority ? (
              <span className="absolute right-[70px] top-8 font-mono text-[10px] tracking-[0.12em] text-accent">
                PRIORITY
              </span>
            ) : null}

            <h3 className="relative z-[2] mb-3 font-sans text-[24px] font-medium leading-[1.05] tracking-[-0.01em]">
              {sector.name}
            </h3>
            <p className="relative z-[2] mb-6 flex-1 text-[14px] leading-[1.5] text-ink-mute">{sector.description}</p>

            <div className="relative z-[2] grid grid-cols-2 gap-4 border-t border-line pt-5">
              <div>
                <div className="mb-1 font-mono text-[16px] tabular-nums text-ink">{sector.rangeLabel}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">Typical Range</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[16px] tabular-nums text-ink">{sector.leadFunders}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">Lead Funders</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
