import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  CheckSquare,
  Inbox,
  Sparkles,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquare,
  Mail,
  Lock,
  Send,
  Check,
  Shield,
} from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const VIEW_DURATION = 5500;
const VIEWS = [
  "briefing",
  "callHandling",
  "messageReply",
  "emailDraft",
  "calendar",
  "privacy",
] as const;
type View = (typeof VIEWS)[number];

export const AIAssistantPreview = () => {
  const { t } = useT();
  const aa = t.aiAgents.aiAssistant;
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setViewIndex((i) => (i + 1) % VIEWS.length);
    }, VIEW_DURATION);
    return () => clearInterval(timer);
  }, []);

  if (!aa || !aa.labels) {
    return (
      <div className="relative w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1d2a] to-[#0d0e16] min-h-[460px] flex items-center justify-center p-6">
        <div className="text-center">
          <Sparkles className="h-6 w-6 mx-auto mb-2 text-[#A78BFA]" />
          <p className="text-white/70 text-sm font-medium">AI Assistant</p>
        </div>
      </div>
    );
  }

  const view: View = VIEWS[viewIndex];

  const labelConfig: Record<View, { text: string; color: string }> = {
    briefing: { text: aa.labels.briefing, color: "#A78BFA" },
    callHandling: { text: aa.labels.callHandling, color: "#22D3EE" },
    messageReply: { text: aa.labels.messageReply, color: "#22c55e" },
    emailDraft: { text: aa.labels.emailDraft, color: "#A78BFA" },
    calendar: { text: aa.labels.calendar, color: "#22D3EE" },
    privacy: { text: aa.labels.privacy, color: "#22c55e" },
  };

  const labelIcons: Record<View, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    briefing: Sparkles,
    callHandling: PhoneIncoming,
    messageReply: MessageSquare,
    emailDraft: Mail,
    calendar: Calendar,
    privacy: Lock,
  };

  const current = labelConfig[view];
  const LabelIcon = labelIcons[view];

  return (
    <div className="relative w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1d2a] to-[#0d0e16] overflow-hidden shadow-[0_20px_60px_-15px_rgba(124,92,255,0.4)] min-h-[460px]">
      <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent z-10" />

      <div className="relative px-5 pt-4 pb-3 border-b border-white/5 flex items-center justify-between z-10">
        <span className="text-[12px] font-semibold tracking-tight text-white/85">
          {aa.headerLabel}
        </span>
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[9px] font-medium text-white/85"
        >
          <LabelIcon className="h-2.5 w-2.5" style={{ color: current.color }} />
          {current.text}
        </motion.div>
      </div>

      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        {view === "briefing" && <BriefingView />}
        {view === "callHandling" && <CallHandlingView />}
        {view === "messageReply" && <MessageReplyView />}
        {view === "emailDraft" && <EmailDraftView />}
        {view === "calendar" && <CalendarView />}
        {view === "privacy" && <PrivacyView />}
      </motion.div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {VIEWS.map((_, idx) => (
          <span
            key={idx}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === viewIndex ? "w-4 bg-white/85" : "w-1 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const BriefingView = () => {
  const { t } = useT();
  const data = t.aiAgents.aiAssistant?.briefing;
  if (!data) return null;

  let step = 0;
  const next = () => 0.1 + step++ * 0.1;

  return (
    <div className="p-5 pb-10 space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: next() }}
      >
        <h4 className="text-[15px] font-medium text-white">{data.greeting}</h4>
        <p className="text-[11px] text-white/45 mt-0.5">{data.date}</p>
      </motion.div>

      <div>
        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: next() }}
          className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#A78BFA] mb-1.5"
        >
          <Calendar className="h-3 w-3" strokeWidth={2.5} />
          {data.todayLabel}
        </motion.h5>
        <ul className="space-y-1">
          {data.todayItems.map((event, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: next() }}
              className="flex items-center gap-2.5 text-[11px] text-white/85"
            >
              <span className="text-white/45 font-medium tabular-nums w-10 shrink-0">
                {event.time}
              </span>
              <span className="truncate">{event.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: next() }}
          className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#22D3EE] mb-1.5"
        >
          <CheckSquare className="h-3 w-3" strokeWidth={2.5} />
          {data.prioritiesLabel}
        </motion.h5>
        <ul className="space-y-1">
          {data.priorities.map((p, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: next() }}
              className="flex items-start gap-2.5 text-[11px] text-white/85"
            >
              <span className="h-3 w-3 rounded-[3px] border border-white/30 mt-0.5 shrink-0" />
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <motion.h5
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: next() }}
          className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#22c55e] mb-1.5"
        >
          <Inbox className="h-3 w-3" strokeWidth={2.5} />
          {data.inboxLabel}
        </motion.h5>
        <ul className="space-y-1">
          {data.inboxItems.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: next() }}
              className="flex items-center gap-2.5 text-[11px] text-white/85"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] shrink-0" />
              <span className="truncate">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CallHandlingView = () => {
  const { t } = useT();
  const data = t.aiAgents.aiAssistant?.callHandling;
  const [phase, setPhase] = useState<"inbound" | "outbound">("inbound");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("outbound"), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  return (
    <div className="p-5 pb-12 min-h-[400px]">
      {phase === "inbound" ? (
        <motion.div
          key="inbound"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#22D3EE] mb-4">
            <PhoneIncoming className="h-3 w-3" strokeWidth={2.5} />
            {data.incomingLabel}
          </div>

          <div className="relative flex items-center justify-center mb-5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute h-16 w-16 rounded-full border border-white/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
              />
            ))}
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] flex items-center justify-center text-xl font-medium text-white shadow-[0_0_20px_rgba(124,92,255,0.4)]">
              {data.inbound.initial}
            </div>
          </div>

          <h4 className="text-[16px] font-medium text-white mb-1">
            {data.inbound.caller}
          </h4>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-4 w-full max-w-[260px] rounded-xl border border-[#22D3EE]/25 bg-[#22D3EE]/[0.06] px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#22D3EE] mb-1">
              <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
              {data.inbound.summaryLabel}
            </div>
            <p className="text-[11px] text-white/85 leading-snug">
              {data.inbound.summary}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-4 flex gap-2 w-full max-w-[260px]"
          >
            <button className="flex-1 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[10px] font-medium text-white">
              {data.inbound.action1}
            </button>
            <button className="flex-1 rounded-full bg-gradient-to-br from-[#7C5CFF]/40 to-[#22D3EE]/30 border border-[#A78BFA]/40 px-3 py-1.5 text-[10px] font-medium text-white shadow-[0_0_15px_rgba(124,92,255,0.35)]">
              {data.inbound.action2}
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="outbound"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#22c55e] mb-4">
            <PhoneOutgoing className="h-3 w-3" strokeWidth={2.5} />
            {data.outgoingLabel}
          </div>

          <div className="relative flex items-center justify-center mb-5">
            <motion.span
              className="absolute h-16 w-16 rounded-full bg-[#22c55e]/15"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#22c55e] to-[#22D3EE] flex items-center justify-center text-xl font-medium text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              {data.outbound.initial}
            </div>
          </div>

          <h4 className="text-[16px] font-medium text-white mb-0.5">
            {data.outbound.callee}
          </h4>
          <p className="text-[10px] text-white/55 mb-1">
            {data.outbound.onBehalfLabel}
          </p>
          <p className="text-[20px] font-light tabular-nums text-white tracking-wider mb-3">
            {data.outbound.timer}
          </p>

          <div className="flex items-center gap-0.5 h-6 mb-3">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-0.5 rounded-full bg-[#22c55e]/70"
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{
                  duration: 0.8 + (i % 3) * 0.2,
                  repeat: Infinity,
                  delay: i * 0.07,
                  ease: "easeInOut",
                }}
                style={{ height: "30%" }}
              />
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 max-w-[260px]">
            <p className="text-[11px] text-white/80 leading-snug text-center">
              {data.outbound.purpose}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MessageReplyView = () => {
  const { t } = useT();
  const data = t.aiAgents.aiAssistant?.messageReply;
  const typed = useTypewriter(data?.drafted ?? "", 22, 1400);

  if (!data) return null;

  return (
    <div className="p-5 pb-12 min-h-[400px]">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] flex items-center justify-center text-[12px] font-medium text-white">
          {data.initial}
        </div>
        <div>
          <p className="text-[13px] font-medium text-white">{data.contact}</p>
          <p className="text-[9px] text-[#22c55e]">online</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex justify-start mb-3"
      >
        <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white/[0.08] border border-white/5 px-3 py-2 text-[11.5px] text-white/90">
          {data.incoming}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#A78BFA] mb-2 mt-4"
      >
        <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
        {data.draftingLabel}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.3 }}
        className="flex justify-end mb-4"
      >
        <div className="max-w-[82%] rounded-2xl rounded-br-sm bg-[#7C5CFF]/30 border border-[#A78BFA]/35 px-3 py-2 text-[11.5px] text-white">
          {typed}
          <span className="inline-block w-0.5 h-3 bg-white/70 ml-0.5 align-middle animate-pulse" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.3 }}
        className="flex justify-end"
      >
        <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] px-4 py-1.5 text-[11px] font-medium text-white shadow-[0_0_18px_rgba(124,92,255,0.45)]">
          <Send className="h-3 w-3" strokeWidth={2.5} />
          {data.sendLabel}
        </button>
      </motion.div>
    </div>
  );
};

const EmailDraftView = () => {
  const { t } = useT();
  const data = t.aiAgents.aiAssistant?.emailDraft;
  const typedBody = useTypewriter(data?.body ?? "", 16, 1200);

  if (!data) return null;

  return (
    <div className="p-5 pb-12 min-h-[400px]">
      <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-[#A78BFA] mb-3">
        <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
        {data.composingLabel}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5"
      >
        <span className="text-[10px] font-medium text-white/45 w-12 shrink-0">
          {data.toLabel}
        </span>
        <span className="text-[11px] text-white/90">{data.to}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5"
      >
        <span className="text-[10px] font-medium text-white/45 w-12 shrink-0">
          {data.subjectLabel}
        </span>
        <span className="text-[11px] font-medium text-white">{data.subject}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-[11.5px] text-white/85 leading-relaxed whitespace-pre-line min-h-[100px] mb-4"
      >
        {typedBody}
        <span className="inline-block w-0.5 h-3 bg-white/70 ml-0.5 align-middle animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 0.3 }}
        className="flex justify-end"
      >
        <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] px-4 py-1.5 text-[11px] font-medium text-white shadow-[0_0_18px_rgba(124,92,255,0.45)]">
          <Send className="h-3 w-3" strokeWidth={2.5} />
          {data.sendLabel}
        </button>
      </motion.div>
    </div>
  );
};

const CalendarView = () => {
  const { t } = useT();
  const data = t.aiAgents.aiAssistant?.calendar;
  if (!data) return null;

  const existing = [
    { day: 0, start: 0, span: 1 },
    { day: 2, start: 2, span: 2 },
    { day: 3, start: 1, span: 1 },
    { day: 4, start: 4, span: 1 },
  ];

  return (
    <div className="p-5 pb-12 min-h-[400px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-white/70">
          {data.weekLabel}
        </span>
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.4 }}
          className="inline-flex items-center gap-1 rounded-full border border-[#22c55e]/35 bg-[#22c55e]/10 px-2 py-0.5 text-[9px] font-medium text-[#22c55e]"
        >
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
          {data.scheduledLabel}
        </motion.div>
      </div>

      <div className="grid grid-cols-5 gap-1 mb-1">
        {data.weekDays.map((d, idx) => (
          <div
            key={idx}
            className={`text-center text-[9px] font-semibold uppercase tracking-wider ${
              idx === 1 ? "text-[#A78BFA]" : "text-white/40"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-5 gap-1 h-[240px]">
        {data.weekDays.map((_, dayIdx) => (
          <div
            key={dayIdx}
            className="relative bg-white/[0.02] border border-white/5 rounded-md"
          />
        ))}

        {existing.map((e, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
            className="absolute rounded bg-white/15 border border-white/15"
            style={{
              left: `${(e.day / 5) * 100}%`,
              width: `${(1 / 5) * 100}%`,
              top: `${(e.start / 6) * 100}%`,
              height: `${(e.span / 6) * 100}%`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="absolute rounded bg-[#22D3EE]/15 border border-[#22D3EE]/40 flex items-center justify-center"
          style={{
            left: `${(3 / 5) * 100}%`,
            width: `${(1 / 5) * 100}%`,
            top: `${(3 / 6) * 100}%`,
            height: `${(2 / 6) * 100}%`,
          }}
        >
          <span className="text-[8px] font-semibold text-[#22D3EE]">
            {data.focusBlock}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80, y: -10, scale: 1.1 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
          className="absolute rounded bg-gradient-to-br from-[#7C5CFF] to-[#A78BFA] border border-[#A78BFA]/60 shadow-[0_4px_20px_rgba(124,92,255,0.55)] flex items-center justify-center px-1"
          style={{
            left: `${(1 / 5) * 100}%`,
            width: `${(1 / 5) * 100}%`,
            top: `${(2 / 6) * 100}%`,
            height: `${(1 / 6) * 100}%`,
          }}
        >
          <span className="text-[8px] font-semibold text-white leading-tight text-center truncate">
            {data.incomingEventName}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

const PrivacyView = () => {
  const { t } = useT();
  const data = t.aiAgents.aiAssistant?.privacy;
  if (!data) return null;

  return (
    <div className="p-5 pb-12 min-h-[400px] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mt-4 mb-5"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#22c55e]/20 blur-2xl"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-[#22c55e]/25 to-[#22D3EE]/15 border border-[#22c55e]/40 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.4)]">
          <Lock className="h-7 w-7 text-white" strokeWidth={2.2} />
        </div>
      </motion.div>

      <motion.h4
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-[16px] font-medium text-white text-center mb-1"
      >
        {data.title}
      </motion.h4>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="text-[11px] text-white/50 text-center mb-5"
      >
        {data.subtitle}
      </motion.p>

      <ul className="w-full max-w-[280px] space-y-2">
        {data.points.map((point, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + idx * 0.12, duration: 0.3 }}
            className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#22c55e]/15 border border-[#22c55e]/35 shrink-0">
              <Check className="h-3 w-3 text-[#22c55e]" strokeWidth={3} />
            </span>
            <span className="text-[11.5px] text-white/85">{point}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
        className="mt-auto flex items-center gap-1 text-[9px] text-white/40"
      >
        <Shield className="h-2.5 w-2.5" />
        Viddix AI
      </motion.div>
    </div>
  );
};

function useTypewriter(fullText: string, msPerChar = 20, startDelay = 0) {
  const [text, setText] = useState("");
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    setText("");
    if (!fullText) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      if (cancelledRef.current) return;
      let i = 0;
      interval = setInterval(() => {
        if (cancelledRef.current) {
          if (interval) clearInterval(interval);
          return;
        }
        i++;
        setText(fullText.slice(0, i));
        if (i >= fullText.length && interval) clearInterval(interval);
      }, msPerChar);
    }, startDelay);

    return () => {
      cancelledRef.current = true;
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [fullText, msPerChar, startDelay]);

  return text;
}
