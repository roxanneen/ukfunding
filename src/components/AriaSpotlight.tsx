import { ariaPrograms } from '@/data';

export default function AriaSpotlight() {
  return (
    <div className="aria-ribbon mt-10 grid items-start gap-8 border border-ink bg-bg-paper p-6 sm:gap-10 sm:p-10 md:grid-cols-[1fr_1.5fr] md:gap-16 md:p-12">
      <div>
        <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
          STATE-BACKED · FRONTIER R&amp;D
        </div>
        <div className="section-em mb-4 font-sans text-[clamp(64px,8vw,104px)] font-bold leading-[0.95] tracking-[-0.045em] text-ink">
          <em>ARIA</em>
        </div>
        <p className="max-w-[340px] font-sans text-[17px] leading-[1.4] text-ink">
          The British DARPA. £800m+ over five years on high-risk, high-reward science.
        </p>
      </div>

      <div>
        <p className="mb-3.5 text-[14px] leading-[1.6] text-ink-mute">
          <strong className="font-medium text-ink">Advanced Research + Invention Agency.</strong> Spun out of UKRI in
          2023, ARIA backs frontier research that traditional grant bodies won&rsquo;t touch. Programmes are problem-led,
          multi-year, and cross-institutional — funding small teams of researchers in adjacent fields towards a single
          ambitious goal.
        </p>
        <p className="mb-3.5 text-[14px] leading-[1.6] text-ink-mute">
          Funding is structured as programme contracts, not grants. Eligibility is broad: universities, startups,
          individuals. Total deployable across opportunity spaces is currently{' '}
          <strong className="font-medium text-ink">£800m+ over the parliament term</strong>, with individual programmes
          ranging from <strong className="font-medium text-ink">£15M to £80M</strong> over multi-year periods.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {ariaPrograms.map((p) => (
            <div key={p.name} className="bg-bg px-4 py-3.5">
              <div className="mb-1 text-[13px] font-medium">{p.name}</div>
              <div className="font-mono text-[11px] tracking-[0.02em] text-ink-mute">{p.budget}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
