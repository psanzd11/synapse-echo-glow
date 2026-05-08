import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/contexts/LanguageContext";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function useAnimatedNumber(target: number, start: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(target * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

const Stat = ({
  Icon,
  format,
  label,
  start,
  delay = 0,
  target,
  duration,
}: {
  Icon: React.ElementType;
  format: (v: number) => string;
  label: string;
  start: boolean;
  delay?: number;
  target: number;
  duration?: number;
}) => {
  const [began, setBegan] = useState(false);
  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => setBegan(true), delay);
      return () => clearTimeout(timer);
    }
  }, [start, delay]);
  const v = useAnimatedNumber(target, began, duration);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start gap-3"
    >
      <Icon className="h-5 w-5 text-[#A78BFA]" />
      <div className="text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tabular-nums">
        {format(v)}
      </div>
      <p className="text-sm text-white/50 max-w-xs">{label}</p>
    </motion.div>
  );
};

const SpeedToLeadStat = ({ label, start, delay = 0 }: { label: string; start: boolean; delay?: number }) => {
  const [began, setBegan] = useState(false);
  const [secs, setSecs] = useState(172800);
  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => setBegan(true), delay);
    return () => clearTimeout(timer);
  }, [start, delay]);
  useEffect(() => {
    if (!began) return;
    const duration = 2600;
    const from = Math.log(172800);
    const to = Math.log(45);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = easeOutCubic(p);
      const cur = Math.exp(from + (to - from) * eased);
      setSecs(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [began]);

  const fmt = (s: number) => {
    if (s >= 86400) return `${(s / 86400).toFixed(1)}d`;
    if (s >= 3600) return `${(s / 3600).toFixed(1)}h`;
    if (s >= 60) return `${(s / 60).toFixed(0)}m`;
    return `<60s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start gap-3"
    >
      <Zap className="h-5 w-5 text-[#22D3EE]" />
      <div className="text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tabular-nums">
        {fmt(secs)}
      </div>
      <p className="text-sm text-white/50 max-w-xs">{label}</p>
    </motion.div>
  );
};

export const Proof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const { t } = useT();

  return (
    <section ref={ref} className="relative bg-black text-white py-24 px-6 border-y border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat
            Icon={TrendingUp}
            target={3.4}
            format={(v) => `${v.toFixed(1)}×`}
            label={t.proof.stat1Label}
            start={inView}
          />
          <Stat
            Icon={Clock}
            target={82}
            format={(v) => `${Math.round(v)}%`}
            label={t.proof.stat2Label}
            start={inView}
            delay={120}
          />
          <Stat
            Icon={Users}
            target={24}
            format={(v) => `${Math.round(v)}/7`}
            label={t.proof.stat3Label}
            start={inView}
            delay={240}
          />
          <SpeedToLeadStat label={t.proof.stat4Label} start={inView} delay={360} />
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <p className="text-2xl sm:text-3xl font-medium leading-snug text-white/90">
            {t.proof.quote}
          </p>
          <footer className="mt-6 text-sm text-white/50">{t.proof.quoteAttrib}</footer>
        </motion.blockquote>
      </div>
    </section>
  );
};
