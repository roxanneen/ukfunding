/**
 * Founder-facing FAQ. Rendered as a visible section AND emitted as FAQPage
 * JSON-LD on the home page for Google rich results.
 *
 * Answers should be plainly true at time of writing and self-contained.
 * Avoid links inside answers — Google's FAQ rich results strip them.
 */
export type FaqEntry = { q: string; a: string };

export const faq: FaqEntry[] = [
  {
    q: 'What is SEIS and how is it different from EIS?',
    a: "SEIS (Seed Enterprise Investment Scheme) gives the investor 50% income tax relief on up to £200,000 per company per tax year; the company can raise up to £250,000 lifetime under SEIS. EIS (Enterprise Investment Scheme) gives investors 30% income tax relief on up to £1m per year (£2m if into knowledge-intensive companies); the company can raise up to £12m lifetime (£20m for KIC). SEIS is for very early-stage; EIS is for slightly later. Both are stackable with grants and R&D credits.",
  },
  {
    q: "How long does HMRC take to pay an R&D tax credit claim?",
    a: 'Median is around 86 days from submission to payout, though it depends on whether HMRC opens an enquiry. Plan working capital accordingly — do not treat R&D credit as a near-term receivable for runway calculations.',
  },
  {
    q: "What's the success rate on Innovate UK Smart Grants?",
    a: 'Roughly 11% of applications are funded — about 1 in 9. The most-cited differentiator is writing quality and clarity of the project plan, not the underlying tech. Apply early in a competition cycle rather than on the deadline.',
  },
  {
    q: 'Can a UK startup apply to multiple funding schemes at the same time?',
    a: "Yes — most schemes are explicitly stackable. A typical UK funding stack is: a grant pays for the prototype, SEIS pays for the team, EIS pays for the seed round, and growth equity follows the traction. SEIS and EIS in particular are designed to be combined with non-dilutive sources.",
  },
  {
    q: 'Is ARIA funding only available to academic researchers?',
    a: 'No. ARIA programmes are structured as multi-year programme contracts open to universities, startups, SMEs, and individuals. Eligibility is broad and is judged on the relevance of the proposed work to the opportunity space, not the legal form of the applicant.',
  },
  {
    q: "What is the difference between the merged R&D scheme and ERIS?",
    a: 'The merged scheme (active from April 2024) gives around a 16.2% effective benefit on qualifying R&D expenditure for most companies. ERIS (Enhanced R&D Intensive Support) is for loss-making SMEs that spend at least 30% of total expenditure on R&D — they get up to roughly a 27% effective benefit via a 14.5% surrender rate on enhanced expenditure.',
  },
  {
    q: 'Do I need a UK-registered company to apply for UK grants?',
    a: 'Most schemes do require UK registration. ARIA accepts individuals and international collaborators provided more than 50% of the work happens in the UK. Innovate UK competitions typically require a UK-registered lead applicant; consortia can include overseas partners under specific conditions.',
  },
];
