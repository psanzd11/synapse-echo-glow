import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Variant = "compact" | "large";

type Props = {
  label: string;
  before: string;
  after: string;
  variant?: Variant;
  /** Stagger this metric relative to siblings (ms). */
  delay?: number;
};

type ParsedValue = {
  prefix: string;
  value: number;
  suffix: string;
};

// Try to parse "$480", "<3s", "4 min", "92%", "1,200", "200+", "$610k" into a numeric breakdown.
// Returns null if there's no parseable number we can animate.
const parseValue = (s: string): ParsedValue | null => {
  // prefix: anything that's not a digit, dot, or minus (e.g. "$", "<", "+", "~")
  // number: optional minus, then digits with optional thousands separators / decimals
  // suffix: anything that isn't a digit (e.g. "%", "k", "s", " min", "+", "×")
  const match = s.trim().match(/^([^\d.\-]*)(-?[\d,]+(?:\.\d+)?)([^\d.]*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (isNaN(num)) return null;
  return { prefix: match[1] ?? "", value: num, suffix: match[3] ?? "" };
};

const formatNumber = (current: number, target: number, targetRaw: string): string => {
  // Match number of decimals of the target (so we don't animate "4.5%" through integers)
  const decimals = targetRaw.includes(".") ? targetRaw.split(".")[1].replace(/[^\d]/g, "").length : 0;
  const fixed = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
  // Add thousand separators if the target is >= 1000 (matches "1,200" style)
  if (target >= 1000 || /,/.test(targetRaw)) {
    const [intPart, decPart] = fixed.split(".");
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decPart ? `${withSep}.${decPart}` : withSep;
  }
  return fixed;
};

export const AnimatedMetric = ({
  label,
  before,
  after,
  variant = "compact",
  delay = 0,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const beforeParsed = parseValue(before);
  const afterParsed = parseValue(after);
  // Only count up when both sides parse AND share the same suffix (avoids "min" → "s" weirdness).
  const canCountUp =
    !!beforeParsed && !!afterParsed && beforeParsed.suffix === afterParsed.suffix;

  const [display, setDisplay] = useState<string>(before);
  const [phase, setPhase] = useState<"before" | "after">("before");

  useEffect(() => {
    if (!inView) return;
    const holdMs = 450; // show the "before" value briefly so the user reads it
    const animMs = 1200;

    if (canCountUp && beforeParsed && afterParsed) {
      const from = beforeParsed.value;
      const to = afterParsed.value;
      // Use the after value's prefix/suffix to render the animated number.
      const prefix = afterParsed.prefix;
      const suffix = afterParsed.suffix;
      const start = performance.now() + delay + holdMs;
      let raf = 0;
      let cancelled = false;
      const rawTarget = after;

      const tick = (now: number) => {
        if (cancelled) return;
        if (now < start) {
          setDisplay(before);
          raf = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(1, (now - start) / animMs);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        const current = from + (to - from) * eased;
        setDisplay(`${prefix}${formatNumber(current, to, rawTarget)}${suffix}`);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(after);
          setPhase("after");
        }
      };
      raf = requestAnimationFrame(tick);
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
      };
    }

    // Crossfade path (non-numeric or unit-mismatched values).
    const id = window.setTimeout(() => {
      setDisplay(after);
      setPhase("after");
    }, delay + holdMs);
    return () => window.clearTimeout(id);
  }, [inView, before, after, canCountUp, beforeParsed, afterParsed, delay]);

  const isCrossfade = !canCountUp;

  if (variant === "large") {
    return (
      <div ref={ref}>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">{label}</div>
        <div className="relative h-[44px] sm:h-[52px] flex items-center">
          <motion.div
            key={isCrossfade ? display : "static"}
            initial={isCrossfade ? { opacity: 0, y: 6 } : false}
            animate={isCrossfade ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tabular-nums leading-none"
          >
            {display}
          </motion.div>
        </div>
        <div
          className={`text-[11px] mt-2 tabular-nums transition-opacity duration-500 ${
            phase === "after" ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white/35 line-through decoration-white/20">{before}</span>
          <span className="mx-1.5 text-white/30">→</span>
          <span className="text-white/55">{after}</span>
        </div>
      </div>
    );
  }

  // compact (card grid)
  return (
    <div ref={ref}>
      <div className="relative h-[28px] sm:h-[32px] flex items-center">
        <motion.div
          key={isCrossfade ? display : "static"}
          initial={isCrossfade ? { opacity: 0, y: 4 } : false}
          animate={isCrossfade ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4 }}
          className="text-xl sm:text-2xl font-medium bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent tabular-nums leading-none"
        >
          {display}
        </motion.div>
      </div>
      <div className="text-[10px] text-white/50 mt-1.5 leading-tight">{label}</div>
      <div
        className={`text-[9px] mt-0.5 tabular-nums transition-opacity duration-500 ${
          phase === "after" ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-white/30 line-through">{before}</span>
        <span className="mx-1 text-white/30">→</span>
        <span className="text-white/45">{after}</span>
      </div>
    </div>
  );
};
