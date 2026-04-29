import { useState } from "react";
import { MonsterCard, COMPANIES } from "../data/monsters";

interface Props {
  card: MonsterCard;
  hoverColor?: string;
}

const MUFFINS = ["🧁", "🧁", "🧁", "🧁", "🧁"];

function MuffinRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 items-center">
      {MUFFINS.map((m, i) => (
        <span
          key={i}
          className="text-base leading-none"
          style={{ opacity: i < rating ? 1 : 0.18 }}
        >
          {m}
        </span>
      ))}
    </div>
  );
}


const ratingLabel: Record<number, string> = {
  1: "EU-sicher",
  2: "Gut vertretbar",
  3: "Mit Vorsicht",
  4: "Bedenklich",
  5: "Datenschutz-Risiko",
};

export default function MonsterFlipCard({ card, hoverColor = "#ffffff" }: Props) {
  const [flipped, setFlipped] = useState(false);
  const company = COMPANIES[card.company] ?? { name: card.company, color: "#888" };

  return (
    <div
      className="flip-card cursor-pointer select-none flex-shrink-0 group"
      style={{ width: 272, height: 272, "--hover-color": hoverColor } as React.CSSProperties}
      onClick={() => setFlipped((f) => !f)}
      title="Klicken zum Umdrehen"
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>

        {/* ── FRONT ─────────────────────────────────────────── */}
        <div className="flip-card-face flip-card-front rounded-2xl shadow-lg border border-white/40 flex flex-col">

          {/* ── flip hint ─────────────────────────────────────── */}
          <div
            className="absolute top-2 right-2 z-10 pointer-events-none"
            style={{
              fontSize: 15,
              lineHeight: 1,
              opacity: 0.38,
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            ↺
          </div>

          {/* ── header row: company + source badge + flag ─────── */}
          <div className="flex items-center justify-between px-4 pt-3 pb-0 shrink-0">
            <span
              className="text-[9px] font-bold tracking-widest uppercase"
              style={{ color: company.color }}
            >
              {company.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  card.sourceType === "open"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {card.sourceType === "open" ? "OPEN" : "CLOSED"}
              </span>
              <span className="text-sm leading-none">{card.flag}</span>
            </div>
          </div>

          {/* ── monster image — compact ────────────────────────── */}
          <div className="flex justify-center items-center pt-2 pb-0 shrink-0" style={{ height: 76 }}>
            {card.discontinued ? (
              <span className="text-4xl grayscale opacity-40">🚫</span>
            ) : (
              <img
                src={card.monster}
                alt={card.name}
                style={{
                  width: 68,
                  height: 68,
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.13))",
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </div>

          {/* ── tool name ─────────────────────────────────────── */}
          <div className="px-4 pt-1 text-center shrink-0">
            <h3 className="font-bold text-sm leading-tight text-slate-800">
              {card.name}
            </h3>
          </div>

          {/* ── community verdict ─────────────────────────────── */}
          <div className="px-4 pt-2 flex-1 min-h-0">
            <div className="flex items-start gap-1">
              <span className="text-[10px] shrink-0 mt-0.5 opacity-60">💬</span>
              <p className="text-[11px] font-semibold text-slate-700 leading-snug italic line-clamp-2">
                {card.nickname}
              </p>
            </div>
          </div>

          {/* ── tags ──────────────────────────────────────────── */}
          <div className="px-4 pt-1 pb-2 flex flex-wrap gap-1 justify-center shrink-0">
            {card.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: company.color + "18",
                  color: company.color,
                  border: `1px solid ${company.color}33`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ── privacy footer ────────────────────────────────── */}
          <div className="px-4 pb-3 flex items-center justify-center gap-2 shrink-0">
            {card.localOnlyWarning ? (
              <span className="text-[10px] font-bold text-emerald-600">🔒 Lokal · volle Kontrolle</span>
            ) : (
              <>
                <MuffinRating rating={card.sugarRating} />
                <span className="text-[10px] font-medium text-slate-500">
                  {ratingLabel[card.sugarRating]}
                </span>
              </>
            )}
          </div>

          {card.discontinued && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none">
              <span className="text-white text-[10px] font-bold bg-red-600/90 px-3 py-1 rounded-full rotate-[-6deg] shadow-md">
                EINGESTELLT
              </span>
            </div>
          )}
        </div>

        {/* ── BACK ──────────────────────────────────────────── */}
        <div className="flip-card-face flip-card-back rounded-2xl shadow-lg border border-white/20">
          <div className="flip-card-back-scroll flex flex-col rounded-2xl">

            {/* header */}
            <div
              className="flex items-start gap-2 px-5 pt-4 pb-3 shrink-0"
              style={{ borderBottom: `2px solid ${company.color}44` }}
            >
              <div
                className="text-base leading-none shrink-0 mt-0.5 rounded-full bg-white/10 flex items-center justify-center"
                style={{ width: 28, height: 28 }}
              >
                {card.flag}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-white/60 leading-snug">
                  {card.nickname}
                </p>
                <h3
                  className="text-sm font-bold text-white leading-tight mt-0.5"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {card.name}
                </h3>
              </div>
            </div>

            {/* bestFor */}
            <div className="px-5 pt-4 pb-1">
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">
                ✓ Stark bei
              </p>
              <p className="text-xs font-medium text-white/90 leading-relaxed">{card.bestFor}</p>
            </div>

            {/* notFor */}
            <div className="px-5 pt-4 pb-1">
              <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1.5">
                ✗ Nicht ideal für
              </p>
              <p className="text-xs font-medium text-white/90 leading-relaxed">{card.notFor}</p>
            </div>

            {/* tags */}
            <div className="mt-auto px-5 pb-4 pt-4">
              <div className="flex flex-wrap gap-1">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-white/15 text-white/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              {card.privacy && (
                <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  🛡️ Datenschutz-freundlich
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
