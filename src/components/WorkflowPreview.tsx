import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Zap,
  Sparkles,
  Mail,
  Database,
  MessageSquare,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  sparkles: Sparkles,
  mail: Mail,
  database: Database,
  message: MessageSquare,
  check: CheckCircle2,
};

const STEP_DURATION = 900;
const RESET_PAUSE = 2200;
const START_DELAY = 400;

export const WorkflowPreview = () => {
  const { t } = useT();
  const data = t.aiAgents.workflowPreview;
  // -1 = idle (all pending); 0..len-1 = active step; len = all done (all green)
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!data) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(() => resolve(), ms);
      });

    const run = async () => {
      while (!cancelled) {
        setActiveStep(-1);
        await wait(START_DELAY);
        if (cancelled) return;
        for (let i = 0; i < data.steps.length; i++) {
          setActiveStep(i);
          await wait(STEP_DURATION);
          if (cancelled) return;
        }
        // All-done phase
        setActiveStep(data.steps.length);
        await wait(RESET_PAUSE);
        if (cancelled) return;
      }
    };

    run();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [data]);

  if (!data) return null;

  const totalSteps = data.steps.length;
  const allDone = activeStep >= totalSteps;

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1d2a] to-[#0d0e16] overflow-hidden p-6 shadow-[0_20px_60px_-15px_rgba(124,92,255,0.4)]">
      {/* Top accent */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-2.5 py-1 text-[10px] font-medium text-[#22c55e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          {data.liveLabel}
        </div>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1 text-[10px] font-medium text-[#22c55e]"
          >
            <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
            {totalSteps} steps {data.doneLabel}
          </motion.div>
        )}
      </div>

      {/* Pipeline */}
      <div className="flex items-start gap-1">
        {data.steps.map((step, idx) => {
          const Icon = ICON_MAP[step.icon] || Sparkles;
          const isActive = idx === activeStep;
          const isCompleted = activeStep > idx;
          const isLast = idx === totalSteps - 1;

          return (
            <div key={idx} className="flex items-start flex-1 min-w-0">
              {/* Node */}
              <div className="flex flex-col items-center text-center flex-shrink-0 w-[88px]">
                <motion.div
                  className={[
                    "relative h-11 w-11 rounded-xl flex items-center justify-center border transition-colors duration-300",
                    isActive
                      ? "bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] border-[#A78BFA]"
                      : isCompleted
                      ? "bg-[#22c55e]/15 border-[#22c55e]/40"
                      : "bg-white/[0.03] border-white/10",
                  ].join(" ")}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.12, 1],
                          boxShadow: [
                            "0 0 0 rgba(124,92,255,0)",
                            "0 0 28px rgba(124,92,255,0.55)",
                            "0 0 0 rgba(124,92,255,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 0.9, repeat: isActive ? Infinity : 0 }}
                >
                  <Icon
                    className={[
                      "h-5 w-5 transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : isCompleted
                        ? "text-[#22c55e]"
                        : "text-white/40",
                    ].join(" ")}
                    strokeWidth={2.2}
                  />
                </motion.div>
                <p
                  className={[
                    "mt-2.5 text-[10.5px] font-semibold tracking-tight transition-colors duration-300 truncate w-full",
                    isActive
                      ? "text-white"
                      : isCompleted
                      ? "text-[#22c55e]"
                      : "text-white/65",
                  ].join(" ")}
                >
                  {step.label}
                </p>
                <p
                  className={[
                    "text-[9.5px] mt-0.5 leading-tight transition-colors duration-300 w-full px-1",
                    isActive ? "text-white/75" : "text-white/35",
                  ].join(" ")}
                >
                  {step.sub}
                </p>
              </div>

              {/* Connector — aligned to vertical center of icon (icon h-11 = 44px, center = 22px) */}
              {!isLast && (
                <div className="relative flex-1 min-w-[12px] h-0.5 mt-[22px] bg-white/[0.08] rounded-full overflow-hidden mx-1">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: isCompleted ? "100%" : isActive ? "55%" : "0%",
                    }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7C5CFF] via-[#A78BFA] to-[#22D3EE]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
