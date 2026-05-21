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
  const match = s.trim().match(/^([^\d.\-]*)(-?[\d,]+(?:\.\d+)?)([^\d.]*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (isNaN(num)) return null;
  return { prefix: match[1] ?? "", value: num, suffix: match[3] ?? "" };
};

const formatNumber = (current: number, target: number, targetRaw: string): string => {
  const decimals = targetRaw.includes(".")
    ? targetRaw.split(".")[1].replace(/[^\d]/g, "").length
    : 0;
  const fixed = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  const beforeParsed = parseValue(before);
  const afterParsed = parseValue(after);
  const canCountUp =
    !!beforeParsed && !!afterParsed && beforeParsed.suffix === afterParsed.suffix;

  // We keep `phase` as React state ONLY to drive the caption visibility (before → after).
  // The animated number itself is mutated via ref to avoid React re-rendering at 60fps,
  // which was causing perceived flicker / shimmer on the gradient text earlier.
  const [phase, setPhase] = useState<"before" | "after">("before");
  // `crossfadeDisplay` is used only when we can't count up (non-numeric / unit mismatch).
  // For count-up we never touch React state for the displayed string.
  const [crossfadeDisplay, setCrossfadeDisplay] = useState<string>(before);

  useEffect(() => {
    if (!inView) return;
    const holdMs = 450;
    const animMs = 1200;

    if (canCountUp && beforeParsed && afterParsed) {
      const from = beforeParsed.value;
      const to = afterParsed.value;
      const prefix = afterParsed.prefix;
      const suffix = afterParsed.suffix;
      const start = performance.now() + delay + holdMs;
      let raf = 0;
      let cancelled = false;
      const rawTarget = after;
      let lastText = before;

      // Make sure the DOM starts at the "before" value (the JSX renders `before` initially).
      const writeText = (next: string) => {
        if (numberRef.current && next !== lastText) {
          numberRef.current.textContent = next;
          lastText = next;
        }
      };

      const tick = (now: number) => {
        if (cancelled) return;
        if (now < start) {
          writeText(before);
          raf = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(1, (now - start) / animMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = from + (to - from) * eased;
        writeText(`${prefix}${formatNumber(current, to, rawTarget)}${suffix}`);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          writeText(after);
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
      setCrossfadeDisplay(after);
      setPhase("after");
    }, delay + holdMs);
    return () => window.clearTimeout(id);
  }, [inView, before, after, canCountUp, beforeParsed, afterParsed, delay]);

  const isCrossfade = !canCountUp;

  // Reserve width based on the longest of before/after so that count-up animations
  // (e.g. "0" → "12", "12" → "200") don't shift layout as digits gain a character.
  const widthAnchor = after.length >= before.length ? after : before;

  const renderNumber = (className: string) => {
    if (isCrossfade) {
      return (
        <motion.div
          key={crossfadeDisplay}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={className}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {crossfadeDisplay}
        </motion.div>
      );
    }
    return (
      <div
        ref={numberRef}
        className={className}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {before}
      </div>
    );
  };

  if (variant === "large") {
    return (
      <div ref={containerRef}>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">{label}</div>
        <div className="relative h-[44px] sm:h-[52px]">
          <span
            aria-hidden
            className="invisible inline-block text-3xl sm:text-4xl font-medium tabular-nums leading-none"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {widthAnchor}
          </span>
          {renderNumber(
            "absolute inset-0 flex items-center text-3xl sm:text-4xl font-medium text-white tabular-nums leading-none"
          )}
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

  return (
    <div ref={containerRef}>
      <div className="relative h-[28px] sm:h-[32px]">
        <span
          aria-hidden
          className="invisible inline-block text-xl sm:text-2xl font-medium tabular-nums leading-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {widthAnchor}
        </span>
        {renderNumber(
          "absolute inset-0 flex items-center text-xl sm:text-2xl font-medium text-white tabular-nums leading-none"
        )}
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
