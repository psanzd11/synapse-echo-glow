import { motion } from "framer-motion";
import {
  Phone,
  Signal,
  Wifi,
  BellOff,
  Lock,
  MessageSquare,
  Voicemail,
} from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

export const IPhoneCallPreview = () => {
  const { t } = useT();
  const call = t.aiAgents.iphoneCall;

  return (
    <div
      className="relative w-full max-w-[280px] mx-auto rounded-[2.25rem] border border-white/10 overflow-hidden shadow-[0_25px_70px_-15px_rgba(34,211,238,0.4)]"
      style={{ aspectRatio: "10 / 14" }}
    >
      {/* Background — dark iOS-like gradient with subtle radial */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a4151] via-[#262731] to-[#10111a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,92,255,0.10),transparent_60%)]" />

      {/* Status bar */}
      <div className="relative flex justify-between items-center px-5 pt-3 text-[11px] font-semibold text-white z-10">
        <div className="flex items-center gap-1.5">
          <span>9:41</span>
          <BellOff className="h-3 w-3" strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-1">
          <Signal className="h-3 w-3" strokeWidth={2.5} />
          <Wifi className="h-3 w-3" strokeWidth={2.5} />
          <div className="relative ml-0.5 flex items-center">
            <div className="relative h-3 w-5 rounded-[3px] border border-white/80 flex items-center px-[1px]">
              <div className="h-1.5 w-[80%] rounded-[1px] bg-white" />
            </div>
            <div className="ml-0.5 h-1 w-[1.5px] bg-white/80 rounded-r-sm" />
            <span className="ml-1 text-[8.5px] font-semibold leading-none">80</span>
          </div>
        </div>
      </div>

      {/* Dynamic Island with lock icon */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 h-6 w-[88px] rounded-full bg-black flex items-center justify-center z-20">
        <Lock className="h-3 w-3 text-white/85" strokeWidth={2.5} fill="currentColor" />
      </div>

      {/* Caller info — close to top, no empty middle */}
      <div className="relative flex flex-col items-center mt-9 text-white px-4 z-10">
        <span className="text-[12px] text-white/55 mb-1 tracking-wide">
          {call.subtitle}
        </span>
        <h3 className="text-[22px] font-semibold tracking-tight text-center leading-tight">
          {call.callerName}
        </h3>
      </div>

      {/* Bottom area — pushed to bottom */}
      <div className="absolute bottom-0 inset-x-0 px-5 pb-4 z-10">
        {/* Message + Voicemail */}
        <div className="flex justify-around mb-4 px-2">
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
              <MessageSquare className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] text-white/75">{call.message}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-10 w-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-sm">
              <Voicemail className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-[10px] text-white/75">{call.voicemail}</span>
          </div>
        </div>

        {/* Slide-to-demo pill */}
        <div className="relative h-12 w-full rounded-full bg-white/[0.07] border border-white/10 overflow-hidden backdrop-blur-sm">
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[12px] text-white/50 font-medium pl-12"
            animate={{ opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {call.slideText}
          </motion.span>
          <motion.div
            className="absolute top-1 left-1 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            initial={{ x: 0 }}
            animate={{ x: [0, 184, 0] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.55, 1],
            }}
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} fill="#34C759" color="#34C759" />
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="mt-2 mx-auto h-1 w-24 rounded-full bg-white/55" />
      </div>
    </div>
  );
};
