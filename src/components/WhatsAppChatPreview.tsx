import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, Send } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

type Msg = { from: "bot" | "user"; text: string; time: string };
type DisplayMsg = Msg & { receiptVisible: boolean };

// Parse **bold** and \n in message text
function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part === "\n") return <br key={i} />;
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export const WhatsAppChatPreview = () => {
  const { t } = useT();
  const chat = t.aiAgents.whatsappChat;
  const messages = chat.messages as Msg[];

  const [visible, setVisible] = useState<DisplayMsg[]>([]);
  const [typing, setTyping] = useState<"bot" | "user" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Conversation loop with realistic timing
  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
      });

    (async () => {
      while (!cancelled) {
        setVisible([]);
        setTyping(null);
        await wait(900);
        if (cancelled) return;

        for (let i = 0; i < messages.length; i++) {
          const m = messages[i];
          if (m.from === "bot") {
            // Bot typing — length-proportional delay
            setTyping("bot");
            const typeDelay = Math.min(700 + m.text.length * 22, 2000);
            await wait(typeDelay);
            if (cancelled) return;
            setTyping(null);
            await wait(90);
            if (cancelled) return;
            setVisible((prev) => [...prev, { ...m, receiptVisible: false }]);
          } else {
            // User typing — quicker than bot
            setTyping("user");
            await wait(420 + Math.random() * 180);
            if (cancelled) return;
            setTyping(null);
            await wait(80);
            if (cancelled) return;
            setVisible((prev) => [...prev, { ...m, receiptVisible: false }]);
            // Read receipt arrives after a beat
            await wait(450);
            if (cancelled) return;
            setVisible((prev) =>
              prev.map((p, idx) =>
                idx === prev.length - 1 ? { ...p, receiptVisible: true } : p,
              ),
            );
          }
          // Inter-message micro-pause
          await wait(380 + Math.random() * 220);
        }

        // Pause before looping
        await wait(4500);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [messages]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visible, typing]);

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-[#0b0b10]/85 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_-15px_rgba(124,92,255,0.35)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] flex items-center justify-center text-sm font-medium text-white">
          {chat.botInitial}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#22c55e] border-2 border-[#0b0b10]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{chat.botName}</p>
          <p className="text-[10px] text-[#22c55e]">● {chat.status}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#22c55e] shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          {chat.liveLabel}
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="px-3 py-3 h-[340px] overflow-y-auto overflow-x-hidden flex flex-col gap-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        <div className="flex justify-center mb-1">
          <span className="text-[10px] text-white/40 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
            {chat.todayLabel}
          </span>
        </div>

        {visible.map((m, i) => (
          <motion.div
            key={`${i}-${m.time}-${m.text.slice(0, 8)}`}
            initial={
              m.from === "user"
                ? { opacity: 0, x: 14 }
                : { opacity: 0, y: 8, scale: 0.96 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "max-w-[82%] rounded-2xl px-3 py-2 text-xs leading-snug",
                m.from === "user"
                  ? "bg-[#7C5CFF]/35 text-white rounded-br-sm border border-[#A78BFA]/30"
                  : "bg-white/[0.08] text-white/90 rounded-bl-sm border border-white/5",
              ].join(" ")}
            >
              <span className="break-words">{renderText(m.text)}</span>
              <span className="inline-flex items-center gap-1 ml-1.5 text-[9px] text-white/45 whitespace-nowrap align-baseline">
                {m.time}
                {m.from === "user" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                      opacity: m.receiptVisible ? 1 : 0,
                      scale: m.receiptVisible ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex text-[#22D3EE]"
                  >
                    <Check className="h-2.5 w-2.5 -mr-1.5" strokeWidth={3} />
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </motion.span>
                )}
              </span>
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div
            key={`typing-${typing}`}
            initial={{ opacity: 0, y: 6, x: typing === "user" ? 8 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${typing === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "rounded-2xl px-3 py-2.5 flex gap-1",
                typing === "user"
                  ? "bg-[#7C5CFF]/35 border border-[#A78BFA]/30 rounded-br-sm"
                  : "bg-white/[0.08] border border-white/5 rounded-bl-sm",
              ].join(" ")}
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-white/60"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{
                    duration: typing === "user" ? 0.55 : 0.9,
                    repeat: Infinity,
                    delay: d * (typing === "user" ? 0.09 : 0.15),
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Fake input */}
      <div className="px-3 py-2.5 border-t border-white/10 bg-white/[0.02] flex items-center gap-2">
        <div className="flex-1 rounded-full bg-white/[0.04] border border-white/5 px-3.5 py-1.5">
          <span className="text-[11px] text-white/35">{chat.inputPlaceholder}</span>
        </div>
        <div
          aria-hidden
          className="h-7 w-7 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#22D3EE] flex items-center justify-center opacity-80 shadow-[0_0_15px_rgba(124,92,255,0.4)]"
        >
          <Send className="h-3 w-3 text-white" />
        </div>
      </div>
    </div>
  );
};
