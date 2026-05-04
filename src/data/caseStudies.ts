export type CaseStudy = {
  slug: string;
  tag: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  metrics: { k: string; v: string }[];
  accent: string;
  challenge: string;
  approach: string[];
  outcome: string[];
  stack?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "boutique-hotel-pms",
    tag: "Custom SaaS",
    client: "Boutique Hotel Group",
    industry: "Hospitality",
    headline: "Built a unified PMS that replaced four legacy tools across the portfolio",
    summary:
      "A boutique hotel group operating 12 properties was losing hours every day switching between disconnected legacy systems. We replaced them all with a single, custom PMS designed around how their teams actually work.",
    metrics: [
      { k: "12", v: "properties live" },
      { k: "4 → 1", v: "tools consolidated" },
      { k: "60%", v: "faster check-in" },
    ],
    accent: "from-[#7C5CFF]/30 to-[#22D3EE]/10",
    challenge:
      "The group ran 12 hotels on four disconnected systems — PMS, channel manager, housekeeping, billing — with no shared data layer. Front-desk staff burned time switching, double-bookings slipped through, and group-level reporting was manual.",
    approach: [
      "Designed a unified PMS with real-time channel sync, role-based access, mobile housekeeping flows, integrated billing, and group-level reporting.",
      "Migrated reservations, guest records, and historical revenue data without downtime.",
      "Rolled out property by property with on-site training and a dedicated success engineer per launch.",
    ],
    outcome: [
      "All 12 properties live within 4 months — single source of truth across the group.",
      "Average check-in time cut by 60% versus the previous stack.",
      "Group-level dashboards replace what used to take days of manual spreadsheet work.",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Channel manager APIs"],
  },
  {
    slug: "tourism-network",
    tag: "Custom SaaS",
    client: "Regional Tourism Network",
    industry: "Tourism",
    headline: "Shipped a unified platform connecting operators, services, and travelers across the network",
    summary:
      "A regional tourism network coordinated 200+ independent operators with no shared technology. We built a single platform that unified discovery, booking, and operator management.",
    metrics: [
      { k: "200+", v: "operators onboarded" },
      { k: "24/7", v: "service availability" },
      { k: "3.2×", v: "booking conversion" },
    ],
    accent: "from-[#22D3EE]/30 to-[#A78BFA]/10",
    challenge:
      "Tours, transport, dining, and experience operators across the network ran on different tools — or none at all. Travelers couldn't book multi-vendor itineraries in one place, and the network had no shared data on demand or performance.",
    approach: [
      "Built an operator portal with role-based dashboards, inventory management, and split payments.",
      "Built a traveler-facing marketplace with multilingual search, real-time availability, and one-checkout multi-operator booking.",
      "Onboarded operators in cohorts with hands-on support and migration tooling.",
    ],
    outcome: [
      "200+ operators live on the platform in the first phase.",
      "3.2× booking conversion versus the previous fragmented funnel.",
      "First-time visibility into demand patterns at the network level.",
    ],
  },
  {
    slug: "professional-services-crm",
    tag: "Custom SaaS",
    client: "Professional Services Firm",
    industry: "Professional Services",
    headline: "Custom CRM + project management platform that replaced three separate subscriptions",
    summary:
      "A professional services firm was paying for three separate tools that didn't talk to each other. We built one platform tailored to their pipeline-to-delivery flow — and got the whole team using it in 30 days.",
    metrics: [
      { k: "3", v: "tools replaced" },
      { k: "$84k", v: "annual SaaS savings" },
      { k: "100%", v: "team adoption in 30d" },
    ],
    accent: "from-[#A78BFA]/30 to-[#7C5CFF]/10",
    challenge:
      "The firm used a generic CRM, a separate PM tool, and a time-tracking app. Adoption was patchy, data lived in three places, and there was no clean view from pipeline to billing.",
    approach: [
      "Built a custom CRM + project management platform mapped to their actual workflow — not a generic template.",
      "Migrated all historical contacts, deals, and projects without disrupting active engagements.",
      "Ran a 30-day adoption push with role-based onboarding for partners, ops, and delivery.",
    ],
    outcome: [
      "100% team adoption inside 30 days — measured by daily active usage.",
      "$84k/year saved on SaaS subscriptions and reconciliation work.",
      "Pipeline, delivery, and billing now live in a single workflow.",
    ],
  },
  {
    slug: "us-crypto-marketing",
    tag: "Marketing & Strategy",
    client: "Top US Crypto Platform",
    industry: "Crypto · Web3",
    headline: "Drove growth strategy and the marketing engine for one of the US crypto sector leaders",
    summary:
      "A US crypto sector leader needed sharper positioning and a marketing engine that could scale qualified pipeline in a post-bear-market environment. We owned strategy, execution, and attribution end-to-end.",
    metrics: [
      { k: "5×", v: "qualified pipeline" },
      { k: "−42%", v: "CAC" },
      { k: "8 wks", v: "to first wins" },
    ],
    accent: "from-[#7C5CFF]/30 to-[#22D3EE]/10",
    challenge:
      "Strong product, blurred positioning. Spend was fragmented across channels with no clean attribution, and the team needed pipeline lift fast — without inflating CAC.",
    approach: [
      "Repositioned the category narrative and rebuilt the messaging stack from homepage to ad creative.",
      "Rebuilt the funnel: paid acquisition, lifecycle, content, and strategic partnerships, instrumented end-to-end.",
      "Set up attribution and reporting so every channel was measured against the same pipeline outcome.",
    ],
    outcome: [
      "5× qualified pipeline within the engagement window.",
      "Customer acquisition cost down 42% across paid channels.",
      "First measurable wins shipped within 8 weeks of kickoff.",
    ],
  },
  {
    slug: "service-leader-voice-agent",
    tag: "Voice Agent",
    client: "Industry-Leading Service Provider",
    industry: "Professional Services",
    headline: "Voice agent + speed-to-lead pipeline that picks up every call in under 3 seconds",
    summary:
      "A sector-leading service business was losing leads at the very first touchpoint — missed calls, slow callbacks, inconsistent qualifying. We deployed a voice agent that picks up every call and a speed-to-lead pipeline that routes the right ones to humans instantly.",
    metrics: [
      { k: "<3s", v: "average pickup" },
      { k: "94%", v: "calls answered" },
      { k: "+47%", v: "qualified leads" },
    ],
    accent: "from-[#22D3EE]/30 to-[#7C5CFF]/10",
    challenge:
      "Inbound calls were the highest-intent channel but conversion was leaking everywhere — missed calls, multi-hour callbacks, inconsistent qualifying scripts.",
    approach: [
      "Trained a voice agent on the company's services, pricing rules, and qualifying criteria.",
      "Wired the agent into the phone system so it picks up in under 3 seconds, qualifies, and either books or escalates.",
      "Built a speed-to-lead pipeline that routes urgent or high-value calls to human reps in real time.",
    ],
    outcome: [
      "Pickup time dropped to under 3 seconds, 24/7.",
      "94% of inbound calls answered (vs. previous miss rate).",
      "47% more qualified leads delivered to the human sales team.",
    ],
  },
  {
    slug: "service-data-email-automation",
    tag: "Workflow Automation",
    client: "Service Sector Operator",
    industry: "Professional Services",
    headline: "Automated internal data capture and client follow-up emails end-to-end",
    summary:
      "Operators spent hours every day collecting client data and writing status emails by hand. We replaced the entire flow with an end-to-end automation — zero manual emails, complete data capture.",
    metrics: [
      { k: "100%", v: "data captured" },
      { k: "0", v: "manual emails" },
      { k: "12h", v: "saved per agent/wk" },
    ],
    accent: "from-[#A78BFA]/30 to-[#22D3EE]/10",
    challenge:
      "Data capture lived in spreadsheets and forms with high error rates. Status updates to clients were sent manually, often inconsistently, and slowed the entire delivery flow.",
    approach: [
      "Mapped the full intake-to-update flow and identified every manual touchpoint.",
      "Built a pipeline that captures data at source, normalizes it, and stores it in the system of record.",
      "Triggered tailored email sequences automatically based on workflow stage and client profile.",
    ],
    outcome: [
      "100% of client data captured cleanly, no spreadsheets.",
      "Zero manual status emails — operators focus on client work, not communications ops.",
      "12 hours per week reclaimed per agent.",
    ],
  },
  {
    slug: "property-mgmt-contract-agent",
    tag: "Workflow Agent",
    client: "Property Management Firm",
    industry: "Property Management",
    headline: "Contract generator agent that drafts and personalizes documents in seconds",
    summary:
      "A property management firm drafted every rental, maintenance, and vendor contract by hand. We replaced the manual workflow with an agent that drafts, personalizes, and compliance-checks contracts in seconds.",
    metrics: [
      { k: "30s", v: "to draft" },
      { k: "100%", v: "compliance check" },
      { k: "−85%", v: "manual editing" },
    ],
    accent: "from-[#7C5CFF]/30 to-[#A78BFA]/10",
    challenge:
      "Contract drafting was slow, inconsistent, and prone to compliance errors caught only after the fact. Each contract type had its own template living in someone's inbox.",
    approach: [
      "Centralized templates by contract type with structured personalization fields.",
      "Built an agent that drafts contracts from intake data in seconds and runs a real-time compliance pass.",
      "Integrated with e-signature and the firm's case management system for one-click send.",
    ],
    outcome: [
      "Average draft time dropped to 30 seconds.",
      "Every contract runs a 100% compliance check before it leaves the firm.",
      "Manual editing reduced by 85%.",
    ],
  },
  {
    slug: "real-estate-investment-agent",
    tag: "Data & Research",
    client: "Real Estate Investment Group",
    industry: "Real Estate",
    headline: "Investment analysis agent that scores deals and surfaces only the top opportunities",
    summary:
      "A real estate investment group was reviewing thousands of listings by hand. We built an agent that continuously scans the market, scores opportunities against their thesis, and surfaces only the top deals.",
    metrics: [
      { k: "1000s", v: "listings scanned/day" },
      { k: "Top 5%", v: "deals surfaced" },
      { k: "10×", v: "analyst throughput" },
    ],
    accent: "from-[#22D3EE]/30 to-[#A78BFA]/10",
    challenge:
      "Analysts spent the bulk of their week filtering listings before any real analysis happened. Promising deals slipped to faster competitors while the team was still triaging.",
    approach: [
      "Codified the firm's investment thesis into a scoring model — yields, risk profile, market signals, and qualitative criteria.",
      "Built an agent that ingests listings continuously, runs the scoring model, and pulls supporting data from public sources.",
      "Surfaced only the top 5% of deals into a dedicated analyst review queue.",
    ],
    outcome: [
      "Thousands of listings scanned every day with no human triage.",
      "Top 5% of opportunities surfaced into the review queue.",
      "Analyst throughput up roughly 10× — analysts now spend their time on deep diligence, not filtering.",
    ],
  },
  {
    slug: "b2b-services-cs-outbound",
    tag: "AI Agents · Voice + Outbound",
    client: "B2B Services Company",
    industry: "B2B Services",
    headline: "Customer service and outbound sales agents working in tandem 24/7",
    summary:
      "A B2B services company couldn't hire fast enough to keep up with both inbound support and outbound sales. We deployed two specialized agents that work in tandem around the clock.",
    metrics: [
      { k: "24/7", v: "coverage" },
      { k: "+38%", v: "outbound meetings" },
      { k: "92%", v: "CSAT" },
    ],
    accent: "from-[#A78BFA]/30 to-[#7C5CFF]/10",
    challenge:
      "Inbound support backlogged during peak hours, outbound sales stalled, and hiring couldn't scale fast enough to keep up with demand on either side.",
    approach: [
      "Deployed a customer service agent on inbound email and chat — handles tier-1 instantly, escalates complex cases with full context.",
      "Deployed an outbound sales agent running personalized sequences and booking discovery calls.",
      "Wired both into the company's CRM so every interaction is logged and attributed.",
    ],
    outcome: [
      "Round-the-clock coverage on both inbound and outbound — no more peak-hour backlogs.",
      "38% more outbound meetings booked into the human sales team's calendar.",
      "92% CSAT on agent-handled support tickets.",
    ],
  },
];
