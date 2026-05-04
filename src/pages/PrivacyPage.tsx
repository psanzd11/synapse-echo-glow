import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PrivacyPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-20 px-6">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[#7C5CFF]/12 blur-[140px]" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-5">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.1]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="mt-6 rounded-xl border border-[#A78BFA]/20 bg-[#A78BFA]/5 p-4 text-xs text-white/70">
            This page is a starting template. Have it reviewed by legal counsel before publishing publicly, especially if you operate in regulated jurisdictions (EU, UK, California, etc.).
          </div>

          <div className="mt-12 space-y-10 text-white/75 leading-relaxed">
            <Section title="1. Who we are">
              Viddix AI ("Viddix", "we", "us") provides AI agency services including custom AI agents, SaaS platform development, automations, and growth strategy. This policy explains what personal data we collect through this website (viddix.ai and its subdomains), how we use it, and your rights regarding it.
            </Section>

            <Section title="2. What we collect">
              <p>We collect personal data only when you choose to share it with us. Specifically:</p>
              <List items={[
                "Contact information you submit through forms (name, work email, company name).",
                "Project context you describe in form messages or emails (intended service, budget range, timeline, project details).",
                "Email correspondence when you reach out to us directly.",
                "Standard server and browser data (IP address, browser type, pages visited) collected by hosting and analytics providers.",
              ]} />
            </Section>

            <Section title="3. How we use it">
              <p>We use the data you share for the following purposes:</p>
              <List items={[
                "Responding to your inquiry and assessing whether there is a fit.",
                "Preparing scopes, quotes, and proposals when you've requested one.",
                "Maintaining contact for ongoing engagements and follow-ups.",
                "Improving the website and understanding aggregate visitor behavior.",
              ]} />
              <p>We do not sell your personal data. We do not use it for advertising to third parties.</p>
            </Section>

            <Section title="4. Cookies and analytics">
              We use a small set of cookies and analytics tools to understand how visitors use the site. You can accept or decline non-essential cookies via the consent banner shown on your first visit. Strictly necessary cookies (for example, those that remember your consent choice) are always set.
            </Section>

            <Section title="5. Sharing">
              We share data only with vetted service providers we use to operate (for example, our email provider, analytics provider, and hosting platform). These providers are bound by their own data processing agreements. We do not share your data with marketing networks or sell it to third parties.
            </Section>

            <Section title="6. Retention">
              We keep contact data for as long as needed to respond to your inquiry and maintain the relationship. If we don't move forward together, we'll retain your data for a reasonable period (typically up to 24 months) and then remove it on request.
            </Section>

            <Section title="7. Your rights">
              <p>Depending on where you live, you may have the right to:</p>
              <List items={[
                "Access the personal data we hold about you.",
                "Request correction of inaccurate data.",
                "Request deletion of your data.",
                "Object to or restrict certain uses of your data.",
                "Withdraw consent at any time.",
              ]} />
              <p>To exercise any of these rights, contact us at <a href="mailto:viddixai@gmail.com" className="text-[#22D3EE] hover:underline">viddixai@gmail.com</a>.</p>
            </Section>

            <Section title="8. Security">
              We take reasonable technical and organizational measures to protect your data. No method of transmission or storage is 100% secure, so we encourage you to share only the information we need to respond to your request.
            </Section>

            <Section title="9. Changes to this policy">
              We may update this policy as our practices evolve. We'll update the "Last updated" date at the top of the page when we do.
            </Section>

            <Section title="10. Contact">
              For any questions about privacy, reach us at <a href="mailto:viddixai@gmail.com" className="text-[#22D3EE] hover:underline">viddixai@gmail.com</a>.
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
        <span className="mt-2 h-1 w-1 rounded-full bg-[#A78BFA] shrink-0" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export default PrivacyPage;
