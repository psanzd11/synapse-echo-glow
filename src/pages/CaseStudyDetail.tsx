import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/data/caseStudies";
import { useT } from "@/contexts/LanguageContext";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useT();
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="pt-40 pb-32 px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-medium mb-4">{t.caseStudyDetail.notFound}</h1>
          <p className="text-white/60 mb-8">{t.caseStudyDetail.notFoundDesc}</p>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.caseStudyDetail.notFoundBack}
          </Link>
        </section>
      </main>
    );
  }

  const otherStudies = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div
          className={`pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-br ${study.accent} blur-[140px] opacity-70`}
        />

        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.caseStudyDetail.backLink}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 border border-white/10 bg-white/5 rounded-full px-2.5 py-1">
                {study.tag}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full px-2.5 py-1">
                {study.industry}
              </span>
            </div>

            <p className="text-sm text-white/50 mb-3">{study.client}</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
              {study.headline}
            </h1>
            <p className="mt-6 text-white/65 text-lg leading-relaxed">{study.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6"
          >
            {study.metrics.map((m) => (
              <div key={m.v}>
                <div className="text-3xl sm:text-4xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {m.k}
                </div>
                <div className="text-xs text-white/55 mt-1.5 leading-tight">{m.v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-6 pb-32 border-t border-white/5">
        <div className="relative mx-auto max-w-4xl pt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A78BFA] mb-3 inline-block">
              {t.caseStudyDetail.challengeLabel}
            </span>
            <h2 className="text-2xl font-medium text-white mb-4">
              {t.caseStudyDetail.challengeSubheading}
            </h2>
            <p className="text-white/65 leading-relaxed text-sm">{study.challenge}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#22D3EE] mb-3 inline-block">
              {t.caseStudyDetail.approachLabel}
            </span>
            <h2 className="text-2xl font-medium text-white mb-4">
              {t.caseStudyDetail.approachSubheading}
            </h2>
            <ul className="space-y-3">
              {study.approach.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#22D3EE] shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7C5CFF] mb-3 inline-block">
              {t.caseStudyDetail.outcomeLabel}
            </span>
            <h2 className="text-2xl font-medium text-white mb-4">
              {t.caseStudyDetail.outcomeSubheading}
            </h2>
            <ul className="space-y-3">
              {study.outcome.map((o, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                  <Check className="h-4 w-4 text-[#A78BFA] mt-0.5 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {study.stack && (
          <div className="relative mx-auto max-w-4xl mt-16 pt-10 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 inline-block">
              {t.caseStudyDetail.stackLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs text-white/70 border border-white/15 bg-white/5 rounded-full px-3 py-1.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="relative px-6 py-20 border-t border-white/5">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl sm:text-2xl font-medium text-white">
              {t.caseStudyDetail.moreCaseStudies}
            </h3>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              {t.caseStudyDetail.viewAll}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherStudies.map((c) => (
              <Link
                key={c.slug}
                to={`/case-studies/${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 hover:border-white/20 transition-all"
              >
                <div
                  className={`absolute -top-32 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-40 group-hover:opacity-70 transition-opacity`}
                />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10 rounded-full px-2.5 py-1">
                    {c.tag}
                  </span>
                  <p className="text-xs text-white/50 mt-4 mb-2">{c.client}</p>
                  <h4 className="text-lg font-medium text-white leading-snug">{c.headline}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
};

export default CaseStudyDetail;
