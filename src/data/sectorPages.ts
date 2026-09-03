import type { SectorId } from './types';

/**
 * The six sectors that get their own page.
 *
 * Kept separate from sectors.ts on purpose. That file drives the homepage
 * cards, where Healthtech and Medtech are shown as two cards sharing the
 * 'health' id, and where climate has no card at all. Pages need exactly one
 * entry per SectorId, and an SEO-shaped slug that does not have to match the id.
 */
export interface SectorPage {
  id: SectorId;
  slug: string;
  /** Used in the H1: "{title} funding in the UK" */
  title: string;
  /** 100-150 words of editorial. Shown under the H1. */
  intro: string;
  leadFunders: string;
}

export const sectorPages: SectorPage[] = [
  {
    id: 'ai',
    slug: 'ai',
    title: 'AI',
    leadFunders: 'UKRI · ARIA',
    intro:
      'British AI funding splits along a fault line. Frontier research money flows through ARIA and UKRI to labs and universities, on timescales measured in years. Applied money, the kind most founders need, comes through Innovate UK BridgeAI and a dense private layer of specialist investors. Air Street and Plural write the early cheques. The practical consequence for a founder is that your first application should almost never be to a frontier programme. Grant assessors reading an applied AI proposal want to see the deployment path, the customer, and the data you already hold. Research ambition without a route to market is the single most common reason these applications come back rejected.',
  },
  {
    id: 'health',
    slug: 'healthtech',
    title: 'Healthtech and medtech',
    leadFunders: 'NIHR · Innovate UK · MRC',
    intro:
      'Health funding in the UK is unusually deep and unusually slow. NIHR i4i, SBRI Healthcare and the Biomedical Catalyst between them cover everything from a first prototype to late-stage clinical trials, with grants running well past £10m at the top end. The trade-off is time. Assessment cycles are long, and almost every programme expects evidence of clinical engagement before it will fund you. Founders who approach health grants like software grants tend to lose a year. Line up an NHS trust or a clinical lead early, because most of these schemes treat that relationship as a gate rather than a bonus.',
  },
  {
    id: 'space',
    slug: 'space',
    title: 'Space',
    leadFunders: 'UKSA · ESA',
    intro:
      'The UK Space Agency funds both halves of the sector. Upstream money goes to launch, satellites and propulsion. Downstream money, which is where most new companies now start, goes to businesses building on satellite data. ESA BIC UK adds incubation on top, and UKI2S puts seed equity into spin-outs that are too early for conventional venture. Space applications are judged on national capability as much as commercial return, so a proposal that explains what Britain gains from the technology existing here will read better than one that only models revenue.',
  },
  {
    id: 'robotics',
    slug: 'robotics',
    title: 'Robotics and automation',
    leadFunders: 'Innovate UK · ARIA',
    intro:
      'Robotics money in Britain is concentrated in manufacturing productivity. Made Smarter Innovation is the largest single route, and it funds adoption as readily as invention, which catches founders out. ARIA runs the more speculative end through its Smarter Robot Bodies and Robot Dexterity programmes, where the bar is a genuine research bet rather than a product. Between the two sits a thin private layer. Assessors on the Innovate UK side want a named industrial partner and a site where the technology will actually run. A robotics proposal with no deployment partner rarely survives the first sift.',
  },
  {
    id: 'climate',
    slug: 'climate',
    title: 'Climate and energy',
    leadFunders: 'DESNZ · Innovate UK · NWF',
    intro:
      'Climate is the best-funded part of the British innovation system and the most fragmented. DESNZ runs the large demonstration programmes, Innovate UK handles earlier-stage grants, Ofgem funds network innovation, and the National Wealth Fund sits above all of it writing much larger cheques for infrastructure. Agritech and the circular economy have their own routes through Defra. The fragmentation is the difficulty. Two schemes can fund adjacent work with completely different eligibility rules and cost models, so read the specific competition scope rather than assuming a family of schemes behaves consistently.',
  },
  {
    id: 'defence',
    slug: 'defence',
    title: 'Defence and dual-use',
    leadFunders: 'MOD/UKDI · NSSIF',
    intro:
      'UK Defence Innovation, which absorbed DASA, is the main door into MOD money, and it funds early work at TRL 2 to 6 in autonomy, counter-UAS, security and aviation. Contracts are small at first and deliberately so, because the programme is designed to buy down technical risk before anything scales. NSSIF supplies the equity side for defence-adjacent companies. Dual-use founders should know that civilian framing does not help here. These competitions are written against a stated military capability gap, and proposals that do not name the gap they close tend to be filtered out early.',
  },
];

export function getSectorPage(slug: string): SectorPage | undefined {
  return sectorPages.find((s) => s.slug === slug);
}
