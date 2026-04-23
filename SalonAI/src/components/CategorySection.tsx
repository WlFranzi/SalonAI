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

const TIER_COLORS: Record<number, { topBorder: string; border: string; badge: string; hover: string }> = {
  0: { topBorder: "#94a3b8", border: "border-slate-200", badge: "bg-slate-100 text-slate-500", hover: "#94a3b8" },
  1: { topBorder: "#3b82f6", border: "border-blue-100",  badge: "bg-blue-50 text-blue-600",    hover: "#3b82f6" },
  2: { topBorder: "#8b5cf6", border: "border-violet-100",badge: "bg-violet-50 text-violet-600", hover: "#8b5cf6" },
  3: { topBorder: "#f59e0b", border: "border-amber-100", badge: "bg-amber-50 text-amber-600",  hover: "#f59e0b" },
};

export default function CategorySection({ category, index }: Props) {
  const groups = groupByCompany(sortByRegion(category.cards));
  const colors = TIER_COLORS[category.tier] ?? TIER_COLORS[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`rounded-2xl border ${colors.border} bg-white shadow-sm overflow-hidden`}
      style={{ borderTop: `3px solid ${colors.topBorder}` }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4">
        <span className="text-3xl leading-none">{category.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-base font-bold text-slate-800 leading-tight">
              {category.title}
            </h2>
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${colors.badge}`}
            >
              {category.tierLabel}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{category.subtitle}</p>
        </div>
        <div className="text-slate-300 text-xs font-mono shrink-0">
          {category.cards.length}
        </div>
      </div>

      {category.tier === 3 ? (
        /* ── Agentic layer: wrapping grid ── */
        <div className="px-3 sm:px-6 pb-6">
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
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
          style={{ background: "linear-gradient(to right, transparent, rgba(200,220,240,0.6))" }}
        />
        <div className="overflow-x-auto pb-6 px-3 sm:px-6 scrollbar-thin">
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
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
