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

// ---------------------------------------------------------------------------
// Scheme — a single funding scheme (public or private)
// ---------------------------------------------------------------------------
export interface Scheme {
  /** Display name */
  name: string;
  /** Administering body or fund manager */
  body: string;
  /** Human-readable amount label (e.g. "£25K–£500K" or "~16.2% effective") */
  amountLabel: string;
  /** Numeric amount ceiling for sorting (in GBP). Use 0 for non-monetary. */
  amountCeiling: number;
  /** Short tag shown under the name (e.g. "Grant · National") */
  tag: string;
  /** Instrument type — used for filtering */
  type: SchemeType;
  /** Stages this scheme is relevant to */
  stages: Stage[];
  /** Sectors this scheme targets */
  sectors: SectorId[];
  /** Raise bands this scheme fits */
  amounts: AmountBand[];
  /** Deadline display string (e.g. "14 May 2026", "Rolling", "Evergreen") */
  deadline: string;
  /** Deadline as ISO date string for sorting. null = evergreen/rolling. */
  deadlineDate: string | null;
  /** Official URL — links to the scheme's own page */
  url?: string;
}

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
