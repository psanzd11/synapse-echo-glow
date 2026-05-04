import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { CaseStudies } from "@/components/CaseStudies";
import { Proof } from "@/components/Proof";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const CaseStudiesPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-10 px-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#A78BFA]/15 blur-[140px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-5">
            Case Studies
          </span>
          <h1 className="text-5xl sm:text-6xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
            Outcomes, not deliverables.
          </h1>
          <p className="mt-5 text-white/65 text-lg leading-relaxed">
            Custom SaaS platforms, AI agents, automations, and growth engines we've shipped — each tied to measurable results for the businesses using them.
          </p>
        </motion.div>
      </section>

      <Proof />
      <CaseStudies />
      <CTA />
      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
