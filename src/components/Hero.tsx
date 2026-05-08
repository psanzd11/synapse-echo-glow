import { motion } from "framer-motion";
import { Bot, Workflow, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { Navbar } from "./Navbar";
import { useT } from "@/contexts/LanguageContext";

const HLS_SRC =
  "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export const Hero = () => {
  const { t } = useT();

  const badges = [
    { label: t.hero.badge1Label, name: t.hero.badge1Name, Icon: Bot },
    { label: t.hero.badge2Label, name: t.hero.badge2Name, Icon: Workflow },
    { label: t.hero.badge3Label, name: t.hero.badge3Name, Icon: Sparkles },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#7C5CFF]/20 blur-[140px] z-0" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[500px] rounded-full bg-[#22D3EE]/10 blur-[120px] z-0" />

      <Navbar />

      {/* Background video */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[35vh] h-[80vh] z-0">
        <VideoPlayer
          src={HLS_SRC}
          className="h-full w-full object-cover opacity-100"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-40 text-center">
        {/* Eyebrow tag */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 text-xs text-white/70"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
          </span>
          {t.hero.eyebrow}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {badges.map(({ label, name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-xs text-white/80"
            >
              <span className="text-white/50">{label}</span>
              <Icon className="h-4 w-4 text-[#A78BFA]" />
              <span className="font-medium text-white">{name}</span>
            </div>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="font-medium tracking-tight leading-[0.95] text-[56px] sm:text-[72px] md:text-[84px] max-w-5xl bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
        >
          {t.hero.headline1}
          <br />
          <span className="bg-gradient-to-r from-[#A78BFA] via-white to-[#22D3EE] bg-clip-text text-transparent">
            {t.hero.headline2}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed"
        >
          {t.hero.subtext}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/book"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-zinc-200 px-6 py-3 text-sm font-medium text-black hover:shadow-[0_0_40px_rgba(167,139,250,0.4)] transition-all"
          >
            {t.hero.cta1}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            {t.hero.cta2}
          </Link>
        </motion.div>

        {/* Micro proof */}
        <motion.p
          initial="hidden"
          animate="show"
          custom={5}
          variants={fadeUp}
          className="mt-6 text-xs text-white/40"
        >
          {t.hero.socialProof}
        </motion.p>
      </div>

      {/* Trust sectors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-8 left-0 right-0 z-10"
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4">
            {t.hero.trustedBy}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {t.hero.sectors.map((s) => (
              <span
                key={s}
                className="text-xs text-white/70 border border-white/15 bg-white/5 backdrop-blur-md rounded-full px-3 py-1.5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
