import type { MetadataRoute } from 'next';

const BASE = 'https://ukfunding.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
