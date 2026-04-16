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

function getPrivacyNote(card: MonsterCard): string {
  const isEU = ["🇪🇺", "🇩🇪", "🇸🇪"].includes(card.flag);
  const isGB = card.flag === "🇬🇧";
  const isUS = card.flag === "🇺🇸";
  const isCN = card.flag === "🇨🇳";

  if (isCN) {
    if (card.sugarRating >= 4) return "* Server in China — unterliegt chinesischem Recht, staatlicher Datenzugriff möglich";
    return "* China-Ursprung — bei Cloud-Nutzung gelten CN-Datenschutzgesetze";
  }
  switch (card.sugarRating) {
    case 1:
      if (isEU) return "* EU-Server & DSGVO — kein Datentransfer in Drittländer, volle EU-Kontrolle";
      if (isGB) return "* UK-Server & UK GDPR — ähnlich DSGVO, kein US/CN-Datenzugriff";
      return "* Lokal betreibbar — bei Self-Hosting verlassen Daten nie dein Gerät";
    case 2:
      if (isEU) return "* Europäischer Anbieter — DSGVO gilt, gute Datenschutzpolitik";
      if (isGB) return "* UK-Anbieter — UK GDPR konform, Datenweitergabe eingeschränkt";
      return "* Gute Datenschutzpolitik, Server-Standort außerhalb EU";
    case 3:
      if (isUS || isGB) return "* Privacy Policy vorhanden, aber Datenweitergabe an Service-Partner möglich";
      return "* Eingeschränkte Transparenz — Datenschutzrichtlinien vorhanden";
    case 4:
      if (isUS) return "* US-Cloud — Datenweitergabe an Dritte & Training auf Nutzerdaten möglich";
      return "* Eingeschränkter Datenschutz — Daten teils für Werbung oder Training genutzt";
    case 5:
      if (isUS) return "* US-Server & CLOUD Act — US-Behörden können Datenzugriff erzwingen; Konversationen oft für KI-Training genutzt";
      return "* Hohes Datenschutzrisiko — fehlende Transparenz, möglicher Datenmissbrauch";
    default:
      return "";
  }
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
      style={{ width: 272, height: 500, "--hover-color": hoverColor } as React.CSSProperties}
      onClick={() => setFlipped((f) => !f)}
      title="Klicken zum Umdrehen"
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>

        {/* ── FRONT ─────────────────────────────────────────── */}
        <div className="flip-card-face flip-card-front rounded-2xl shadow-lg border border-white/40 flex flex-col">

          {/* top bar — source badge only, flag moved to monster image */}
          <div className="flex items-center justify-between px-5 pt-4 pb-1 shrink-0">
            <span
              className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                card.sourceType === "open"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {card.sourceType === "open" ? "OPEN WEIGHTS" : "CLOSED SOURCE"}
            </span>
          </div>
          {card.sourceType === "open" && (
            <p className="text-[10px] text-slate-400 leading-tight text-center px-5 pb-1">
              lokal hostbar, in der Cloud oder beim Anbieter
            </p>
          )}

          {/* monster image — flag badge overlaid bottom-right */}
          <div className="flex justify-center py-2 shrink-0">
            <div className="relative">
              <div
                className="rounded-full flex items-center justify-center overflow-hidden shadow-md"
                style={{
                  width: 88,
                  height: 88,
                  backgroundColor: company.color + "22",
                  border: `3px solid ${company.color}`,
                }}
              >
                {card.discontinued ? (
                  <span className="text-4xl grayscale opacity-50">🚫</span>
                ) : (
                  <img
                    src={card.monster}
                    alt={card.name}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </div>
              {/* Flag badge */}
              <div
                className="absolute -bottom-1 -right-1 text-base leading-none rounded-full bg-white shadow-md flex items-center justify-center"
                style={{ width: 26, height: 26 }}
              >
                {card.flag}
              </div>
            </div>
          </div>

          {/* name block */}
          <div className="flex-1 flex flex-col items-center px-5 pb-1 text-center min-h-0">
            <div
              className="text-xs font-bold tracking-wide uppercase mb-1 shrink-0"
              style={{ color: company.color }}
            >
              {company.name}
            </div>
            <h3
              className="font-bold text-sm leading-tight text-slate-800 shrink-0"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {card.name}
            </h3>
            {/* nickname */}
            <p className="text-xs font-semibold text-slate-700 mt-1.5 leading-snug">
              {card.nickname}
            </p>
            {/* tagline */}
            <p className="text-[11px] font-medium text-slate-500 mt-2 leading-snug">
              {card.tagline}
            </p>
          </div>

          {/* tags row */}
          <div className="px-5 pt-1 pb-3 flex flex-wrap gap-1.5 justify-center shrink-0">
            {card.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2 py-1 rounded-full"
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


          {/* privacy footer */}
          {(() => {
            const note = getPrivacyNote(card);
            return (
              <div className="px-5 pb-4 flex flex-col items-center gap-2 shrink-0">
                {card.localOnlyWarning ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-emerald-600">🔒 Lokal: Volle Datenkontrolle</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <MuffinRating rating={card.sugarRating} />
                    <span className="text-[10px] font-semibold text-slate-500">
                      {ratingLabel[card.sugarRating]}
                    </span>
                  </div>
                )}
                {note && (
                  <p className="text-[9.5px] text-slate-500 leading-snug text-center px-2 italic">
                    {note}
                  </p>
                )}
              </div>
            );
          })()}

          {card.discontinued && (
            <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
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
