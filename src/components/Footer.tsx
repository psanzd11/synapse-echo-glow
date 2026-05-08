import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { LogoVideo } from "./LogoVideo";
import { useT } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useT();

  const nav = [
    { label: t.nav.services, to: "/services" },
    { label: t.nav.aiAgents, to: "/ai-agents" },
    { label: t.nav.caseStudies, to: "/case-studies" },
    { label: t.nav.pricing, to: "/pricing" },
    { label: t.nav.about, to: "/about" },
    { label: t.nav.bookCall, to: "/book" },
  ];

  const legal = [
    { label: t.footer.privacy, to: "/privacy" },
    { label: t.footer.terms, to: "/terms" },
  ];

  return (
    <footer className="relative bg-black text-white border-t border-white/10 px-6 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white font-medium tracking-tight text-lg"
            >
              <LogoVideo className="h-9 w-9 object-contain" />
              Viddix<span className="text-white/60 font-normal">AI</span>
            </Link>
            <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-sm">
              {t.footer.blurb}
            </p>
            <a
              href="mailto:viddixai@gmail.com"
              className="inline-flex items-center gap-2 mt-5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4 text-[#22D3EE]" />
              viddixai@gmail.com
            </a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
              {t.footer.navigate}
            </h4>
            <ul className="space-y-2.5">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2.5">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>{t.footer.copyright(new Date().getFullYear())}</p>
          <p>{t.footer.remote}</p>
        </div>
      </div>
    </footer>
  );
};
