import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useT } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useT();

  useEffect(() => {
    console.error("404: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,92,255,0.12),transparent_60%)]" />
        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A78BFA] mb-6">404</p>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent mb-4">
            {t.notFound.heading}
          </h1>
          <p className="text-white/60 mb-10 max-w-sm mx-auto">{t.notFound.desc}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.notFound.back}
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
