import { ariaPrograms, privateFirms, regions, schemes, sectors } from '@/data';

// Static at build time so it works on Vercel and in static export alike.
export const dynamic = 'force-static';

const SITE = 'https://ukfunding.io';

/**
 * /llms.txt — an emerging convention (like robots.txt, but for LLMs).
 * Gives AI assistants and crawlers a clean, accurate, link-rich summary of the
 * site so generated answers cite the right pages and data. Counts are derived
 * from the data layer, so this never drifts from what the site actually shows.
 */
export function GET() {
  const body = `# ukfunding.io — Every pound, mapped.

> An independent editorial atlas of UK startup funding — public schemes, private capital, ARIA programmes, and tax relief in one place. No vendors, no affiliate links. Editorial only; not financial advice.

ukfunding.io maps the capital infrastructure available to UK startups: ${schemes.length} funding schemes across grants, equity, ARIA programmes, accelerators, loans and R&D tax relief — public and private — sorted by stage, sector and UK region. Published by IP3 Studio Ltd, London, UK.

## Tools
- [Funding matchmaker](${SITE}/#matchmaker): three questions (stage, sector, amount) return a shortlist of schemes a founder may qualify for.
- [Capital stack](${SITE}/#stack): how UK founders stack grants, SEIS/EIS and equity from idea to growth round.
- [R&D tax-credit calculator](${SITE}/#calculator): indicative HMRC merged-scheme / ERIS estimate (post-April 2024 rates).
- [Live opportunities](${SITE}/#opportunities): a sortable, filterable list of currently open schemes, with closed schemes archived.

## Coverage
- ${schemes.length} funding schemes (public + private)
- ${regions.length} UK regions, including the devolved nations
- ${sectors.length} priority sectors (AI, robotics, healthtech, medtech, space, defence)
- ${privateFirms.length} VCs, accelerators, angel networks & crowdfunding platforms
- ${ariaPrograms.length} ARIA opportunity spaces

## Primary sources
- gov.uk/business-finance-support — central funding index
- ukri.org — Innovate UK / UKRI live calls
- aria.org.uk — ARIA opportunity spaces
- british-business-bank.co.uk — equity & debt programmes
- HMRC R&D tax relief guidance

## Legal
- [Legal & disclaimer](${SITE}/legal): not financial, investment, tax or legal advice; not FCA-regulated; UK GDPR. Operated by IP3 Studio Ltd (company no. 14930883), 112 Morden Road, London SW19 3BP.
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, must-revalidate',
    },
  });
}
