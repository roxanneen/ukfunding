# ukfunding.io

An independent, editorial atlas of UK startup funding — public schemes, private capital, ARIA programmes, and tax relief. Built for founders, not consultants.

## What This Is

A single-page reference site that maps the full capital infrastructure available to UK startups. Every grant, equity scheme, accelerator, VC, loan, and tax credit — sorted by stage, sector, and geography.

No vendors. No affiliate links. No pay-to-list. No login wall.

## Why It Exists

UK startup funding is fragmented across dozens of bodies (UKRI, BBB, HMRC, UKSA, devolved agencies, 40+ VCs, angel networks, crowdfunding platforms, ARIA). The information exists but is scattered across PDFs, gov.uk pages, and fund websites. This site puts it in one place with enough structure to be useful.

## Sections

| # | Section | Purpose | Interactive? |
|---|---------|---------|-------------|
| 1 | Hero | Headline stats, positioning | Counter animation |
| 2 | Insights | Three data-backed observations | No |
| 3 | Matchmaker | 3-question quiz → shortlist of matching schemes | Yes — quiz + live results |
| 4 | Capital Stack | 5-stage funding journey (Idea → Series B+) | Hover highlight |
| 5 | Sectors | 6 vertical funding categories | Hover cards |
| 6 | Regions | Interactive UK map → region-specific schemes | Yes — clickable SVG map |
| 7 | Private Capital | Directory of VCs, accelerators, angels, crowd | 4-column atlas |
| 7a | ARIA Spotlight | Dedicated panel for ARIA programmes | Static |
| 8 | Live Opportunities | Sortable/filterable table of open schemes | Yes — sort, filter by type |
| 9 | R&D Calculator | Back-of-envelope R&D tax credit estimator | Yes — live calc |
| 10 | Newsletter | Email signup | Form validation |

## Data Sources

All funding information sourced from official or primary sources:

- [Gov.uk Business Finance Support](https://www.gov.uk/business-finance-support)
- [UK Research & Innovation (UKRI)](https://www.ukri.org/)
- [British Business Bank](https://www.british-business-bank.co.uk/)
- [HMRC R&D Tax Credits](https://www.gov.uk/government/organisations/hm-revenue-customs)
- [UK Space Agency](https://www.gov.uk/government/organisations/uk-space-agency)
- [ARIA](https://www.aria.org.uk/)
- Individual fund/VC websites for private capital data

## Tech Stack

- **Next.js 14+** (App Router, static export)
- **TypeScript** (strict)
- **Tailwind CSS** (custom design tokens, monochrome palette)
- **Roboto + Roboto Mono** (Google Fonts via next/font)
- **Vercel** (deployment target)

## Project Structure

```
ukfunding-io/
├── CLAUDE.md              # Claude Code project instructions
├── ROADMAP.md             # Build task list with priorities
├── README.md              # This file
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── reference/
│   └── prototype.html     # Working HTML prototype (single-file)
├── docs/
│   └── DATA_SOURCES.md    # Source documentation per scheme
├── public/
│   └── (favicons, OG images)
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout (fonts, theme, metadata)
│   │   ├── page.tsx       # Home page (assembles all sections)
│   │   └── globals.css    # CSS custom properties, base styles
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Ticker.tsx
│   │   ├── Hero.tsx
│   │   ├── Insights.tsx
│   │   ├── FundingMatchmaker.tsx
│   │   ├── CapitalStack.tsx
│   │   ├── Sectors.tsx
│   │   ├── RegionMap.tsx
│   │   ├── PrivateCapital.tsx
│   │   ├── AriaSpotlight.tsx
│   │   ├── OpportunitiesTable.tsx
│   │   ├── RdCalculator.tsx
│   │   ├── Newsletter.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   ├── types.ts       # All TypeScript interfaces
│   │   ├── schemes.ts     # 48 funding schemes (public + private)
│   │   ├── regions.ts     # 9 UK regions with local schemes
│   │   ├── sectors.ts     # 6 sector verticals
│   │   ├── ariaPrograms.ts # 8 ARIA opportunity spaces
│   │   ├── privateFirms.ts # VCs, accelerators, angels, crowd
│   │   └── ticker.ts      # Ticker feed items
│   ├── lib/
│   │   ├── format.ts      # Currency/number formatting
│   │   ├── matchmaker.ts  # Matchmaker filtering logic
│   │   └── calculator.ts  # R&D credit calculation logic
│   └── styles/
│       └── tokens.ts      # Design token exports (if needed in JS)
```

## Design Principles

1. **Density over decoration** — pack real information, not ambient effects
2. **Monochrome** — ink, paper, grey. Weight and spacing do the hierarchy work
3. **Sans-serif only** — Roboto for everything, Roboto Mono for data
4. **No italic** — use font-weight 300 (light) for emphasis, 500 (medium) for headlines
5. **Translucent interaction** — hover/active states use ink at low opacity, not color shifts
6. **Border, not shadow** — 1px solid lines define every boundary
7. **Editorial rigour** — every number cites a source, every scheme links to the official page

## Running Locally

```bash
git clone <repo>
cd ukfunding-io
npm install
npm run dev
```

## Licence

Content and data: CC BY-SA 4.0
Code: MIT
