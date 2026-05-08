import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { useT } from "@/contexts/LanguageContext";

const PricingPage = () => {
  const { t } = useT();

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
            {t.pricing.eyebrow}
          </span>
          <h1 className="text-5xl sm:text-6xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
            {t.pricing.pageHeading}
          </h1>
          <p className="mt-5 text-white/65 text-lg leading-relaxed">
            {t.pricing.pageSubtext}
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
              {t.pricing.faqEyebrow}
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              {t.pricing.faqHeading}
            </h2>
          </motion.div>

          <div className="space-y-3">
            {t.pricing.faqs.map(({ q, a }, i) => (
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
