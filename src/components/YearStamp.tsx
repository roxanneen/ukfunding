'use client';

import { useEffect, useState } from 'react';

/**
 * Renders the current year, refreshing on the client after hydration.
 * This way the © line stays correct on static deploys that don't get
 * rebuilt at year-end. Initial server render uses the build-time year;
 * client hydration replaces it with the user's current year.
 */
export default function YearStamp() {
  const [year, setYear] = useState<number>(() => new Date().getFullYear());

  useEffect(() => {
    const browserYear = new Date().getFullYear();
    if (browserYear !== year) setYear(browserYear);
  }, [year]);

  return <span suppressHydrationWarning>{year}</span>;
}
