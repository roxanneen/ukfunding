import type { StackStage } from './types';

export const capitalStack: StackStage[] = [
  {
    step: 'STEP 01 — VALIDATE',
    name: 'Idea & prototype',
    range: '£0 – £100K · grant + talent',
    schemes: [
      'Innovate UK Smart Grant (proof-of-concept)',
      'ICURe Programme · Conception X',
      'Entrepreneur First · Antler · YC',
      'University spin-out funds',
    ],
    barWidth: '18%',
  },
  {
    step: 'STEP 02 — INCORPORATE',
    name: 'Pre-seed',
    range: '£100K – £500K · SEIS + angels',
    schemes: [
      'SEIS round (50% income tax relief)',
      'Concept · Ada · Air Street · Seedcamp',
      'UKBAA & Cambridge Angels',
      'Start Up Loans (BBB) · ≤ £25K',
    ],
    barWidth: '32%',
  },
  {
    step: 'STEP 03 — BUILD',
    name: 'Seed',
    range: '£500K – £3M · EIS + seed VCs',
    schemes: [
      'EIS round (30% relief) + VCT',
      'LocalGlobe · Hoxton · Octopus · Plural',
      'Innovate UK Smart Grant (full)',
      'NPIF II · MEIF · Crowdcube · Seedrs',
    ],
    barWidth: '55%',
  },
  {
    step: 'STEP 04 — SCALE',
    name: 'Series A',
    range: '£3M – £15M · institutional VC',
    schemes: [
      'Balderton · Northzone · Dawn · Octopus',
      'British Patient Capital co-invest',
      'ARIA programme contracts (deeptech)',
      'Future Fund: Breakthrough · UKI2S',
    ],
    barWidth: '78%',
  },
  {
    step: 'STEP 05 — GROW',
    name: 'Series B+',
    range: '£15M – £50M+ · growth equity',
    schemes: [
      'Index · Atomico · Accel · Northzone',
      'Mansion House pension capital',
      'NSSIF (defence-adjacent)',
      'Pre-IPO syndicates · sovereign funds',
    ],
    barWidth: '100%',
  },
];

export const stackAxisTicks = [
  { left: '0%', label: '£0' },
  { left: '12%', label: '£100K' },
  { left: '28%', label: '£500K' },
  { left: '50%', label: '£2M' },
  { left: '72%', label: '£10M' },
  { left: '95%', label: '£50M+' },
];
