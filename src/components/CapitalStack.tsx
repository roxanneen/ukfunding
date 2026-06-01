import { capitalStack, stackAxisTicks } from '@/data';

export default function CapitalStack() {
  return (
    <section id="stack" className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          Reach <em>growth round</em> in 5 funded steps.
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          UK founders rarely fund a company in one transaction. They stack: a grant pays for the prototype, SEIS pays
          for the team, EIS pays for the seed, and growth equity follows the traction. Here&rsquo;s how it actually fits
          together.
        </p>
      </div>

      <div className="relative">
        <div className="relative hidden h-20 border-y border-line bg-bg-paper md:block">
          {stackAxisTicks.map((tick) => (
            <div
              key={tick.label}
              style={{ left: tick.left }}
              className="absolute inset-y-0 border-l border-dashed border-line px-2 pt-2 font-mono text-[10px] tracking-[0.05em] text-ink-mute"
            >
              {tick.label}
            </div>
          ))}
        </div>

        <div className="grid border-b border-line sm:grid-cols-2 lg:grid-cols-5">
          {capitalStack.map((stage, idx) => (
            <article
              key={stage.name}
              className={`border-line p-7 transition-colors hover:bg-bg-paper ${
                idx < capitalStack.length - 1 ? 'lg:border-r' : ''
              } sm:border-b lg:border-b-0`}
            >
              <div className="mb-3 font-mono text-[11px] tracking-[0.18em] text-accent">{stage.step}</div>
              <div className="mb-1.5 font-sans text-[20px] font-medium leading-[1.1] tracking-[-0.01em]">
                {stage.name}
              </div>
              <div className="mb-4 font-mono text-[12px] text-ink-mute tabular-nums">{stage.range}</div>
              <ul className="flex flex-col gap-1.5 text-[13px] text-ink">
                {stage.schemes.map((scheme) => (
                  <li key={scheme} className="flex items-start gap-1.5">
                    <span aria-hidden className="mt-1 text-[10px] text-accent">▸</span>
                    <span>{scheme}</span>
                  </li>
                ))}
              </ul>
              <div className="stage-bar" style={{ ['--stage-width' as string]: stage.barWidth }} />
            </article>
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-[720px] border-l-2 border-line-strong pl-5 text-[13px] leading-[1.55] text-ink-faint">
        Read horizontally. The bar widths show the upper bound of what&rsquo;s commonly raised at each step (log-scaled).
        Tax-relief schemes (SEIS/EIS) are stackable with grants and equity rounds, not alternatives to them.
      </p>
    </section>
  );
}
