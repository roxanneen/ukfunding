/**
 * Founder-facing FAQ. Rendered as a visible section AND emitted as FAQPage
 * JSON-LD on the home page for Google rich results.
 *
 * Answers should be plainly true at time of writing and self-contained.
 * Avoid links inside answers; Google's FAQ rich results strip them.
 */
export type FaqEntry = { q: string; a: string };

export const faq: FaqEntry[] = [
  {
    q: 'What is SEIS and how is it different from EIS?',
    a: "SEIS (Seed Enterprise Investment Scheme) gives the investor 50% income tax relief on up to £200,000 per company per tax year, and the company can raise up to £250,000 lifetime under it. EIS (Enterprise Investment Scheme) gives investors 30% income tax relief on up to £1m per year, rising to £2m where the money goes into knowledge-intensive companies, with a £12m lifetime ceiling for the company and £20m for KICs. SEIS suits the earliest stage and EIS picks up from there. Both stack with grants and R&D credits.",
  },
  {
    q: 'How long does HMRC take to pay an R&D tax credit claim?',
    a: 'The median is around 86 days from submission to payout, and an HMRC enquiry can stretch it well beyond that. Model your runway on the money arriving late.',
  },
  {
    q: "What's the success rate on Innovate UK Smart Grants?",
    a: 'Roughly 11% of applications are funded, so about 1 in 9. Assessors most often point to writing quality and the clarity of the project plan when they explain a decision, ahead of the underlying technology. Applying early in a competition cycle tends to help.',
  },
  {
    q: 'Can a UK startup apply to multiple funding schemes at the same time?',
    a: 'Yes, and most schemes are explicitly stackable. A typical stack starts with a grant for the prototype, adds SEIS to hire the first team, moves to EIS for the seed round, then brings in growth equity once traction shows. SEIS and EIS were both designed to sit alongside non-dilutive money.',
  },
  {
    q: 'Is ARIA funding only available to academic researchers?',
    a: 'No. ARIA runs multi-year programme contracts that universities, startups, SMEs and individuals can all hold. What matters in assessment is how relevant your proposed work is to the opportunity space. The legal form of the applicant carries little weight.',
  },
  {
    q: 'What is the difference between the merged R&D scheme and ERIS?',
    a: 'The merged scheme has been running since April 2024 and gives most companies an effective benefit of about 16.2% on qualifying R&D expenditure. ERIS, or Enhanced R&D Intensive Support, applies to loss-making SMEs that spend at least 30% of total expenditure on R&D. Those companies reach an effective benefit of about 27%, through a 14.5% surrender rate on enhanced expenditure.',
  },
  {
    q: 'Do I need a UK-registered company to apply for UK grants?',
    a: 'Most schemes do require UK registration. ARIA accepts individuals and international collaborators provided more than 50% of the work happens in the UK. Innovate UK competitions typically require a UK-registered lead applicant, and consortia can include overseas partners under specific conditions.',
  },
];
