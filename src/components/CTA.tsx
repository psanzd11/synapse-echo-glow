import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const checks = [
  "Free 30-min strategy session",
  "Custom AI roadmap for your business",
  "No commitment, no sales pressure",
];

export const CTA = () => {
  return (
    <section id="book" className="relative bg-black text-white py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,92,255,0.18),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-10 sm:p-16 text-center"
      >
        <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-6">
          Ready to scale?
        </span>

        <h2 className="text-4xl sm:text-6xl font-medium tracking-tight bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent leading-[1.05]">
          Let's build your AI advantage.
        </h2>
        <p className="mt-5 text-white/60 text-base sm:text-lg max-w-xl mx-auto">
          Book a free consultation. We'll map a custom AI plan for your business — and show you exactly where automation pays off first.
        </p>

        <ul className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
          {checks.map((c) => (
            <li key={c} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-[#22D3EE]" />
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-zinc-200 px-7 py-3.5 text-sm font-medium text-black hover:shadow-[0_0_50px_rgba(167,139,250,0.5)] transition-all"
          >
            Book Your Free Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-7 py-3.5 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Request a Consultation
          </a>
        </div>
      </motion.div>

    </section>
  );
};
