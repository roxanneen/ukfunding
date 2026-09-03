// src/lib/schemes.ts — Scheme lookup, tag normalisation and derived fields.

import { schemes } from '@/data/schemes';
import type {
  AmountBand,
  RegionId,
  RegionScope,
  Scheme,
  SchemeWithDetail,
  SectorId,
} from '@/data/types';

/** Every region, in the order the map and the region pages use. */
export const ALL_REGIONS: RegionId[] = [
  'scotland',
  'ni',
  'north',
  'midlands',
  'wales',
  'east',
  'southwest',
  'southeast',
  'london',
];

/** The six sectors that get their own page. 'other' is a bucket, not a page. */
export const PAGE_SECTORS: SectorId[] = ['ai', 'health', 'space', 'robotics', 'climate', 'defence'];

/**
 * Source data uses a much richer sector vocabulary than the site filters on.
 * Map the free-text tags onto the fixed union so filtering and the /sector
 * pages have a stable set, while `sectorTags` keeps the original wording.
 */
const SECTOR_TAG_MAP: Record<string, SectorId> = {
  ai: 'ai',
  saas: 'other',
  tech: 'other',
  deeptech: 'other',
  robotics: 'robotics',
  space: 'space',
  maritime: 'other',
  defence: 'defence',
  health: 'health',
  healthtech: 'health',
  medtech: 'health',
  climate: 'climate',
  energy: 'climate',
  agritech: 'climate',
  manufacturing: 'other',
  creative: 'other',
  film: 'other',
  games: 'other',
  design: 'other',
  consumer: 'other',
  ecommerce: 'other',
  community: 'other',
  'social-enterprise': 'other',
};

/** Region naming differs between the source data and the map's region ids. */
const REGION_TAG_MAP: Record<string, RegionId> = {
  scotland: 'scotland',
  wales: 'wales',
  'northern-ireland': 'ni',
  ni: 'ni',
  north: 'north',
  midlands: 'midlands',
  east: 'east',
  'south-west': 'southwest',
  southwest: 'southwest',
  'south-east': 'southeast',
  southeast: 'southeast',
  london: 'london',
};

/** Normalise free-text sector tags onto the fixed union, deduped. */
export function normaliseSectorTags(tags: string[]): SectorId[] {
  if (tags.includes('all')) return [...PAGE_SECTORS, 'other'];
  const out = new Set<SectorId>();
  for (const t of tags) out.add(SECTOR_TAG_MAP[t.toLowerCase()] ?? 'other');
  return [...out];
}

/** Normalise free-text region tags onto the map's region ids. */
export function normaliseRegionTags(tags: string[]): RegionScope {
  if (tags.includes('all')) return 'all';
  const out = new Set<RegionId>();
  for (const t of tags) {
    const id = REGION_TAG_MAP[t.toLowerCase()];
    if (id) out.add(id);
  }
  return out.size ? [...out] : 'all';
}

/** Expand a region scope into concrete region ids. */
export function resolveRegions(scope: RegionScope): RegionId[] {
  return scope === 'all' ? ALL_REGIONS : scope;
}

/** Which raise bands a ticket range falls into. */
export function deriveAmountBands(min: number, max: number): AmountBand[] {
  const bands: AmountBand[] = [];
  const overlaps = (lo: number, hi: number) => min <= hi && max >= lo;
  if (overlaps(0, 50_000)) bands.push('micro');
  if (overlaps(50_001, 500_000)) bands.push('small');
  if (overlaps(500_001, 3_000_000)) bands.push('mid');
  if (overlaps(3_000_001, Number.MAX_SAFE_INTEGER)) bands.push('large');
  return bands.length ? bands : ['small'];
}

/** Compact GBP for labels: 25_000 becomes "£25K", 2_500_000 becomes "£2.5M". */
export function formatGbp(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `£${m % 1 === 0 ? m : m.toFixed(1)}M`;
  }
  if (n >= 1_000) return `£${Math.round(n / 1_000)}K`;
  return `£${n}`;
}

/** Ticket range as a display label. */
export function formatTicket(min: number, max: number): string {
  if (!min && !max) return 'Varies';
  if (!min) return `up to ${formatGbp(max)}`;
  if (!max || min === max) return formatGbp(min);
  return `${formatGbp(min)}–${formatGbp(max)}`;
}

/** True when a scheme has enough checked editorial content to publish a page. */
export function hasDetail(s: Scheme): s is SchemeWithDetail {
  return Boolean(
    s.eligibility?.length && s.howToApply?.length && s.commonRejections?.length && s.lastVerified
  );
}

/** Schemes that qualify for a /funding/[slug] page. */
export function publishableSchemes(): SchemeWithDetail[] {
  return schemes.filter(hasDetail);
}

export function getScheme(slug: string): Scheme | undefined {
  return schemes.find((s) => s.slug === slug);
}

export function schemesInSector(id: SectorId): Scheme[] {
  return schemes.filter((s) => s.sectors.includes(id));
}

export function schemesInRegion(id: RegionId): Scheme[] {
  return schemes.filter((s) => resolveRegions(s.regions).includes(id));
}
