import { motion } from "framer-motion";
import { Phone, User, Workflow, BarChart3 } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const icons = [Phone, User, Workflow, BarChart3];

const accents = [
  "from-[#7C5CFF]/20 to-[#22D3EE]/10",
  "from-[#A78BFA]/20 to-[#7C5CFF]/10",
  "from-[#22D3EE]/20 to-[#7C5CFF]/10",
  "from-[#7C5CFF]/20 to-[#A78BFA]/10",
];

export const AIAgents = () => {
  const { t } = useT();

  return (
    <section id="agents" className="relative bg-black text-white py-32 px-6 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.06),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
            {t.aiAgents.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {t.aiAgents.heading}
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg">{t.aiAgents.subtext}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.aiAgents.categories.map(({ title, desc, items }, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 hover:border-white/20 transition-all overflow-hidden"
              >
                <div
                  className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-white/10 mb-5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed mb-5">{desc}</p>
                  <ul className="space-y-2">
                    {items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="h-1 w-1 rounded-full bg-[#A78BFA]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
