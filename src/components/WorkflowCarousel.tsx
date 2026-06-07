import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  Zap,
  Sparkles,
  Mail,
  Database,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Phone,
  DollarSign,
  Package,
  User,
  FileText,
  Bell,
  Gauge,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
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
  calendar: Calendar,
  phone: Phone,
  dollar: DollarSign,
  package: Package,
  user: User,
  file: FileText,
  bell: Bell,
  gauge: Gauge,
  shopping: ShoppingCart,
};

const STEP_DURATION = 850;
const RESET_PAUSE = 1600;
const START_DELAY = 300;
const ROTATE_INTERVAL = 7200;

type Step = { label: string; sub: string; icon: string };
type Workflow = { id: string; name: string; sub: string; steps: Step[] };

const WorkflowSlide = ({
  workflow,
  isActive,
  liveLabel,
  doneLabel,
}: {
  workflow: Workflow;
  isActive: boolean;
  liveLabel: string;
  doneLabel: string;
}) => {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isActive) {
      setActiveStep(-1);
      return;
    }
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
        for (let i = 0; i < workflow.steps.length; i++) {
          setActiveStep(i);
          await wait(STEP_DURATION);
          if (cancelled) return;
        }
        setActiveStep(workflow.steps.length);
        await wait(RESET_PAUSE);
        if (cancelled) return;
      }
    };

    run();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [isActive, workflow]);

  const totalSteps = workflow.steps.length;
  const allDone = activeStep >= totalSteps;

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1d2a] to-[#0d0e16] overflow-hidden p-4 sm:p-6 shadow-[0_20px_60px_-15px_rgba(124,92,255,0.4)]">
      <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

      <div className="flex items-start justify-between mb-5 gap-3">
        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold text-white truncate">
            {workflow.name}
          </h4>
          <p className="text-[11px] text-white/45 mt-0.5 truncate">
            {workflow.sub}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isActive && allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-[#22c55e]"
            >
              <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
              {doneLabel}
            </motion.div>
          )}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-2.5 py-1 text-[10px] font-medium text-[#22c55e]">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-[#22c55e] ${
                isActive ? "animate-pulse" : ""
              }`}
            />
            {liveLabel}
          </div>
        </div>
      </div>

      <div
        className="flex items-start gap-1 overflow-x-auto -mx-2 px-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {workflow.steps.map((step, idx) => {
          const Icon = ICON_MAP[step.icon] || Sparkles;
          const isStepActive = isActive && idx === activeStep;
          const isCompleted = isActive && activeStep > idx;
          const isLast = idx === totalSteps - 1;

          return (
            <div key={idx} className="flex items-start flex-1 min-w-0">
              <div className="flex flex-col items-center text-center flex-shrink-0 w-[72px] sm:w-[88px]">
                <motion.div
                  className={[
                    "relative h-11 w-11 rounded-xl flex items-center justify-center border transition-colors duration-300",
                    isStepActive
                      ? "bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] border-[#A78BFA]"
                      : isCompleted
                      ? "bg-[#22c55e]/15 border-[#22c55e]/40"
                      : "bg-white/[0.03] border-white/10",
                  ].join(" ")}
                  animate={
                    isStepActive
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
                  transition={{
                    duration: 0.9,
                    repeat: isStepActive ? Infinity : 0,
                  }}
                >
                  <Icon
                    className={[
                      "h-5 w-5 transition-colors duration-300",
                      isStepActive
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
                    isStepActive
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
                    isStepActive ? "text-white/75" : "text-white/35",
                  ].join(" ")}
                >
                  {step.sub}
                </p>
              </div>

              {!isLast && (
                <div className="relative flex-1 min-w-[12px] h-0.5 mt-[22px] bg-white/[0.08] rounded-full overflow-hidden mx-1">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{
                      width: isCompleted ? "100%" : isStepActive ? "55%" : "0%",
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

export const WorkflowCarousel = () => {
  const { t } = useT();
  const data = t.aiAgents.workflowGallery;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const workflows = data?.workflows ?? [];
  const total = workflows.length;

  useEffect(() => {
    if (paused || total === 0) return;
    const timer = setInterval(() => {
      setCurrentIdx((i) => (i + 1) % total);
    }, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, total]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (total === 0) return;
      setCurrentIdx((i) => (i + dir + total) % total);
    },
    [total]
  );

  if (!data || total === 0) return null;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden px-2 sm:px-10">
        <motion.div
          className="flex"
          animate={{ x: `${-currentIdx * 100}%` }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
        >
          {workflows.map((wf, idx) => {
            const isActive = idx === currentIdx;
            return (
              <div key={wf.id} className="w-full flex-shrink-0 px-1 sm:px-2">
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.94,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="origin-center"
                >
                  <WorkflowSlide
                    workflow={wf}
                    isActive={isActive}
                    liveLabel={data.liveLabel}
                    doneLabel={data.doneLabel}
                  />
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous workflow"
        className="absolute left-0 top-[58%] -translate-y-1/2 z-10 inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur text-white/80 hover:bg-white/10 hover:text-white transition"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next workflow"
        className="absolute right-0 top-[58%] -translate-y-1/2 z-10 inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur text-white/80 hover:bg-white/10 hover:text-white transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="mt-6 flex justify-center gap-1.5">
        {workflows.map((wf, idx) => (
          <button
            key={wf.id}
            type="button"
            onClick={() => setCurrentIdx(idx)}
            aria-label={`Go to ${wf.name}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIdx
                ? "w-6 bg-white/85"
                : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
