import type { MetadataRoute } from 'next';
import { regions } from '@/data/regions';
import { sectorPages } from '@/data/sectorPages';
import { publishableSchemes } from '@/lib/schemes';

const BASE = 'https://ukfunding.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const schemeEntries: MetadataRoute.Sitemap = publishableSchemes().map((s) => ({
    url: `${BASE}/funding/${s.slug}`,
    lastModified: new Date(s.lastVerified),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const sectorEntries: MetadataRoute.Sitemap = sectorPages.map((s) => ({
    url: `${BASE}/sector/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const regionEntries: MetadataRoute.Sitemap = regions.map((r) => ({
    url: `${BASE}/region/${r.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/deadlines`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...sectorEntries,
    ...regionEntries,
    ...schemeEntries,
    { url: `${BASE}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
