import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Heart,
  Briefcase,
  Activity,
  Lightbulb,
  Plane,
  DollarSign,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { useT } from "@/contexts/LanguageContext";

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  briefcase: Briefcase,
  activity: Activity,
  lightbulb: Lightbulb,
  plane: Plane,
  dollar: DollarSign,
};

// SVG canvas / geometry --------------------------------------------------
const W = 700;
const H = 460;
const CX = W / 2;
const CY = H / 2 + 6;
const R_CAT = 96;
const R_PEOPLE = 178;
const R_MEM = 235;

// Polar -> cartesian. Angles are in degrees, 0deg = right, growing clockwise.
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg - 90) * (Math.PI / 180); // -90 so 0deg points up
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const CAT_ANGLES = [-90, -30, 30, 90, 150, 210]; // 6 evenly spaced, starting top
const PEOPLE_ANGLES = [-54, 18, 90, 162, 234]; // 5 offset between categories
const MEM_ANGLES = [-72, 0, 72, 144, 216]; // 5, offset again so memories sit between people

// Timing -----------------------------------------------------------------
const CYCLE_MS = 8800;
const CAT_START = 0.35;
const CAT_STEP = 0.11;
const PEOPLE_START = 1.15;
const PEOPLE_STEP = 0.12;
const MEM_START = 1.95;
const MEM_STEP = 0.13;
const CROSS_START = 2.7;
const INSIGHT_START = 3.4;

// Edge definitions: source group + index -> target group + index
type EdgeRef =
  | { from: "center" }
  | { from: "cat"; i: number }
  | { from: "people"; i: number };

type Edge = {
  fromGroup: "center" | "cat" | "people";
  fromIdx: number;
  toGroup: "cat" | "people" | "mem";
  toIdx: number;
  delay: number;
  /** Pulse along this edge after the bloom finishes. */
  pulse?: boolean;
};

// Primary edges: center -> each category (with pulse afterwards)
const primaryEdges: Edge[] = CAT_ANGLES.map((_, i) => ({
  fromGroup: "center",
  fromIdx: 0,
  toGroup: "cat",
  toIdx: i,
  delay: CAT_START + i * CAT_STEP,
  pulse: true,
}));

// Category -> people connections (organic-looking, each person tied to ~2 categories)
const catToPeople: Array<[number, number]> = [
  [0, 1], // Family -> Marco? we'll see; just connect each category to one or two people
  [0, 2], // Family -> Dad
  [1, 0], // Work -> Sarah
  [1, 1], // Work -> Marco
  [2, 3], // Health -> Alex
  [3, 1], // Ideas -> Marco
  [3, 3], // Ideas -> Alex
  [4, 4], // Travel -> Lina
  [4, 0], // Travel -> Sarah
  [5, 0], // Finance -> Sarah
];

const peopleEdges: Edge[] = catToPeople.map(([ci, pi], idx) => ({
  fromGroup: "cat",
  fromIdx: ci,
  toGroup: "people",
  toIdx: pi,
  delay: PEOPLE_START + idx * 0.06,
}));

// People -> memories: each memory tied to one or two people
const peopleToMem: Array<[number, number]> = [
  [0, 0], // Sarah -> Tokyo
  [4, 0], // Lina -> Tokyo
  [1, 1], // Marco -> Q4 launch idea
  [3, 1], // Alex -> Q4 launch idea
  [4, 2], // Lina -> Dinner Casa Mia
  [3, 3], // Alex -> Marathon goal
  [2, 4], // Dad -> Mom's birthday
  [0, 4], // Sarah -> Mom's birthday
];

const memEdges: Edge[] = peopleToMem.map(([pi, mi], idx) => ({
  fromGroup: "people",
  fromIdx: pi,
  toGroup: "mem",
  toIdx: mi,
  delay: MEM_START + idx * 0.07,
}));

// Cross-connections that appear after bloom (between categories themselves)
const crossEdges: Edge[] = [
  { fromGroup: "cat", fromIdx: 0, toGroup: "cat", toIdx: 3, delay: CROSS_START },
  { fromGroup: "cat", fromIdx: 1, toGroup: "cat", toIdx: 5, delay: CROSS_START + 0.18 },
  { fromGroup: "cat", fromIdx: 2, toGroup: "cat", toIdx: 4, delay: CROSS_START + 0.32 },
];

const ALL_EDGES: Edge[] = [
  ...primaryEdges,
  ...peopleEdges,
  ...memEdges,
  ...crossEdges,
];

// --------------------------------------------------------------------------
type CatData = { label: string; icon: string };
type PersonData = { label: string; initial: string };
type MemData = { label: string };

export const SecondBrainPreview = () => {
  const { t } = useT();
  const data = t.aiAgents.secondBrain;
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!data) return;
    const id = setTimeout(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => clearTimeout(id);
  }, [cycle, data]);

  if (!data) return null;

  const cats: CatData[] = data.categories.slice(0, 6);
  const people: PersonData[] = data.people.slice(0, 5);
  const memories: MemData[] = data.memories.slice(0, 5);

  const catPos = CAT_ANGLES.map((a) => polar(CX, CY, R_CAT, a));
  const peoplePos = PEOPLE_ANGLES.map((a) => polar(CX, CY, R_PEOPLE, a));
  const memPos = MEM_ANGLES.map((a) => polar(CX, CY, R_MEM, a));

  const getPos = (group: "center" | "cat" | "people" | "mem", idx: number) => {
    if (group === "center") return { x: CX, y: CY };
    if (group === "cat") return catPos[idx];
    if (group === "people") return peoplePos[idx];
    return memPos[idx];
  };

  return (
    <div
      key={cycle}
      className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1d2a] to-[#0d0e16] overflow-hidden p-6 shadow-[0_20px_60px_-15px_rgba(124,92,255,0.4)]"
    >
      <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#A78BFA]/30 bg-[#A78BFA]/10 px-2.5 py-1 text-[10px] font-medium text-[#A78BFA]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
          {data.eyebrow}
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/45">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#A78BFA]" /> {data.categoriesLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#22D3EE]" /> {data.peopleLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" /> {data.memoriesLabel}
          </span>
        </div>
      </div>

      {/* Graph */}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block select-none">
          <defs>
            <radialGradient id="sb-center-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#7C5CFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sb-edge-cat" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="sb-edge-people" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="sb-edge-mem" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Center glow */}
          <circle cx={CX} cy={CY} r="120" fill="url(#sb-center-glow)" />

          {/* Edges */}
          {ALL_EDGES.map((e, idx) => {
            const a = getPos(e.fromGroup, e.fromIdx);
            const b = getPos(e.toGroup, e.toIdx);
            const stroke =
              e.toGroup === "cat"
                ? "url(#sb-edge-cat)"
                : e.toGroup === "people"
                ? "url(#sb-edge-people)"
                : "url(#sb-edge-mem)";
            return (
              <motion.line
                key={`edge-${idx}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={stroke}
                strokeWidth={1.1}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 0.55, delay: e.delay, ease: "easeOut" },
                  opacity: { duration: 0.35, delay: e.delay },
                }}
              />
            );
          })}

          {/* Pulses along primary edges (center -> categories) */}
          {primaryEdges.map((e, idx) => {
            const a = getPos("center", 0);
            const b = getPos("cat", e.toIdx);
            return (
              <motion.circle
                key={`pulse-${idx}`}
                r={2.2}
                fill="#A78BFA"
                initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                animate={{
                  cx: [a.x, b.x, a.x],
                  cy: [a.y, b.y, a.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  delay: INSIGHT_START + 0.2 + idx * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Memory nodes (rendered first so they sit under the people/category circles when overlapping) */}
          {memPos.map((p, i) => (
            <motion.g
              key={`mem-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: MEM_START + i * MEM_STEP,
                ease: "easeOut",
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <rect
                x={p.x - 56}
                y={p.y - 10}
                width="112"
                height="20"
                rx="10"
                fill="rgba(34, 197, 94, 0.10)"
                stroke="rgba(34, 197, 94, 0.45)"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={p.y + 3.5}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="600"
                fill="#bbf7d0"
                style={{ letterSpacing: 0.1 }}
              >
                {memories[i]?.label ?? ""}
              </text>
            </motion.g>
          ))}

          {/* Category nodes */}
          {catPos.map((p, i) => {
            const Icon = ICON_MAP[cats[i]?.icon] || Sparkles;
            return (
              <motion.g
                key={`cat-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.45,
                  delay: CAT_START + i * CAT_STEP,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="20"
                  fill="rgba(167, 139, 250, 0.14)"
                  stroke="rgba(167, 139, 250, 0.55)"
                  strokeWidth="1.2"
                />
                <foreignObject x={p.x - 9} y={p.y - 9} width="18" height="18">
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#E9D5FF",
                    }}
                  >
                    <Icon width={14} height={14} strokeWidth={2.2} />
                  </div>
                </foreignObject>
                <text
                  x={p.x}
                  y={p.y + 36}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="rgba(255,255,255,0.78)"
                >
                  {cats[i]?.label ?? ""}
                </text>
              </motion.g>
            );
          })}

          {/* People nodes */}
          {peoplePos.map((p, i) => (
            <motion.g
              key={`p-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: PEOPLE_START + i * PEOPLE_STEP,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r="16"
                fill="rgba(34, 211, 238, 0.16)"
                stroke="rgba(34, 211, 238, 0.6)"
                strokeWidth="1.2"
              />
              <text
                x={p.x}
                y={p.y + 4.5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#a5f3fc"
              >
                {people[i]?.initial ?? ""}
              </text>
              <text
                x={p.x}
                y={p.y + 30}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="500"
                fill="rgba(255,255,255,0.65)"
              >
                {people[i]?.label ?? ""}
              </text>
            </motion.g>
          ))}

          {/* Center "You" node — always visible, pulses */}
          <motion.g
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <motion.circle
              cx={CX}
              cy={CY}
              r="32"
              fill="url(#sb-center-glow)"
              animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle
              cx={CX}
              cy={CY}
              r="22"
              fill="rgba(124, 92, 255, 0.32)"
              stroke="rgba(167, 139, 250, 0.95)"
              strokeWidth="1.5"
            />
            <foreignObject x={CX - 10} y={CY - 10} width="20" height="20">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <User width={15} height={15} strokeWidth={2.2} />
              </div>
            </foreignObject>
            <text
              x={CX}
              y={CY + 41}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#ffffff"
              style={{ letterSpacing: 0.2 }}
            >
              {data.youLabel}
            </text>
          </motion.g>
        </svg>

        {/* Insight bubble */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: INSIGHT_START, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-2 max-w-[88%] sm:max-w-[420px] rounded-xl border border-[#A78BFA]/30 bg-gradient-to-br from-[#7C5CFF]/15 to-[#22D3EE]/10 px-3.5 py-2.5 backdrop-blur-sm shadow-[0_8px_30px_-10px_rgba(124,92,255,0.5)]"
        >
          <div className="flex items-start gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA] mt-0.5 shrink-0" strokeWidth={2.4} />
            <p className="text-[11.5px] text-white/90 leading-snug italic">
              {data.insight}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
