import { insights } from '@/data';

export default function Insights() {
  return (
    <section className="section-frame">
      <div className="mb-12 flex max-w-[780px] flex-col gap-4">
        <h2 className="section-em text-display font-medium">
          What the funding data <em>actually says</em>.
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[1.55] text-ink-mute">
          Three uncomfortable truths the launch announcements rarely make. Each links to a UK government source.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-6">
        {insights.map((insight) => (
          <article key={insight.source} className="border-t-2 border-ink py-8">
            <div className="mb-2 font-sans text-[64px] font-bold leading-none tracking-[-0.035em] text-ink tabular-nums">
              {insight.number}
              {insight.infix ? (
                <span className="mx-2 align-middle text-[28px] font-normal text-ink-mute">{insight.infix}</span>
              ) : (
                <span className="ml-1.5" />
              )}
              <span className="font-bold text-ink">{insight.unit}</span>
            </div>
            <h4 className="mb-3 font-sans text-[18px] font-medium leading-[1.25] tracking-[-0.01em]">
              {insight.headline}
            </h4>
            <p className="text-[14px] leading-[1.55] text-ink-mute">
              {insight.body}
              <sup className="ml-0.5 font-mono text-[10px] text-accent">{insight.source}</sup>
            </p>
          </article>
        ))}
      </div>

      <p className="mt-4 max-w-[720px] border-l-2 border-line-strong pl-5 text-[13px] leading-[1.55] text-ink-faint">
        <sup className="mr-0.5 font-mono text-[10px] text-ink-mute">1</sup>British Business Bank,{' '}
        <em>Small Business Equity Tracker 2025</em>. <sup className="mr-0.5 font-mono text-[10px] text-ink-mute">2</sup>
        HMRC, <em>R&amp;D Tax Credits Statistics 2024</em>.{' '}
        <sup className="mr-0.5 font-mono text-[10px] text-ink-mute">3</sup>UKRI,{' '}
        <em>Innovate UK Smart Grants Performance 2023–25</em>. Figures rounded; full sources listed in footer.
      </p>
    </section>
  );
}
