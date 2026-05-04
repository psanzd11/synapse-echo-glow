import { motion } from "framer-motion";
import { Phone, User, Workflow, BarChart3 } from "lucide-react";

const categories = [
  {
    Icon: Phone,
    title: "Voice Agents",
    desc: "Human-like voice agents that pick up every call, book appointments, and close sales 24/7.",
    items: ["Speed-to-lead — pickup in <3s", "24/7 outbound & inbound sales", "Reception & appointment booking"],
    accent: "from-[#7C5CFF]/20 to-[#22D3EE]/10",
  },
  {
    Icon: User,
    title: "Personal Agents",
    desc: "Private AI assistants that take work off your plate and amplify your output.",
    items: ["Executive assistants & copilots", "Inbox & calendar control", "Internal data capture"],
    accent: "from-[#A78BFA]/20 to-[#7C5CFF]/10",
  },
  {
    Icon: Workflow,
    title: "Workflow Agents",
    desc: "Custom automations that run your operations end-to-end across every tool you use.",
    items: ["Contract generation & personalization", "Client follow-up email automation", "CRM optimization & orchestration"],
    accent: "from-[#22D3EE]/20 to-[#7C5CFF]/10",
  },
  {
    Icon: BarChart3,
    title: "Data & Research Agents",
    desc: "Agents that gather, analyze, and report — turning raw data into decisions.",
    items: ["Real estate investment scoring", "Market & competitor research", "Automated reporting & QA"],
    accent: "from-[#7C5CFF]/20 to-[#A78BFA]/10",
  },
];

export const AIAgents = () => {
  return (
    <section id="agents" className="relative bg-black text-white py-32 px-6 border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.06),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 mb-4">
            AI Agents
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Agents purpose-built for every part of your business.
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg">
            Pick a category — or combine them into a full AI workforce.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(({ Icon, title, desc, items, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 hover:border-white/20 transition-all overflow-hidden"
            >
              <div className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-white/10 mb-5">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="h-1 w-1 rounded-full bg-[#A78BFA]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
