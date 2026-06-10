import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Legal & Disclaimer',
  description:
    'Editorial purpose, financial promotions position, tax disclaimer, privacy, cookies, and terms of use for ukfunding.io.',
  alternates: { canonical: '/legal' },
};

export default function LegalPage() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main id="top" className="mx-auto max-w-[820px] px-5 pb-20 pt-12 md:px-8 md:pb-24 md:pt-20">
        <div className="mb-12 flex flex-col gap-4">
          <p className="font-mono text-label uppercase text-ink-mute">
            Last updated · {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </p>
          <h1 className="section-em text-display font-medium">
            Legal &amp; <em>disclaimer</em>.
          </h1>
          <p className="text-[16px] leading-[1.55] text-ink-mute">
            Plain-English summary first. The detail follows below. This page applies to your use of ukfunding.io
            (&ldquo;the site&rdquo;).
          </p>
        </div>

        {/* TL;DR box */}
        <aside className="mb-12 border border-line-strong bg-bg-paper p-6 md:p-8">
          <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            In plain English
          </h2>
          <ul className="flex flex-col gap-3 text-[15px] leading-[1.55] text-ink">
            <li>
              <strong className="font-medium">This is editorial, not advice.</strong> Nothing on ukfunding.io
              is financial, investment, tax, or legal advice. We&rsquo;re not regulated by the FCA, not
              authorised under FSMA 2000, and not a broker or introducer.
            </li>
            <li>
              <strong className="font-medium">Information may be wrong or out of date.</strong> Funding scheme
              details change. Always verify on the funder&rsquo;s own website before acting.
            </li>
            <li>
              <strong className="font-medium">Talk to a qualified professional</strong> — a chartered tax
              adviser for R&amp;D credits, an FCA-authorised firm for investment decisions, a solicitor for
              legal questions.
            </li>
            <li>
              <strong className="font-medium">Privacy:</strong> we don&rsquo;t track you with analytics. The
              only data we hold is your email if you subscribe to the newsletter.
            </li>
          </ul>
        </aside>

        <Section id="editorial" title="1. Editorial purpose">
          <p>
            ukfunding.io is an independent editorial atlas of UK startup funding. The site indexes publicly
            available information about grants, equity schemes, tax reliefs, accelerators, venture funds, and
            government programmes. It is intended for general information only.
          </p>
          <p>
            The site has no commercial relationship with any funder, fund manager, accelerator, or scheme
            listed. We do not accept payment for inclusion or placement. We do not earn referral fees,
            introducer commissions, or affiliate revenue.
          </p>
        </Section>

        <Section id="not-advice" title="2. Not financial, investment, tax, or legal advice">
          <p>
            <strong>Nothing on this site constitutes advice.</strong> Content is general and editorial in
            nature and does not take account of your personal circumstances, objectives, or financial
            situation.
          </p>
          <p>
            We are not authorised or regulated by the Financial Conduct Authority. ukfunding.io is not
            authorised under the Financial Services and Markets Act 2000 (&ldquo;FSMA&rdquo;) to give
            investment advice or to carry out regulated activities. The site does not make any &ldquo;invitation
            or inducement to engage in investment activity&rdquo; for the purposes of section 21 of FSMA.
            References to investment schemes (including SEIS, EIS, VCT, and similar) are descriptive and for
            information only.
          </p>
          <p>
            Decisions about applying for grants, raising equity, claiming tax relief, or making investments
            should be taken only after taking advice from an appropriately qualified professional —
            FCA-authorised for investment decisions, a chartered tax adviser or accountant for tax matters,
            and a solicitor for legal matters.
          </p>
        </Section>

        <Section id="tax" title="3. R&D tax credit calculator — illustrative only">
          <p>
            The R&amp;D tax credit calculator on the site produces an indicative figure based on the inputs
            you provide and the published HMRC rates that applied from 1 April 2024. It is{' '}
            <strong>illustrative only</strong>. It does not account for the full eligibility rules,
            apportionment of subcontractor costs, externally provided workers, grant-funded R&amp;D, or
            connected-party rules.
          </p>
          <p>
            Do not rely on the calculator for any claim made to HMRC. Always engage a qualified R&amp;D tax
            adviser and submit through the formal claim process. HMRC may open an enquiry and recover credits
            obtained on the basis of an incorrect claim, with interest and penalties.
          </p>
        </Section>

        <Section id="accuracy" title="4. Accuracy of information">
          <p>
            We aim to keep scheme details current and check sources regularly. However, funding schemes change
            — deadlines move, programmes close, eligibility rules are updated, rates are revised, and new
            calls open. We make no warranty, express or implied, that any specific information on the site is
            accurate, complete, or current at the time you read it.
          </p>
          <p>
            <strong>Always verify on the funder&rsquo;s own website</strong> (e.g. ukri.org, gov.uk,
            aria.org.uk, british-business-bank.co.uk) before applying to any scheme or making decisions based
            on the information shown here.
          </p>
        </Section>

        <Section id="third-party" title="5. Third-party links and content">
          <p>
            The site contains links to third-party websites maintained by UK government departments, public
            bodies, private funds, accelerators, and other organisations. We have no control over the content
            of those sites and accept no responsibility for their accuracy, availability, or terms of use.
          </p>
          <p>
            Names of funders, schemes, and organisations are used for identification and editorial purposes
            only. All third-party trademarks and registered names are the property of their respective
            owners. Their use on this site does not imply endorsement of, by, or affiliation with any of
            them.
          </p>
        </Section>

        <Section id="liability" title="6. Limitation of liability">
          <p>
            To the fullest extent permitted by law, ukfunding.io, its operator, and IP3 Studio shall not be
            liable for any loss or damage, whether direct, indirect, consequential, or otherwise, arising out
            of or in connection with use of the site, reliance on its content, or inability to access it.
          </p>
          <p>
            Nothing in these terms limits any liability that cannot be limited under English law, including
            liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation,
            or any other matter for which liability cannot be excluded.
          </p>
        </Section>

        <Section id="ip" title="7. Intellectual property">
          <p>
            The editorial content, design, layout, code, and compilation of data on ukfunding.io are the
            property of the site&rsquo;s operator and are protected by UK and international copyright,
            database, and design-right laws.
          </p>
          <p>
            You may view, print, and quote short extracts for personal or non-commercial editorial use with
            attribution to ukfunding.io. Bulk copying, scraping, republishing, or commercial use of the
            compiled data set requires written permission.
          </p>
        </Section>

        <Section id="privacy" title="8. Privacy and data">
          <p>
            <strong>Data controller:</strong> IP3 Studio Ltd, registered with the UK Information
            Commissioner&rsquo;s Office under reference{' '}
            <a
              href="https://ico.org.uk/ESDWebPages/Search"
              target="_blank"
              rel="noopener"
              className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              ZB623037
            </a>
            .
          </p>
          <p>
            ukfunding.io is designed to collect the minimum data necessary. We use Vercel Web Analytics — a
            privacy-friendly, cookieless measurement tool that counts aggregate page views without setting
            cookies or tracking you across other websites. We do not run advertising trackers or social media
            pixels.
          </p>
          <p>
            <strong>What we store:</strong>
          </p>
          <ul className="ml-5 list-disc">
            <li>
              Your theme preference (light or dark) — stored in your browser&rsquo;s localStorage so the site
              remembers your choice. Never transmitted.
            </li>
            <li>
              Your email address, only if you choose to subscribe to the newsletter. It is stored securely in
              our own database (hosted by Upstash on UK/EU infrastructure) so we can email you when the
              newsletter launches; ongoing delivery and one-click unsubscribe will then be handled by Substack
              as our processor. It is used solely for the newsletter — to be removed at any time before
              launch, email{' '}
              <a
                href="mailto:contact@ip3.studio"
                className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                contact@ip3.studio
              </a>
              . We do not share, sell, or rent the list.
            </li>
            <li>
              Standard web-server logs (timestamps, IP address, requested page, user agent) retained for
              security and abuse prevention for a limited period.
            </li>
          </ul>
          <p>
            Under the UK GDPR you have rights of access, rectification, erasure, restriction, portability,
            and to object to processing. To exercise these, email{' '}
            <a
              href="mailto:contact@ip3.studio"
              className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              contact@ip3.studio
            </a>
            . If you&rsquo;re unhappy with how we handle a request you may complain to the Information
            Commissioner&rsquo;s Office at ico.org.uk.
          </p>
        </Section>

        <Section id="cookies" title="9. Cookies">
          <p>
            ukfunding.io does not set cookies for tracking, advertising, or analytics. The site uses your
            browser&rsquo;s localStorage to remember your theme preference. That is not a cookie and is not
            sent to any server.
          </p>
        </Section>

        <Section id="governing-law" title="10. Governing law">
          <p>
            These terms and your use of the site are governed by the laws of England and Wales. The courts of
            England and Wales have exclusive jurisdiction over any dispute arising in connection with the
            site or these terms.
          </p>
        </Section>

        <Section id="changes" title="11. Changes to these terms">
          <p>
            We may update this page from time to time to reflect changes in the law, in the site, or in our
            practices. The &ldquo;Last updated&rdquo; date at the top of the page shows when the latest
            revision was published.
          </p>
        </Section>

        <Section id="contact" title="12. Contact &amp; trading details">
          <p>
            For legal, privacy, or correction queries, email{' '}
            <a
              href="mailto:contact@ip3.studio"
              className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              contact@ip3.studio
            </a>
            .
          </p>
          <p>
            ukfunding.io is published by <strong>IP3 Studio Ltd</strong>, a company registered in England
            &amp; Wales (company no.{' '}
            <a
              href="https://find-and-update.company-information.service.gov.uk/company/14930883"
              target="_blank"
              rel="noopener"
              className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              14930883
            </a>
            ), with its registered office at 112 Morden Road, London SW19 3BP, United Kingdom. ICO
            registration ZB623037.
          </p>
        </Section>

        <p className="mt-16 max-w-[720px] border-l-2 border-line-strong pl-5 text-[12px] leading-[1.55] text-ink-faint">
          This page is a plain-English compliance summary. It is not a substitute for advice from a qualified
          UK solicitor. If you operate or rely on the site in a regulated context, take advice that fits your
          circumstances.
        </p>
      </main>

      <Footer />
    </>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 border-t border-line pt-8">
      <h2 className="mb-4 font-sans text-[22px] font-medium tracking-[-0.01em] text-ink md:text-[24px]">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-[15px] leading-[1.6] text-ink-mute [&_strong]:font-medium [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}
