import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

export const Pricing = () => {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: t.pricing.budgets[0],
    timeline: t.pricing.timelines[1],
    details: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const subject = encodeURIComponent(`Proposal request — ${form.company || form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nBudget range: ${form.budget}\nTimeline: ${form.timeline}\n\nProject details:\n${form.details}`,
    );
    window.location.href = `mailto:viddixai@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="pricing" className="relative bg-black text-white py-32 px-6 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
            {t.pricing.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {t.pricing.heading}
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg">{t.pricing.subtext}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-xl p-8 sm:p-10"
        >
          <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

          {submitted ? (
            <div className="text-center py-16">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 mb-5">
                <Check className="h-6 w-6 text-[#22D3EE]" />
              </div>
              <h3 className="text-2xl font-medium mb-2">{t.pricing.successTitle}</h3>
              <p className="text-white/60 text-sm">
                {t.pricing.successDescPrefix}{" "}
                <span className="text-white">{form.email}</span>{" "}
                {t.pricing.successDescSuffix}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t.pricing.formName} required>
                <input
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputCls}
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label={t.pricing.formEmail} required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls}
                  placeholder="jane@company.com"
                />
              </Field>
              <Field label={t.pricing.formCompany} className="sm:col-span-2">
                <input
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={inputCls}
                  placeholder="Acme Inc."
                />
              </Field>

              <Field label={t.pricing.formBudget}>
                <div className="flex flex-wrap gap-2">
                  {t.pricing.budgets.map((b) => (
                    <Chip key={b} active={form.budget === b} onClick={() => set("budget", b)}>
                      {b}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label={t.pricing.formTimeline}>
                <div className="flex flex-wrap gap-2">
                  {t.pricing.timelines.map((tl) => (
                    <Chip key={tl} active={form.timeline === tl} onClick={() => set("timeline", tl)}>
                      {tl}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label={t.pricing.formDetails} className="sm:col-span-2">
                <textarea
                  rows={4}
                  value={form.details}
                  onChange={(e) => set("details", e.target.value)}
                  className={`${inputCls} resize-none`}
                  placeholder={t.pricing.formDetailsPlaceholder}
                />
              </Field>

              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-white/40">{t.pricing.formDisclaimer}</p>
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-zinc-200 px-7 py-3 text-sm font-medium text-black hover:shadow-[0_0_50px_rgba(167,139,250,0.5)] transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {t.pricing.formSubmit}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#A78BFA]/60 focus:outline-none focus:ring-2 focus:ring-[#7C5CFF]/30 transition";

const Field = ({
  label,
  children,
  className = "",
  required,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) => (
  <label className={`block ${className}`}>
    <span className="mb-2 block text-xs uppercase tracking-wider text-white/50">
      {label} {required && <span className="text-[#A78BFA]">*</span>}
    </span>
    {children}
  </label>
);

const Chip = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "rounded-full border px-3.5 py-1.5 text-xs transition-all",
      active
        ? "border-[#A78BFA]/60 bg-[#7C5CFF]/15 text-white shadow-[0_0_20px_rgba(124,92,255,0.25)]"
        : "border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-white/20",
    ].join(" ")}
  >
    {children}
  </button>
);
