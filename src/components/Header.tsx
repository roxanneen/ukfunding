import ThemeToggle from './ThemeToggle';

// Hrefs are absolute (`/#section`) so they work both from the home page
// (in-page scroll) AND from sub-pages like /legal (navigate-then-scroll).
const navLinks = [
  { href: '/#matchmaker', label: 'Match' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#sectors', label: 'Sectors' },
  { href: '/#regions', label: 'Regions' },
  { href: '/#private', label: 'Private' },
  { href: '/#opportunities', label: 'Live' },
  { href: '/#calculator', label: 'R&D Credit' },
];

export default function Header() {
  return (
    <header className="border-b border-line bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-3.5 md:px-8">
        <a href="/" className="flex items-center gap-3 font-mono text-[13px] font-medium tracking-[0.02em] text-ink">
          <BrandMark />
          <span className="flex flex-col leading-[1.1]">
            <span>
              ukfunding<span className="text-ink-mute">.io</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-ink-mute">AN ATLAS OF BRITISH FUNDING</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm border border-transparent px-3 py-1.5 font-mono text-[13px] font-medium tracking-[0.02em] text-ink transition-colors hover:border-line-strong hover:bg-bg-paper hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <span className="relative grid h-7 w-7 place-items-center border-[1.5px] border-ink">
      <span aria-hidden className="absolute h-2 w-2 bg-ink" />
      <span aria-hidden className="absolute inset-1 border border-ink opacity-40" />
    </span>
  );
}
