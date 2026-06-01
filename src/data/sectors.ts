import type { Sector } from './types';

export const sectors: Sector[] = [
  {
    id: 'ai', number: '01', icon: '∆', name: 'Artificial Intelligence',
    description: 'From frontier model labs to applied vertical AI. Backed by Innovate UK BridgeAI, ARIA\'s Mathematics for Safe AI programme, and dedicated VCs like Air Street and Plural.',
    rangeLabel: '£100K – £25M', leadFunders: 'UKRI · ARIA', isPriority: true,
  },
  {
    id: 'robotics', number: '02', icon: '⌬', name: 'Robotics & Automation',
    description: 'Made Smarter Innovation, ARIA\'s Smarter Robot Bodies and Robot Dexterity programmes, and the Robotics Growth Partnership.',
    rangeLabel: '£50K – £10M', leadFunders: 'Innovate UK', isPriority: true,
  },
  {
    id: 'health', number: '03', icon: '+', name: 'Healthtech',
    description: 'NIHR i4i, SBRI Healthcare and the AI in Health & Care Award fund clinical software, diagnostics and digital therapeutics.',
    rangeLabel: '£25K – £20M', leadFunders: 'NIHR · NHSX',
  },
  {
    id: 'health', number: '04', icon: '◊', name: 'Medtech',
    description: 'Devices, implantables and clinical-stage therapeutics. Grants run to £50M+ for late-stage trials via Biomedical Catalyst and Innovation Loans.',
    rangeLabel: '£100K – £50M', leadFunders: 'Innovate UK · MRC',
  },
  {
    id: 'space', number: '05', icon: '↑', name: 'Space Technology',
    description: 'UKSA grants, ESA BIC UK incubation, and the UKI2S Seed Fund for upstream and downstream space ventures.',
    rangeLabel: '£100K – £5M', leadFunders: 'UKSA · ESA', isPriority: true,
  },
  {
    id: 'defence', number: '06', icon: '⊕', name: 'Defence & Dual-Use',
    description: "MOD's UK Defence Innovation (formerly DASA) funds TRL 2–6 work in autonomy, counter-UAS, AI/security and aviation. Innovate UK runs periodic dual-use programmes alongside; NSSIF backs defence-adjacent equity.",
    rangeLabel: '£50K – £10M', leadFunders: 'MOD/UKDI · Innovate UK', isPriority: true,
  },
];
