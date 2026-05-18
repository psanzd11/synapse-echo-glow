import { motion } from "framer-motion";
import { Phone, User, Workflow, BarChart3 } from "lucide-react";
import { useT } from "@/contexts/LanguageContext";
import { WhatsAppChatPreview } from "@/components/WhatsAppChatPreview";

// WhatsApp silhouette — filled icon inherits color from text class (white)
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const icons = [Phone, User, Workflow, BarChart3, WhatsAppIcon];

const accents = [
  "from-[#7C5CFF]/20 to-[#22D3EE]/10",
  "from-[#A78BFA]/20 to-[#7C5CFF]/10",
  "from-[#22D3EE]/20 to-[#7C5CFF]/10",
  "from-[#7C5CFF]/20 to-[#A78BFA]/10",
  "from-[#22c55e]/20 to-[#22D3EE]/10",
];

export const AIAgents = () => {
  const { t } = useT();
  const whatsappIndex = t.aiAgents.categories.length - 1;

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
            {t.aiAgents.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {t.aiAgents.heading}
          </h2>
          <p className="mt-4 text-white/60 text-base sm:text-lg">{t.aiAgents.subtext}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.aiAgents.categories.map(({ title, desc, items, price }, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            const isWhatsApp = i === whatsappIndex;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={[
                  "group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 hover:border-white/20 transition-all overflow-hidden",
                  isWhatsApp ? "lg:col-span-2" : "",
                ].join(" ")}
              >
                <div
                  className={`absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <div
                  className={[
                    "relative",
                    isWhatsApp ? "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" : "",
                  ].join(" ")}
                >
                  <div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#22D3EE]/10 border border-white/10 mb-5">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-medium text-white">{title}</h3>
                      {price && (
                        <span className="inline-flex items-center rounded-full border border-[#A78BFA]/40 bg-[#7C5CFF]/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
                          {price}
                        </span>
                      )}
                    </div>
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
                  {isWhatsApp && (
                    <div className="flex justify-center">
                      <WhatsAppChatPreview />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
