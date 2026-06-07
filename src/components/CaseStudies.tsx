import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { AnimatedMetric } from "@/components/AnimatedMetric";
import { useT } from "@/contexts/LanguageContext";

export const CaseStudies = () => {
  const { t } = useT();

  return (
    <section id="cases" className="relative bg-black text-white py-16 sm:py-24 md:py-32 px-5 sm:px-6 border-t border-white/5">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-14"
        >
          <div>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
              {t.caseStudies.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent max-w-2xl">
              {t.caseStudies.heading}
            </h2>
          </div>
          <p className="text-white/55 text-sm max-w-sm">{t.caseStudies.subtext}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -3 }}
              className="will-change-transform"
            >
              <Link
                to={`/case-studies/${c.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 sm:p-6 transition-all h-full hover:border-white/20 hover:shadow-[0_20px_60px_-20px_rgba(124,92,255,0.45)]"
              >
                <div
                  className={`absolute -top-32 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-50 group-hover:opacity-90 transition-opacity`}
                />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full px-2.5 py-1">
                        {c.tag}
                      </span>
                      {c.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#A78BFA]/35 bg-[#A78BFA]/12 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                          <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                          {t.caseStudies.featuredBadge}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/40 shrink-0 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-white/50 mb-2">{c.client}</p>
                  <h3 className="text-lg sm:text-xl font-medium text-white leading-snug mb-6 flex-1">
                    {c.headline}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-5 border-t border-white/10">
                    {c.metrics.map((m, idx) => (
                      <AnimatedMetric
                        key={m.label}
                        label={m.label}
                        before={m.before}
                        after={m.after}
                        variant="compact"
                        delay={idx * 120}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
