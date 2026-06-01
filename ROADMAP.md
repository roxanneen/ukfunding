# ROADMAP.md — Build Plan

## Phase 1: Scaffold (do first)
Priority: get the app running with real data rendered statically.

- [ ] `npm create next-app` with TypeScript + Tailwind + App Router
- [ ] Configure `next.config.ts` for static export (`output: 'export'`)
- [ ] Set up `globals.css` with CSS custom properties (dark/light tokens)
- [ ] Set up fonts via `next/font/google` (Roboto 300–600, Roboto Mono 300–600)
- [ ] Build root `layout.tsx` (html data-theme attribute, font classes, metadata)
- [ ] Build `ThemeToggle.tsx` (persist to localStorage)
- [ ] Build `Header.tsx` (sticky, backdrop-blur, nav links, brand, theme toggle)
- [ ] Build `Footer.tsx` (4-column grid, source links, copyright)
- [ ] Verify dark/light toggle works end-to-end

## Phase 2: Static Sections (content-heavy, no interactivity)
Priority: get the informational backbone rendered.

- [ ] Build `Hero.tsx` (headline, deck, stats sidebar, CTA buttons)
  - [ ] Add counter animation on scroll intersection
- [ ] Build `Ticker.tsx` (horizontal scroll ticker, CSS animation, slow speed)
- [ ] Build `Insights.tsx` (3-column stat cards with methodology note)
- [ ] Build `CapitalStack.tsx` (5-stage grid with scheme lists, stage bars)
- [ ] Build `Sectors.tsx` (6-card grid with stats, hover treatment)
- [ ] Build `PrivateCapital.tsx` (4-column atlas from `privateFirms.ts`)
- [ ] Build `AriaSpotlight.tsx` (large mark, programme grid, body text)
- [ ] Build `Newsletter.tsx` (email form, validation, success state)
- [ ] Assemble all in `page.tsx` and verify full-page scroll

## Phase 3: Interactive Sections (client components with state)
Priority: the features that make this site worth bookmarking.

- [ ] Build `FundingMatchmaker.tsx`
  - [ ] 3-step quiz (stage → sector → amount)
  - [ ] Progress bar and back/reset navigation
  - [ ] Live results panel filtering from `schemes.ts`
  - [ ] Results count and empty state
  - [ ] Extract filtering logic to `src/lib/matchmaker.ts`
- [ ] Build `RegionMap.tsx`
  - [ ] Inline SVG map of UK (9 regions)
  - [ ] Click handler → translucent active fill
  - [ ] Info panel updates with region data from `regions.ts`
  - [ ] Default state (no region selected) with national schemes
- [ ] Build `OpportunitiesTable.tsx`
  - [ ] Sortable columns (name, type, amount, stage, deadline)
  - [ ] Filter buttons (All, Grants, Equity, Accelerators, Loans, Tax)
  - [ ] Type tags with typographic differentiation (filled, outlined, dashed, underlined)
  - [ ] Deadline urgency (bold for <30 days, muted for evergreen)
  - [ ] Data from `schemes.ts` filtered to those with deadlines
- [ ] Build `RdCalculator.tsx`
  - [ ] Inputs: qualifying expenditure (formatted), P/L toggle, scheme toggle
  - [ ] Live output: net benefit, effective rate, breakdown
  - [ ] Extract calc logic to `src/lib/calculator.ts`
  - [ ] Three regimes: merged (profit), merged (loss), ERIS (R&D-intensive loss), RDEC (large)

## Phase 4: Polish & Ship
- [ ] SEO: page title, description, OG image, structured data (Organization, WebSite)
- [ ] Favicon set (dark/light variants)
- [ ] `robots.txt` and `sitemap.xml` (via next-sitemap or manual)
- [ ] Performance: check Lighthouse, lazy-load below-fold sections
- [ ] Accessibility: keyboard navigation on matchmaker/map/table, aria-labels, focus rings
- [ ] Responsive QA: test 375px, 768px, 1024px, 1440px breakpoints
- [ ] Vercel project setup + custom domain (ukfunding.io)
- [ ] Analytics (Plausible or Vercel Analytics — no Google Analytics)

## Phase 5: Content Expansion (post-launch)
- [ ] Per-scheme detail pages with full eligibility criteria, links, deadlines
- [ ] Per-region detail pages with local ecosystem context
- [ ] ARIA programme tracker (status updates as contracts are awarded)
- [ ] Newsletter backend (Buttondown, Loops, or Resend integration)
- [ ] Quarterly data refresh process (document in `docs/DATA_SOURCES.md`)
- [ ] "Compare two schemes" side-by-side tool
- [ ] RSS/JSON feed of scheme deadline changes
- [ ] Contributor guide for community data updates

## Notes
- The reference prototype (`reference/prototype.html`) is the visual/UX spec. Match its layout and behaviour.
- All data is in `src/data/`. When adding schemes, add to the typed arrays — the matchmaker, table, and region panels all read from the same source.
- The R&D calculator rates are per HMRC rules from 1 April 2024. Document any rate changes in `docs/DATA_SOURCES.md`.
