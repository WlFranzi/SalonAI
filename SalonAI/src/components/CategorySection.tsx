import { motion } from "framer-motion";
import { Category, MonsterCard, COMPANIES } from "../data/monsters";
import MonsterFlipCard from "./MonsterFlipCard";

interface Props {
  category: Category;
  index: number;
}

// Sort cards EU/DE first → US → CN → rest
const REGION_ORDER: Record<string, number> = {
  "🇪🇺": 1, "🇩🇪": 1, "🇸🇪": 1, "🇬🇧": 1,
  "🇺🇸": 2,
  "🇨🇳": 3,
};
function sortByRegion(cards: MonsterCard[]): MonsterCard[] {
  return [...cards].sort((a, b) => {
    const pa = REGION_ORDER[a.flag] ?? 9;
    const pb = REGION_ORDER[b.flag] ?? 9;
    return pa - pb;
  });
}

// Group cards by company, preserving insertion order
function groupByCompany(cards: MonsterCard[]): Map<string, MonsterCard[]> {
  const map = new Map<string, MonsterCard[]>();
  for (const card of cards) {
    const existing = map.get(card.company) ?? [];
    map.set(card.company, [...existing, card]);
  }
  return map;
}

const TIER_COLORS: Record<number, { bg: string; border: string; badge: string; hover: string }> = {
  0: { bg: "from-slate-900/80 to-slate-800/80",   border: "border-slate-600/40", badge: "bg-slate-700 text-slate-200", hover: "#94a3b8" },
  1: { bg: "from-blue-950/80 to-blue-900/80",      border: "border-blue-700/40",  badge: "bg-blue-800 text-blue-200", hover: "#60a5fa" },
  2: { bg: "from-violet-950/80 to-violet-900/80",  border: "border-violet-700/40",badge: "bg-violet-800 text-violet-200", hover: "#a78bfa" },
  3: { bg: "from-orange-500/95 to-amber-500/95",    border: "border-orange-400/70", badge: "bg-orange-950/80 text-orange-100", hover: "#fbbf24" },
};

export default function CategorySection({ category, index }: Props) {
  const groups = groupByCompany(sortByRegion(category.cards));
  const colors = TIER_COLORS[category.tier] ?? TIER_COLORS[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-3xl border ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm overflow-hidden`}
    >
      {/* Category header */}
      <div className="flex items-center gap-4 px-6 py-5">
        <span className="text-4xl leading-none">{category.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2
              className="text-lg font-bold text-white leading-tight"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {category.title}
            </h2>
            <span
              className={`text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${colors.badge}`}
            >
              Tier {category.tier} · {category.tierLabel}
            </span>
          </div>
          <p className="text-sm text-white/50 mt-0.5">{category.subtitle}</p>
        </div>
        <div className="text-white/30 text-sm font-mono shrink-0">
          {category.cards.length} Karten
        </div>
      </div>

      {category.tier === 3 ? (
        /* ── Agentic layer: wrapping grid ── */
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-x-8 gap-y-6">
            {Array.from(groups.entries()).map(([companyKey, cards]) => {
              const company = COMPANIES[companyKey];
              return (
                <div key={companyKey} className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: company?.color ?? "#888" }}
                    />
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      {company?.name ?? companyKey}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cards.map((card) => (
                      <MonsterFlipCard key={card.id} card={card} hoverColor={colors.hover} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Other layers: horizontal scroll ── */
        <div className="relative">
        {/* Right-fade hint for mobile — signals scrollable content */}
        <div
          className="absolute right-0 top-0 bottom-6 w-10 pointer-events-none md:hidden z-10"
          style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.25))" }}
        />
        <div className="overflow-x-auto pb-6 px-6 scrollbar-thin">
          <div className="flex gap-8 min-w-max">
            {Array.from(groups.entries()).map(([companyKey, cards]) => {
              const company = COMPANIES[companyKey];
              return (
                <div key={companyKey} className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: company?.color ?? "#888" }}
                    />
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      {company?.name ?? companyKey}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    {cards.map((card) => (
                      <MonsterFlipCard key={card.id} card={card} hoverColor={colors.hover} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}
    </motion.section>
  );
}
