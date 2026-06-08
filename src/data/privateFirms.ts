import type { PrivateFirm } from './types';

export const privateFirms: PrivateFirm[] = [
  // Lead VCs
  { name: 'Index Ventures', category: 'vc_lead', ticketLabel: '£3M–£50M', description: 'Pan-European, top-tier. Series A through growth.' },
  { name: 'Atomico', category: 'vc_lead', ticketLabel: '£5M–£25M', description: 'Founded by Niklas Zennström. European tech, Series A–C.' },
  { name: 'Balderton Capital', category: 'vc_lead', ticketLabel: '£1M–£20M', description: 'Seed through Series B. Long-standing London fund.' },
  { name: 'Accel London', category: 'vc_lead', ticketLabel: '£3M–£30M', description: 'Bay Area DNA, London office. Series A specialist.' },
  { name: 'Northzone', category: 'vc_lead', ticketLabel: '£3M–£25M', description: 'Nordic-UK fund. Backed Spotify, Klarna, Personio.' },
  { name: 'Dawn Capital', category: 'vc_lead', ticketLabel: '£5M–£25M', description: 'B2B SaaS specialist. Series A–B.' },

  // Seed & Early-Stage
  { name: 'LocalGlobe / Phoenix Court', category: 'vc_seed', ticketLabel: '£150K–£2M', description: 'Saul & Robin Klein. Top UK pre-seed/seed fund.' },
  { name: 'Hoxton Ventures', category: 'vc_seed', ticketLabel: '£500K–£3M', description: 'First-cheque specialists. Backed Deliveroo, Babylon.' },
  { name: 'Seedcamp', category: 'vc_seed', ticketLabel: '£100K–£500K', description: 'Pre-seed/seed. Strong founder community network.' },
  { name: 'Octopus Ventures', category: 'vc_seed', ticketLabel: '£1M–£10M', description: 'Seed–A across health, fintech, deeptech, B2B.' },
  { name: 'Plural Platform', category: 'vc_seed', ticketLabel: '€1M–€10M', description: 'Hogarth, Klein, Cossart, Khosrowshahi. Mission-led.' },
  { name: 'Air Street Capital', category: 'vc_seed', ticketLabel: '£150K–£1M', description: 'AI-first. Nathan Benaich. Pre-seed/seed.' },
  { name: 'Ada Ventures', category: 'vc_seed', ticketLabel: '£100K–£800K', description: 'Backs overlooked founders. Pre-seed.' },
  { name: 'Concept Ventures', category: 'vc_seed', ticketLabel: '£200K–£1M', description: "UK's largest dedicated pre-seed fund." },

  // Accelerators
  { name: 'Entrepreneur First', category: 'accelerator', ticketLabel: '£100K · 8%', description: '6-month talent programme. Pre-team founders.' },
  { name: 'Y Combinator', category: 'accelerator', ticketLabel: '$500K · 7%', description: 'Quarterly batches. UK companies eligible.' },
  { name: 'Antler London', category: 'accelerator', ticketLabel: '£85K · 8%', description: 'Pre-team to incorporation in 6 months.' },
  { name: 'Techstars London', category: 'accelerator', ticketLabel: '$120K · 6%', description: '13-week intensive. Mentor-driven.' },
  { name: 'Founders Factory', category: 'accelerator', ticketLabel: '£30K–£250K', description: '6-month, corporate-backed verticals.' },
  { name: 'Conception X', category: 'accelerator', ticketLabel: 'Equity-free', description: '9-month deeptech programme for PhD founders.' },
  { name: 'Zinc VC', category: 'accelerator', ticketLabel: '£20K + 4%', description: 'Mission-led. Health, ageing, climate.' },
  { name: 'Deep Science Ventures', category: 'accelerator', ticketLabel: 'Venture-build', description: 'Forms PhD-level deeptech ventures problem-up.' },

  // Angels & Crowd
  { name: 'UK Business Angels Assoc.', category: 'angel_crowd', ticketLabel: 'Trade body', description: 'UKBAA — umbrella for ~17,000 active UK angels.' },
  { name: 'Cambridge Angels', category: 'angel_crowd', ticketLabel: '£50K–£1M', description: 'Cambridge cluster. Deeptech and health weighted.' },
  { name: 'London Business Angels', category: 'angel_crowd', ticketLabel: '£100K–£500K', description: 'LBA. Pan-sector. Monthly investor evenings.' },
  { name: 'Angel CoFund', category: 'angel_crowd', ticketLabel: '£100K–£1M', description: 'BBB-backed co-invest with angel-led syndicates.' },
  { name: 'Crowdcube', category: 'angel_crowd', ticketLabel: '£150K–£5M+', description: 'Equity crowdfunding. SEIS/EIS eligible.' },
  { name: 'Republic Europe (Seedrs)', category: 'angel_crowd', ticketLabel: '£150K–£10M', description: 'Equity crowdfunding. Now part of Republic.' },
  { name: 'SyndicateRoom', category: 'angel_crowd', ticketLabel: '£25K min', description: 'Tax-efficient angel co-invest fund.' },
  { name: 'Envestors', category: 'angel_crowd', ticketLabel: '£100K–£2M', description: 'FCA-authorised investor network platform.' },
];
