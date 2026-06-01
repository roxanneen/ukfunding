import YearStamp from './YearStamp';

// Absolute hrefs so the Sections column works from sub-pages too (e.g. /legal).
const sectionLinks = [
  { href: '/#matchmaker', label: 'Matchmaker' },
  { href: '/#stack', label: 'Capital Stack' },
  { href: '/#sectors', label: 'Sectors' },
  { href: '/#regions', label: 'Regions' },
  { href: '/#private', label: 'Private & ARIA' },
  { href: '/#opportunities', label: 'Live Schemes' },
  { href: '/#calculator', label: 'R&D Calculator' },
];

const sourceLinks = [
  { href: 'https://www.gov.uk/business-finance-support', label: 'Gov.uk Finance Hub' },
  { href: 'https://www.ukri.org/', label: 'UKRI / Innovate UK' },
  { href: 'https://www.aria.org.uk/', label: 'ARIA' },
  { href: 'https://www.british-business-bank.co.uk/', label: 'British Business Bank' },
  { href: 'https://www.gov.uk/government/organisations/hm-revenue-customs', label: 'HMRC R&D' },
  { href: 'https://www.gov.uk/government/organisations/uk-space-agency', label: 'UK Space Agency' },
];

const connectLinks: { href: string; label: string; external?: boolean; rel?: string }[] = [
  { href: 'https://x.com/ukfunding_io', label: 'X / Twitter', external: true, rel: 'me noopener' },
  { href: 'https://github.com/IP3-Studio/ukfunding', label: 'GitHub', external: true, rel: 'noopener' },
  { href: 'mailto:contact@ip3.studio', label: 'Contact us' },
  // LinkedIn, RSS — pending. Re-enable when set up.
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-8 pt-12 sm:grid-cols-3 md:gap-12 md:px-8 md:pb-8 md:pt-[60px]">
        <FooterCol title="Sections" links={sectionLinks} />
        <FooterCol title="Sources" links={sourceLinks} external />
        <FooterCol title="Connect" links={connectLinks} respectExternal />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-line px-5 py-5 font-mono text-[11px] tracking-[0.08em] text-ink-mute md:px-8 md:py-6">
        <div className="flex flex-wrap gap-x-2">
          <span>
            &copy; <YearStamp /> ukfunding.io
          </span>
          <span>
            &middot;{' '}
            <a
              href="/legal"
              className="text-ink transition-colors hover:text-ink-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Legal &amp; Disclaimer
            </a>
          </span>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <span>
            Built by{' '}
            <a
              href="https://x.com/ip3studio"
              target="_blank"
              rel="noopener"
              className="text-ink transition-colors hover:text-ink-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="IP3 Studio on X / Twitter"
            >
              IP3 Studio&nbsp;↗
            </a>
          </span>
          <span>&middot; v1.1.0</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external = false,
  respectExternal = false,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean; rel?: string }[];
  /** All links in this column open externally. */
  external?: boolean;
  /** Use each link's per-row `external` flag. */
  respectExternal?: boolean;
}) {
  return (
    <div>
      <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-mute">{title}</h5>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => {
          const isExternal = external || (respectExternal && link.external);
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={link.rel ?? (isExternal ? 'noopener' : undefined)}
                className="rounded-sm text-[14px] text-ink transition-colors hover:text-ink-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
                {isExternal ? ' ↗' : null}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
