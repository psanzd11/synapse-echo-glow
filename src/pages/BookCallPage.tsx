import { motion } from "framer-motion";
import { Calendar, Mail, Check, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const benefits = [
  "Free 30-minute strategy session",
  "Custom AI roadmap for your business",
  "Concrete first-step recommendations",
  "No commitment, no sales pressure",
];

const BookCallPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    challenge: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const subject = encodeURIComponent(`Strategy call request — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nChallenge / context:\n${form.challenge}`,
    );
    window.location.href = `mailto:viddixai@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#7C5CFF]/20 blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[500px] rounded-full bg-[#22D3EE]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-5">
              Book a Call
            </span>
            <h1 className="text-5xl sm:text-6xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
              Let's map your AI advantage.
            </h1>
            <p className="mt-5 text-white/65 text-lg leading-relaxed">
              Tell us about your business and what you're trying to solve. We'll come back within 24 hours with concrete next steps — and a free 30-minute strategy session if it's a fit.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/30">
                    <Check className="h-3.5 w-3.5 text-[#22D3EE]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:viddixai@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
              >
                <Mail className="h-4 w-4 text-[#22D3EE]" />
                viddixai@gmail.com
              </a>
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70">
                <Calendar className="h-4 w-4 text-[#A78BFA]" />
                Reply within 24h
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-8 sm:p-10"
          >
            <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 mb-5">
                  <Check className="h-6 w-6 text-[#22D3EE]" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Request sent.</h3>
                <p className="text-white/60 text-sm">
                  We'll get back to you at <span className="text-white">{form.email}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <Field label="Full name" required>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls}
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Work email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls}
                    placeholder="jane@company.com"
                  />
                </Field>
                <Field label="Company">
                  <input
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    className={inputCls}
                    placeholder="Acme Inc."
                  />
                </Field>
                <Field label="What are you trying to solve?" required>
                  <textarea
                    required
                    rows={4}
                    value={form.challenge}
                    onChange={(e) => set("challenge", e.target.value)}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us what's slowing your team down or where you'd like AI to help…"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-zinc-200 px-7 py-3.5 text-sm font-medium text-black hover:shadow-[0_0_50px_rgba(167,139,250,0.5)] transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Request My Strategy Call
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </section>
      <Footer />
    </main>
  );
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#A78BFA]/60 focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]/30 transition";

const Field = ({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="block">
    <span className="text-xs uppercase tracking-wider text-white/50 mb-1.5 inline-block">
      {label}
      {required && <span className="text-[#A78BFA]"> *</span>}
    </span>
    {children}
  </label>
);

export default BookCallPage;
