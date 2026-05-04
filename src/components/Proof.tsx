import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Easing for counters
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
  Icon: any;
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
      const t = setTimeout(() => setBegan(true), delay);
      return () => clearTimeout(t);
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

// Speed-to-lead: animate seconds from 2 days (172800s) down to 45s
const SpeedToLeadStat = ({ start, delay = 0 }: { start: boolean; delay?: number }) => {
  const [began, setBegan] = useState(false);
  const [secs, setSecs] = useState(172800);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setBegan(true), delay);
    return () => clearTimeout(t);
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
    if (s >= 86400) {
      const d = s / 86400;
      return `${d.toFixed(1)}d`;
    }
    if (s >= 3600) {
      const h = s / 3600;
      return `${h.toFixed(1)}h`;
    }
    if (s >= 60) {
      const m = s / 60;
      return `${m.toFixed(0)}m`;
    }
    if (s > 60) return `${Math.round(s)}s`;
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
      <p className="text-sm text-white/50 max-w-xs">
        Speed-to-lead — from 2 days down to under a minute
      </p>
    </motion.div>
  );
};

export const Proof = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative bg-black text-white py-24 px-6 border-y border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat
            Icon={TrendingUp}
            target={3.4}
            format={(v) => `${v.toFixed(1)}×`}
            label="Avg. pipeline lift within 90 days"
            start={inView}
          />
          <Stat
            Icon={Clock}
            target={82}
            format={(v) => `${Math.round(v)}%`}
            label="Manual work removed by automation"
            start={inView}
            delay={120}
          />
          <Stat
            Icon={Users}
            target={24}
            format={(v) => `${Math.round(v)}/7`}
            label="AI agents qualifying & responding"
            start={inView}
            delay={240}
          />
          <SpeedToLeadStat start={inView} delay={360} />
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <p className="text-2xl sm:text-3xl font-medium leading-snug text-white/90">
            "Viddix rebuilt our entire ops layer with AI agents in 6 weeks.
            We're closing more, faster — with half the team."
          </p>
          <footer className="mt-6 text-sm text-white/50">
            — Operations Lead, Series B SaaS
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};
