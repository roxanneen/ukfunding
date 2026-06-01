# CLAUDE.md — Project Instructions for Claude Code

## Project
**ukfunding.io** — An editorial atlas of UK startup funding (public schemes, private capital, ARIA, tax relief). Monochrome, dense, interactive. Hosted at ukfunding.io.

## Tech Stack
- **Framework**: Next.js 14+ (App Router, SSG where possible)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4+ with custom design tokens
- **Fonts**: Roboto (sans) + Roboto Mono (data/labels) via `next/font/google`
- **Deployment**: Vercel (target)
- **Data**: Static TypeScript files in `src/data/` — no CMS yet, no database

## Architecture Decisions
- All funding data lives in `src/data/` as typed TS exports. This is the single source of truth.
- Components are in `src/components/` grouped by section (hero, matchmaker, stack, sectors, regions, private, opportunities, calculator, newsletter).
- The site is a single-page app with anchor navigation. No multi-page routing needed yet.
- Dark/light theme via CSS custom properties toggled on `<html data-theme="dark|light">`.
- No client-side fetching. All data is imported statically and rendered at build time.
- Interactive elements (matchmaker quiz, calculator, table sort/filter, region map) use React state — no external state management.

## Design System
- **Palette**: Pure monochrome. Ink, paper, three greys. No colour accents.
  - Dark: `--bg: #0a0a0a`, `--ink: #f5f3ec`, `--ink-mute: #8a8884`, `--ink-faint: #565452`
  - Light: `--bg: #f7f5ed`, `--ink: #0c0c0c`, `--ink-mute: #5e5b52`, `--ink-faint: #918d82`
- **Typography**: Roboto 300–600 for hierarchy (500 display, 400 body, 300 light emphasis). Roboto Mono for labels, data, amounts.
- **Spacing**: 8px grid. Sections padded 80–96px vertical, 32px horizontal.
- **Borders**: 1px solid lines, no shadows, no border-radius anywhere.
- **Interaction**: Translucent hover states (ink at 12–25% opacity via color-mix). Button hover inverts fill/stroke.

## Key Data Types
See `src/data/types.ts` for full definitions. Core:
- `Scheme` — a funding scheme (public or private) with name, type, stages, sectors, amounts, deadline
- `Region` — a UK region with name, stats, and region-specific schemes
- `Sector` — a vertical (AI, Health, Space, etc.) with range, lead funders
- `AriaProgram` — an ARIA opportunity space with name, budget, duration

## File Conventions
- Components: PascalCase (`FundingMatchmaker.tsx`)
- Data files: camelCase (`schemes.ts`, `regions.ts`)
- Types: PascalCase, exported from `src/data/types.ts`
- Utility functions: `src/lib/` (e.g. `src/lib/format.ts` for currency formatting)

## Commands
```bash
npm run dev      # Local dev server
npm run build    # Production build (SSG)
npm run lint     # ESLint
npm run typecheck # tsc --noEmit
```

## What's Built vs What's Needed
See `ROADMAP.md` for the full task list. Summary:
- ✅ Design system defined (tokens, typography, spacing)
- ✅ All seed data typed and populated (48 schemes, 9 regions, 6 sectors, 8 ARIA programs, 30+ private firms)
- ✅ Reference HTML prototype at `reference/prototype.html`
- 🔲 Next.js app scaffold
- 🔲 All section components
- 🔲 Matchmaker interactive logic
- 🔲 R&D calculator
- 🔲 Sortable/filterable opportunities table
- 🔲 Interactive UK regions map (SVG)
- 🔲 Dark/light toggle
- 🔲 Newsletter form (connect to provider)
- 🔲 SEO metadata, OG images
- 🔲 Vercel deployment config

## Non-Goals (for now)
- No CMS / admin panel
- No user accounts or auth
- No backend API
- No real-time data feeds
- No analytics (add later)
- No affiliate links, ever
