import { motion } from "framer-motion";
import { Zap, Bot, Layers, Smartphone, PenTool, Megaphone, ArrowUpRight } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const icons = [Zap, Bot, Layers, Smartphone, PenTool, Megaphone];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const Services = () => {
  const { t } = useT();

  return (
    <section id="services" className="relative bg-black text-white py-32 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
            {t.services.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg">{t.services.subtext}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.items.map(({ title, desc, tag }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 hover:border-white/20 transition-all overflow-hidden"
              >
                <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-white/10">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/40 border border-white/10 rounded-full px-2 py-1">
                    {tag}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{desc}</p>

                <div className="mt-6 inline-flex items-center gap-1 text-xs text-white/50 group-hover:text-white transition-colors">
                  {t.services.learnMore}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
