import type { Region } from './types';

export const regions: Region[] = [
  {
    id: 'scotland',
    name: 'Scotland',
    marker: 'SCOTLAND',
    stats: ['£420M', '23', 'SNIB'],
    schemes: [
      { name: 'Scottish EDGE', description: 'Equity-free competition · 4 rounds/yr', amountLabel: '≤ £150K' },
      { name: 'Scottish National Investment Bank', description: 'Mission-led equity & debt', amountLabel: '£1M–£50M' },
      { name: 'SMART: SCOTLAND', description: 'R&D grants for Scottish SMEs', amountLabel: '£25K–£600K' },
      { name: 'Techscaler', description: 'National accelerator network', amountLabel: 'Equity-free' },
    ],
  },
  {
    id: 'ni',
    name: 'Northern Ireland',
    marker: 'NORTHERN IRELAND',
    stats: ['£140M', '11', 'Invest NI'],
    schemes: [
      { name: 'Invest NI Innovation Vouchers', description: 'Knowledge transfer with universities', amountLabel: '≤ £5K' },
      { name: 'Co-Fund NI', description: 'Equity co-investment with angels', amountLabel: '£250K–£800K' },
      { name: 'TechStart NI', description: 'Pre-seed equity & proof-of-concept', amountLabel: '£25K–£250K' },
      { name: 'Invest NI R&D Grants', description: 'Industrial research support', amountLabel: 'Up to 50% of cost' },
    ],
  },
  {
    id: 'north',
    name: 'The North',
    marker: 'NORTHERN ENGLAND',
    stats: ['£660M', '34', 'NPIF II'],
    schemes: [
      { name: 'NPIF II', description: 'Northern Powerhouse Investment Fund · BBB', amountLabel: '£25K–£2M' },
      { name: 'Northern Gritstone', description: 'University spin-out fund (Manc/Leeds/Sheff)', amountLabel: '£1M–£10M' },
      { name: 'Praetura Ventures', description: 'Manchester-based pre-seed/seed', amountLabel: '£250K–£3M' },
      { name: 'Local growth grants', description: 'LEP-administered, varies by city-region', amountLabel: 'Varies' },
    ],
  },
  {
    id: 'midlands',
    name: 'The Midlands',
    marker: 'MIDLANDS',
    stats: ['£380M', '19', 'MEIF II'],
    schemes: [
      { name: 'MEIF II', description: 'Midlands Engine Investment Fund · BBB', amountLabel: '£25K–£2M' },
      { name: 'Mercia Asset Management', description: 'Regional VC across Midlands', amountLabel: '£500K–£10M' },
      { name: 'D2N2 Growth Hub grants', description: 'Derbyshire/Nottinghamshire SMEs', amountLabel: 'Varies' },
      { name: 'WMCA Innovation Fund', description: 'West Midlands Combined Authority', amountLabel: 'Varies' },
    ],
  },
  {
    id: 'wales',
    name: 'Wales',
    marker: 'WALES',
    stats: ['£180M', '14', 'DBW'],
    schemes: [
      { name: 'Development Bank of Wales', description: 'Loans, equity & micro-loans', amountLabel: '£1K–£10M' },
      { name: 'Business Wales', description: 'Free advisory & grant signposting', amountLabel: 'Varies' },
      { name: 'SMART Cymru', description: 'R&D grants for Welsh businesses', amountLabel: 'Up to 70% of cost' },
      { name: 'Wales Innovation Network', description: 'University-business collaboration', amountLabel: 'Varies' },
    ],
  },
  {
    id: 'east',
    name: 'The East',
    marker: 'EAST OF ENGLAND',
    stats: ['£540M', '17', 'Cambridge'],
    schemes: [
      { name: 'Cambridge Innovation Capital', description: 'Cambridge-affiliated deeptech', amountLabel: '£1M–£20M' },
      { name: 'Amadeus Capital', description: 'Cambridge-rooted technology VC', amountLabel: '£1M–£25M' },
      { name: 'Anglia Capital Group', description: 'East Anglia angel network', amountLabel: '£100K–£1M' },
      { name: 'NPIF II (East coverage)', description: 'BBB regional fund partial coverage', amountLabel: '£25K–£2M' },
    ],
  },
  {
    id: 'southwest',
    name: 'The South West',
    marker: 'SOUTH WEST',
    stats: ['£220M', '13', 'SETsquared'],
    schemes: [
      { name: 'SETsquared', description: 'Five-uni accelerator (Bath, Bristol, etc.)', amountLabel: 'Equity-free' },
      { name: 'SWAIN', description: 'South West Angel & Investor Network', amountLabel: '£100K–£500K' },
      { name: 'Bristol Private Equity Club', description: 'Local angel syndicate', amountLabel: '£50K–£1M' },
      { name: 'Cornwall & IoS Investment Fund', description: 'EU-legacy equity & debt', amountLabel: '£25K–£500K' },
    ],
  },
  {
    id: 'southeast',
    name: 'The South East',
    marker: 'SOUTH EAST',
    stats: ['£890M', '21', 'Oxford'],
    schemes: [
      { name: 'Oxford Science Enterprises', description: 'Oxford university spin-out fund', amountLabel: '£500K–£25M' },
      { name: 'Parkwalk Advisors', description: 'University-spinout EIS funds', amountLabel: '£250K–£5M' },
      { name: 'Innovate UK (regional uptake)', description: 'High concentration of awards', amountLabel: '£25K–£500K' },
      { name: 'Surrey Future Fund', description: 'Surrey-based angel co-invest', amountLabel: '£100K–£500K' },
    ],
  },
  {
    id: 'london',
    name: 'London',
    marker: 'LONDON',
    stats: ['£1.2B', '47', 'LCIF'],
    schemes: [
      { name: 'London Co-Investment Fund', description: 'GLA-backed equity co-invest', amountLabel: '£250K–£1M' },
      { name: "Mayor's Innovation Fund", description: 'GLA innovation challenges', amountLabel: 'Varies' },
      { name: 'Capital Enterprise programmes', description: 'Pre-accelerators & matched funds', amountLabel: '£25K–£250K' },
      { name: 'Concentration of UK VC', description: '~60% of UK VC HQs are in London', amountLabel: '£500K–£50M' },
    ],
  },
];
