import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoVideo } from "./LogoVideo";

const links = [
  { label: "Services", to: "/services" },
  { label: "AI Agents", to: "/ai-agents" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="mx-auto max-w-7xl rounded-3xl md:rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-medium tracking-tight text-lg">
            <LogoVideo className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(124,92,255,0.55)]" />
            Viddix<span className="text-white/60 font-normal">AI</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 text-sm">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className={[
                      "relative px-4 py-2 rounded-full transition-colors",
                      active ? "text-white" : "text-white/60 hover:text-white",
                    ].join(" ")}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#7C5CFF] via-white/10 to-[#22D3EE]"
                        style={{
                          WebkitMask:
                            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/book"
              className="hidden sm:inline-flex text-sm font-medium text-black bg-gradient-to-b from-white to-zinc-300 hover:from-white hover:to-white transition-all px-4 py-2 rounded-full shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset]"
            >
              Book a Call
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <ul className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1 text-sm">
                {links.map((l) => {
                  const active = pathname === l.to;
                  return (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className={[
                          "block px-4 py-2.5 rounded-xl transition-colors",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                        ].join(" ")}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="mt-2">
                  <Link
                    to="/book"
                    className="block w-full text-center text-sm font-medium text-black bg-gradient-to-b from-white to-zinc-300 px-4 py-2.5 rounded-full"
                  >
                    Book a Call
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
