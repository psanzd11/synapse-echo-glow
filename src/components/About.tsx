import { motion } from "framer-motion";
import { Mail, Globe, Sparkles } from "lucide-react";
import { LogoVideo } from "./LogoVideo";

const values = [
  {
    title: "AI-native by default",
    desc: "We don't bolt AI onto old workflows. We rebuild them around it.",
  },
  {
    title: "Ship fast, measure faster",
    desc: "Production deployments in weeks, with metrics tied directly to revenue.",
  },
  {
    title: "Partners, not vendors",
    desc: "We embed with your team and own outcomes — not just deliverables.",
  },
];

export const About = () => {
  return (
    <section id="about" className="relative bg-black text-white py-32 px-6 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.06),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
            About Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent leading-[1.05]">
            We're Viddix AI — your full-stack AI partner.
          </h2>
          <p className="mt-6 text-white/65 text-base sm:text-lg leading-relaxed">
            Viddix AI is a modern AI agency for businesses that want to move faster, sell more,
            and operate leaner. We design, build, and deploy custom AI systems — voice agents,
            workflow automations, research engines — alongside custom SaaS platforms and
            category-defining marketing strategy, engineered to generate measurable revenue
            and remove manual work for good.
          </p>
          <p className="mt-4 text-white/55 text-base leading-relaxed">
            From founders to operations leads, our clients trust us to ship AI that works in
            production — not demos. We embed with your team, scope what truly matters, and
            deliver fast.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:viddixai@gmail.com"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-white to-zinc-200 px-6 py-3 text-sm font-medium text-black hover:shadow-[0_0_40px_rgba(167,139,250,0.4)] transition-all"
            >
              <Mail className="h-4 w-4" />
              viddixai@gmail.com
            </a>
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
            >
              Book a Call
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] backdrop-blur-xl p-8 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#7C5CFF]/30 blur-3xl" />
            <div className="relative flex items-center gap-4 mb-8">
              <LogoVideo className="h-16 w-16 object-contain" />
              <div>
                <div className="text-lg font-medium">Viddix AI</div>
                <div className="text-xs text-white/50">Engineered for businesses that move fast</div>
              </div>
            </div>

            <ul className="relative space-y-5">
              {values.map((v) => (
                <li key={v.title} className="flex gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#7C5CFF]/15 border border-[#7C5CFF]/30">
                    <Sparkles className="h-3 w-3 text-[#A78BFA]" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-white">{v.title}</div>
                    <div className="text-sm text-white/55 mt-0.5">{v.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative mt-8 grid grid-cols-2 gap-3 pt-6 border-t border-white/10 text-sm">
              <a href="mailto:viddixai@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white">
                <Mail className="h-4 w-4 text-[#22D3EE]" />
                viddixai@gmail.com
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <Globe className="h-4 w-4 text-[#A78BFA]" />
                Remote · Worldwide
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
