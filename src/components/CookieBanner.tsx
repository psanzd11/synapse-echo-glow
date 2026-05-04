import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "viddix-cookie-consent";

type Consent = "accepted" | "declined" | null;

const readConsent = (): Consent => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "declined") return v;
    return null;
  } catch {
    return null;
  }
};

const writeConsent = (v: Exclude<Consent, null>) => {
  try {
    localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* ignore */
  }
};

// Hook for analytics: when consent is "accepted", initialize your tracker here.
// Replace the placeholder with your real analytics setup (Plausible, GA4, Umami, etc.).
const onAccept = () => {
  // Example (Plausible — replace with your domain and uncomment):
  // const s = document.createElement("script");
  // s.defer = true;
  // s.dataset.domain = "viddix.ai";
  // s.src = "https://plausible.io/js/script.js";
  // document.head.appendChild(s);
};

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === null) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
    if (consent === "accepted") onAccept();
  }, []);

  const accept = () => {
    writeConsent("accepted");
    onAccept();
    setVisible(false);
  };

  const decline = () => {
    writeConsent("declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[60] sm:max-w-md"
        >
          <div className="rounded-2xl border border-white/10 bg-black/85 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] p-5">
            <div className="flex items-start gap-3">
              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-white/10">
                <Cookie className="h-4 w-4 text-[#A78BFA]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">We use a few cookies.</p>
                <p className="mt-1 text-xs text-white/60 leading-relaxed">
                  We use a small set of cookies and analytics to understand how the site is used. See our{" "}
                  <Link to="/privacy" className="text-[#22D3EE] hover:underline">
                    privacy policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
              <button
                type="button"
                onClick={decline}
                aria-label="Close"
                className="text-white/40 hover:text-white/80 transition-colors -mr-1 -mt-1 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={accept}
                className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-white to-zinc-200 px-4 py-2 text-xs font-medium text-black hover:shadow-[0_0_30px_rgba(167,139,250,0.4)] transition-all"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={decline}
                className="flex-1 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors"
              >
                Decline non-essential
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
