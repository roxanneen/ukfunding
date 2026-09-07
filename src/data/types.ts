// src/data/types.ts — Core type definitions for ukfunding.io

/** Funding instrument type */
export type SchemeType = 'grant' | 'equity' | 'loan' | 'tax' | 'accelerator';

/** Company stage */
export type Stage = 'idea' | 'preseed' | 'seed' | 'seriesa';

/** Sector vertical */
export type SectorId = 'ai' | 'health' | 'space' | 'robotics' | 'climate' | 'defence' | 'other';

/** Raise band */
export type AmountBand = 'micro' | 'small' | 'mid' | 'large';

/** Region identifier (matches SVG data-region attributes) */
export type RegionId =
  | 'scotland'
  | 'ni'
  | 'north'
  | 'midlands'
  | 'wales'
  | 'east'
  | 'southwest'
  | 'southeast'
  | 'london';

/**
 * Where a scheme can be applied for. 'all' means UK-wide, and saves listing
 * every region on the ~60% of schemes that are national.
 */
export type RegionScope = 'all' | RegionId[];

// ---------------------------------------------------------------------------
// Scheme — a single funding scheme (public or private)
//
// One record, two layers:
//
//   Core      Powers the homepage matchmaker, opportunities table and region
//             map. Every scheme carries these.
//   Editorial Powers /funding/[slug]. Optional on purpose: a scheme without
//             hand-checked eligibility and rejection content must not get a
//             published page. See hasDetail() in src/lib/schemes.ts.
// ---------------------------------------------------------------------------
export interface Scheme {
  // --- identity ---
  /** Canonical slug. Drives /funding/[slug]. Lowercase, hyphenated, no dates. */
  slug: string;
  /** Display name */
  name: string;
  /** Administering body or fund manager */
  funder: string;

  // --- classification (drives filtering) ---
  /** Instrument type */
  type: SchemeType;
  /** Stages this scheme is relevant to */
  stages: Stage[];
  /** Normalised sectors. Drives the matchmaker and the six /sector pages. */
  sectors: SectorId[];
  /** Where it applies. Drives the nine /region pages. */
  regions: RegionScope;
  /** Raise bands this scheme fits */
  amounts: AmountBand[];
  /**
   * Richer free-text sector labels from the source data (healthtech, agritech,
   * games...). Shown as chips and used in page copy. `sectors` above stays the
   * normalised vocabulary so filtering has a fixed set to work against.
   */
  sectorTags: string[];

  // --- money ---
  /** Lower bound of the ticket, in GBP. 0 where not meaningful. */
  ticketMin: number;
  /** Upper bound of the ticket, in GBP. 0 where not meaningful. */
  ticketMax: number;
  /** Human-readable amount label (e.g. "£25K–£500K" or "~16.2% effective") */
  amountLabel: string;
  /** Numeric amount ceiling for sorting (in GBP). Use 0 for non-monetary. */
  amountCeiling: number;

  // --- deadline ---
  /** Deadline display string (e.g. "14 May 2026", "Rolling", "Evergreen") */
  deadline: string;
  /** Deadline as ISO date string for sorting. null = evergreen/rolling. */
  deadlineDate: string | null;

  // --- display ---
  /** Short tag shown under the name (e.g. "Grant · National") */
  tag: string;
  /** Official URL — links to the scheme's own page */
  officialUrl?: string;
  /**
   * Whether the scheme is actually taking applications. Absent means open.
   * A paused or closed scheme stays in the atlas, because people search for it
   * by name and deserve to learn it has stopped, but it is kept out of the
   * deadline tables and flagged wherever it is listed.
   */
  status?: 'paused' | 'closed';
  /** One line on why it is paused or closed. Shown next to the status. */
  statusNote?: string;

  // --- editorial layer (optional until hand-checked) ---
  /** e.g. "1 in 9 applications funded" */
  successRate?: string;
  /** Plain-English "can you apply?" bullets */
  eligibility?: string[];
  /** Numbered steps to apply */
  howToApply?: string[];
  /** Why applications get turned down. The editorial differentiator. */
  commonRejections?: string[];
  /** Slugs of related schemes, for internal linking */
  relatedSchemes?: string[];
  /** ISO date the figures were last checked against the official source */
  lastVerified?: string;
}

/** A scheme carrying enough checked editorial content to publish a page. */
export type SchemeWithDetail = Scheme &
  Required<Pick<Scheme, 'eligibility' | 'howToApply' | 'commonRejections' | 'lastVerified'>>;

// ---------------------------------------------------------------------------
// Region — a UK region with local funding context
// ---------------------------------------------------------------------------
export interface RegionScheme {
  name: string;
  description: string;
  amountLabel: string;
}

export interface Region {
  id: RegionId;
  /** Display name */
  name: string;
  /** UPPERCASE marker label for the info panel */
  marker: string;
  /** Headline stats [annual funding, active schemes count, lead body] */
  stats: [string, string, string];
  /** Region-specific schemes */
  schemes: RegionScheme[];
}

// ---------------------------------------------------------------------------
// Sector — a funding vertical
// ---------------------------------------------------------------------------
export interface Sector {
  id: SectorId;
  number: string;
  icon: string;
  name: string;
  description: string;
  rangeLabel: string;
  leadFunders: string;
  isPriority?: boolean;
}

// ---------------------------------------------------------------------------
// ARIA Programme
// ---------------------------------------------------------------------------
export interface AriaProgram {
  name: string;
  budget: string;
}

// ---------------------------------------------------------------------------
// Private firm (VC, accelerator, angel network, crowdfunding)
// ---------------------------------------------------------------------------
export type PrivateCategory = 'vc_lead' | 'vc_seed' | 'accelerator' | 'angel_crowd';

export interface PrivateFirm {
  name: string;
  category: PrivateCategory;
  ticketLabel: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Ticker item
// ---------------------------------------------------------------------------
export interface TickerItem {
  label: string;
  value: string;
  isUp: boolean;
}

// ---------------------------------------------------------------------------
// Insight stat (for the "What the data says" section)
// ---------------------------------------------------------------------------
export interface Insight {
  number: string;
  /** Small word between number and unit, e.g. "in" for "1 in 9". Optional. */
  infix?: string;
  unit: string;
  headline: string;
  body: string;
  source: string;
}

// ---------------------------------------------------------------------------
// Capital Stack stage
// ---------------------------------------------------------------------------
export interface StackStage {
  step: string;
  name: string;
  range: string;
  schemes: string[];
  barWidth: string;
}
