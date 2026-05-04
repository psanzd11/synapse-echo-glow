import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

export const CaseStudies = () => {
  return (
    <section id="cases" className="relative bg-black text-white py-32 px-6 border-t border-white/5">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
              Case Studies
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent max-w-2xl">
              Real businesses. Real outcomes.
            </h2>
          </div>
          <p className="text-white/55 text-sm max-w-sm">
            A selection of the SaaS platforms, AI agents, automations, and growth engines we've shipped — each tied to measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies.map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              <Link
                to={`/case-studies/${c.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 hover:border-white/20 transition-all h-full"
              >
                <div className={`absolute -top-32 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-50 group-hover:opacity-90 transition-opacity`} />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full px-2.5 py-1">
                      {c.tag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-white/50 mb-2">{c.client}</p>
                  <h3 className="text-lg sm:text-xl font-medium text-white leading-snug mb-6 flex-1">
                    {c.headline}
                  </h3>
                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/10">
                    {c.metrics.map((m) => (
                      <div key={m.v}>
                        <div className="text-xl sm:text-2xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                          {m.k}
                        </div>
                        <div className="text-[10px] text-white/50 mt-1 leading-tight">{m.v}</div>
                      </div>
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
