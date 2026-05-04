import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const faqs = [
  {
    q: "How is pricing structured?",
    a: "We work on a monthly retainer model. You'll get a clear scope, timeline, and what's included up front — with ongoing support, iteration, and improvements built into the engagement.",
  },
  {
    q: "How long does a project take?",
    a: "Projects typically take 1 to 3 months from kickoff to deployment, depending on scope and complexity. We move fast — you'll see progress in weeks, not quarters.",
  },
  {
    q: "Do you work with non-technical teams?",
    a: "Yes. We handle the engineering end-to-end and translate everything into plain English. Your team only needs to know the business — we own the rest.",
  },
  {
    q: "What happens after the project ships?",
    a: "We continue to maintain, host, and evolve the system as part of your ongoing engagement. The infrastructure stays under Viddix AI, and you get continuous improvements, support, and new capabilities as your needs grow — without having to build or staff an in-house AI team.",
  },
  {
    q: "Can we start small?",
    a: "Yes. We often start with a focused first phase — a single agent or automation — to prove impact quickly, then expand the engagement once results are in.",
  },
];

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-10 px-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#7C5CFF]/15 blur-[140px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-5">
            Pricing
          </span>
          <h1 className="text-5xl sm:text-6xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
            Pay for the build, own the system.
          </h1>
          <p className="mt-5 text-white/65 text-lg leading-relaxed">
            Tell us what you need. We'll send a fixed-price quote with scope, timeline, and deliverables within 24 hours.
          </p>
        </motion.div>
      </section>

      <Pricing />

      <section className="relative bg-black text-white py-32 px-6 border-t border-white/5">
        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Common questions.
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.details
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 open:bg-white/[0.05] transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium text-white list-none">
                  {q}
                  <span className="ml-4 text-white/40 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default PricingPage;
