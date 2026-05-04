import { motion } from "framer-motion";
import { Brain, Network, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AIAgents } from "@/components/AIAgents";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const pillars = [
  {
    Icon: Brain,
    title: "Trained on your business",
    desc: "Every agent is grounded in your knowledge base, tone, and workflows — not generic LLM outputs.",
  },
  {
    Icon: Network,
    title: "Connected to your stack",
    desc: "Agents read and write directly to your CRM, calendar, comms, and databases — no copy-paste in between.",
  },
  {
    Icon: ShieldCheck,
    title: "Observed and governed",
    desc: "Full traceability, guardrails, and human-in-the-loop where it matters. You stay in control.",
  },
];

const AIAgentsPage = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-10 px-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#22D3EE]/15 blur-[140px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-5">
            AI Agents
          </span>
          <h1 className="text-5xl sm:text-6xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
            Your 24/7 AI workforce.
          </h1>
          <p className="mt-5 text-white/65 text-lg leading-relaxed">
            Voice, personal, workflow, and research agents — purpose-built to take work off your team and amplify what humans do best.
          </p>
        </motion.div>
      </section>

      <AIAgents />

      <section className="relative bg-black text-white py-32 px-6 border-t border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
              How our agents work
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Built for production. Not demos.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-white/10 mb-5">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default AIAgentsPage;
