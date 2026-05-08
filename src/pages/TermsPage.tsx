import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useT } from "@/contexts/LanguageContext";

const TermsPage = () => {
  const { t } = useT();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-20 px-6">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[#22D3EE]/12 blur-[140px]" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-5">
            {t.legal.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.1]">
            {t.legal.termsHeading}
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-6 rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/5 p-4 text-xs text-white/70">
            This page is a starting template. Specific commercial terms (engagement scope, payment, IP, SLA) should be governed by signed Master Service Agreements with each client and reviewed by legal counsel.
          </div>

          <div className="mt-12 space-y-10 text-white/75 leading-relaxed">
            <Section title="1. Acceptance">
              By accessing this website (viddix.ai and its subdomains), you agree to these Terms. If you do not agree, please do not use the website.
            </Section>

            <Section title="2. About Viddix AI">
              Viddix AI is an AI agency that designs, builds, and deploys custom AI systems, SaaS platforms, automations, and growth strategy for businesses. Engagements are scoped individually and governed by a separate signed agreement between Viddix AI and the client.
            </Section>

            <Section title="3. Use of the website">
              <p>You agree to use the website only for lawful purposes and not to:</p>
              <List items={[
                "Submit false, misleading, or another party's information through any form.",
                "Attempt to access systems or data you are not authorized to access.",
                "Reverse engineer, scrape, or interfere with the website's normal operation.",
                "Use automated tools to overload or disrupt the service.",
              ]} />
            </Section>

            <Section title="4. Intellectual property">
              <p>All content on this website — including the Viddix AI brand, logos, copy, design, and code — is the property of Viddix AI or its licensors and is protected by applicable IP laws.</p>
              <p>For client engagements, ownership of the systems we build is governed by your signed agreement. Unless otherwise specified in writing, the systems, code, models, and infrastructure we build remain under Viddix AI, with licensed access granted to the client for the duration of the engagement.</p>
            </Section>

            <Section title="5. Inquiries and quotes">
              Submitting a form or sending an inquiry does not create a binding engagement. A formal engagement starts only when both parties have signed a written agreement covering scope, deliverables, fees, and timeline.
            </Section>

            <Section title="6. Disclaimers">
              The website is provided on an "as is" and "as available" basis. We make no warranties — express or implied — about the website's availability, accuracy, completeness, or fitness for any particular purpose. Information on the website is for general informational purposes and does not constitute professional advice.
            </Section>

            <Section title="7. Limitation of liability">
              To the maximum extent permitted by law, Viddix AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) the website. Our total liability for any claim related to this website is limited to the greater of (a) the amount you have paid us in the prior 12 months for services or (b) one hundred US dollars.
            </Section>

            <Section title="8. Third-party links">
              The website may include links to third-party sites. We are not responsible for the content, privacy practices, or availability of those sites.
            </Section>

            <Section title="9. Changes to these Terms">
              We may update these Terms from time to time. The "Last updated" date at the top reflects the latest version. Continued use of the website after changes constitutes acceptance.
            </Section>

            <Section title="10. Governing law">
              These Terms are governed by the laws of the jurisdiction in which Viddix AI operates, without regard to conflict-of-law principles. Any dispute arising under these Terms will be resolved in the competent courts of that jurisdiction.
            </Section>

            <Section title="11. Contact">
              For questions about these Terms, reach us at <a href="mailto:viddixai@gmail.com" className="text-[#22D3EE] hover:underline">viddixai@gmail.com</a>.
            </Section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-xl sm:text-2xl font-medium text-white mb-3">{title}</h2>
    <div className="space-y-3 text-sm sm:text-base text-white/70">{children}</div>
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 pl-1">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-2 h-1 w-1 rounded-full bg-[#22D3EE] shrink-0" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export default TermsPage;
