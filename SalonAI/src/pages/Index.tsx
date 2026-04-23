import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "../data/monsters";
import CategorySection from "../components/CategorySection";
import FloatingChat from "../components/FloatingChat";

type FilterId = "all" | "cloud" | "foundation" | "specialized" | "agentic";

const FILTERS: { id: FilterId; label: string; icon: string }[] = [
  { id: "all",         label: "Alle",            icon: "✨" },
  { id: "cloud",       label: "Cloud",           icon: "☁️" },
  { id: "foundation",  label: "Foundation",      icon: "🧠" },
  { id: "specialized", label: "Spezialisiert",   icon: "🔬" },
  { id: "agentic",     label: "Agentic & App",   icon: "🤖" },
];

type MissionId = "bilder" | "text" | "coding" | "research";
type SubSpecId = "aesthetik" | "bearbeitung" | "vektor" | "praezision" | "masse" | "email" | "thinker" | "doer" | "wenig-docs" | "grosse-archive";
type HostingId = "cloud-us" | "cloud-eu" | "lokal";

const MISSIONS: { id: MissionId; label: string; icon: string; desc: string }[] = [
  { id: "bilder",   label: "Bilder & Design",       icon: "🎨", desc: "Visuals, Logos, Fotobearbeitung" },
  { id: "text",     label: "Text & Kommunikation",  icon: "✍️", desc: "Schreiben, zusammenfassen, E-Mails" },
  { id: "coding",   label: "Coding & Daten",        icon: "💻", desc: "Software, Analyse, Automatisierung" },
  { id: "research", label: "Research & Wissen",     icon: "🔍", desc: "Fakten suchen, PDFs verstehen" },
];

const SUB_SPECS: Record<MissionId, { id: SubSpecId; label: string; icon: string; desc: string }[]> = {
  bilder: [
    { id: "aesthetik",   label: "Maximale Ästhetik & Kunst",      icon: "🖼️", desc: "Kunstvolle, cineastische Bilder" },
    { id: "bearbeitung", label: "Integrierte Bearbeitung",        icon: "✏️", desc: "Direkt in Photoshop oder Canva" },
    { id: "vektor",      label: "Exaktes Branding & Vektoren",    icon: "📐", desc: "Logos, SVGs, präzises Design" },
  ],
  text: [
    { id: "praezision",  label: "Präzises Schreiben & Nuancen",   icon: "🎯", desc: "Qualität, Argumentation, Tonalität" },
    { id: "masse",       label: "Schnelle Entwürfe",              icon: "⚡", desc: "Drafts, Social-Media, Masse" },
    { id: "email",       label: "Komplexe Workflows",             icon: "📧", desc: "E-Mails, Dokumente, Automatisierung" },
  ],
  coding: [
    { id: "thinker",     label: "Thinker: Planen & Reasoning",    icon: "🧠", desc: "Tiefes Reasoning, Architektur" },
    { id: "doer",        label: "Doer: Direkt handeln",           icon: "🤖", desc: "Agenten, Vibe-Coding, Prototypen" },
  ],
  research: [
    { id: "wenig-docs",      label: "Ein paar Dokumente",     icon: "📄", desc: "PDFs verstehen, Zusammenfassungen" },
    { id: "grosse-archive",  label: "Riesige Archive",        icon: "🗄️", desc: "Hunderte Seiten, Long-Context" },
  ],
};

const HOSTING_OPTIONS: { id: HostingId; label: string; icon: string; desc: string }[] = [
  { id: "cloud-us",  label: "Cloud (US)",       icon: "☁️",  desc: "Beste KI-Intelligenz — OpenAI, Google, Anthropic" },
  { id: "cloud-eu",  label: "Cloud (EU/DSGVO)", icon: "🛡️", desc: "Datenschutz Prio 1 — Mistral, STACKIT, Hetzner" },
  { id: "lokal",     label: "Lokal (Offline)",  icon: "💻",  desc: "Nichts verlässt meinen Rechner — Llama, DeepSeek" },
];

const REDDIT_ORACLE: Record<SubSpecId, string> = {
  aesthetik:         "r/midjourney: \"Midjourney v8 ist für Kunstprojekte einfach unerreichbar\"",
  bearbeitung:       "r/photoshop: \"Firefly + Generative Fill ist der einzige Workflow der wirklich funktioniert\"",
  vektor:            "r/logodesign: \"Recraft ist endlich ein Tool für echte Designer — kein Spielzeug mehr\"",
  praezision:        "r/ChatGPT 2026: \"Claude ist die #1-Wahl für durchdachte, nuancierte Texte\"",
  masse:             "r/marketing: \"GPT-4o mini ist der Cost-Efficiency-König für Content-Teams\"",
  email:             "r/productivity: \"ChatGPT mit Custom Instructions transformiert E-Mail-Workflows komplett\"",
  thinker:           "r/MachineLearning: \"Claude für Architekturentscheidungen, nicht für schnelles Prototyping\"",
  doer:              "r/vibecoding: \"Cursor + Windsurf-Cascade sind ein unschlagbares Duo — bahnbrechend\"",
  "wenig-docs":      "r/ChatGPT: \"NotebookLM ist das wichtigste Produktivitäts-Tool seit Google Docs\"",
  "grosse-archive":  "r/LocalLLaMA: \"Gemini 2.5 Pro ist der Long-Context-König 2026 — kein Konkurrent in Sicht\"",
};

function filterCategories(id: FilterId) {
  if (id === "all")         return CATEGORIES;
  if (id === "foundation")  return CATEGORIES.filter((c) => c.tier === 1);
  return CATEGORIES.filter((c) => c.id === id);
}

function applyQuestionnaire(
  cats: typeof CATEGORIES,
  mission: MissionId | null,
  subSpec: SubSpecId | null,
  hosting: HostingId | null,
): typeof CATEGORIES {
  if (!mission) return cats;

  let result = cats;

  // Step 1: Mission → base category set
  switch (mission) {
    case "bilder":
      result = result.filter((c) => c.id === "image");
      break;
    case "text":
      result = result.filter((c) => c.id === "text");
      break;
    case "coding":
      result = result
        .map((c) => ({ ...c, cards: c.cards.filter((card) =>
          card.tags.some((t) => ["coding", "IDE", "vibe-coding", "agent", "CLI"].includes(t))
        )}))
        .filter((c) => c.cards.length > 0);
      break;
    case "research":
      result = result
        .map((c) => ({ ...c, cards: c.cards.filter((card) =>
          card.tags.some((t) => ["research", "RAG", "documents", "search", "PDF", "summarization", "long-context"].includes(t))
        )}))
        .filter((c) => c.cards.length > 0);
      break;
  }

  // Step 2: SubSpec → narrow by recommended card IDs
  const SUB_SPEC_CARDS: Record<SubSpecId, string[]> = {
    aesthetik:          ["midjourney", "dalle3"],
    bearbeitung:        ["nanobanana", "adobe-firefly", "canva"],
    vektor:             ["recraft", "flux"],
    praezision:         ["claude", "mistral"],
    masse:              ["chatgpt", "gemini"],
    email:              ["chatgpt", "claude", "gemini"],
    thinker:            ["claude", "claude-code", "deepseek", "cursor"],
    doer:               ["cursor", "lovable", "replit", "windsurf", "manus", "claude-code"],
    "wenig-docs":       ["notebooklm", "notebooklm-agent", "humata", "cohere"],
    "grosse-archive":   ["gemini", "jamba"],
  };

  if (subSpec) {
    const allowed = SUB_SPEC_CARDS[subSpec] ?? [];
    result = result
      .map((c) => ({ ...c, cards: c.cards.filter((card) => allowed.includes(card.id)) }))
      .filter((c) => c.cards.length > 0);
  }

  // Step 3: Hosting → privacy filter
  if (hosting === "cloud-eu") {
    result = result
      .map((c) => ({ ...c, cards: c.cards.filter((card) => card.sugarRating <= 2) }))
      .filter((c) => c.cards.length > 0);
  } else if (hosting === "lokal") {
    result = result
      .map((c) => ({ ...c, cards: c.cards.filter((card) => card.sourceType === "open" || card.localOnlyWarning === true) }))
      .filter((c) => c.cards.length > 0);
  }

  return result;
}

// ─── Questionnaire Modal ────────────────────────────────────────────────────
function QuestionnaireModal({
  onComplete,
  onClose,
}: {
  onComplete: (mission: MissionId, subSpec: SubSpecId, hosting: HostingId) => void;
  onClose: () => void;
}) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [dir, setDir] = useState(1);
  const [pickedMission, setPickedMission] = useState<MissionId | null>(null);
  const [pickedSubSpec, setPickedSubSpec] = useState<SubSpecId | null>(null);

  function handleMission(id: MissionId) {
    setDir(1); setPickedMission(id); setStep(1);
  }
  function handleSubSpec(id: SubSpecId) {
    setDir(1); setPickedSubSpec(id); setStep(2);
  }
  function handleHosting(id: HostingId) {
    onComplete(pickedMission!, pickedSubSpec!, id);
  }
  function handleBack() {
    setDir(-1);
    if (step === 2) { setStep(1); }
    else { setPickedMission(null); setStep(0); }
  }

  const slideVariants = {
    enter:  (d: number) => ({ x: d * 50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -50, opacity: 0 }),
  };

  const STEP_HEADERS = [
    "Was möchtest du erschaffen oder erledigen?",
    "Wie genau?",
    "Wo sollen deine Daten bleiben?",
  ];

  const subSpecs = pickedMission ? SUB_SPECS[pickedMission] : [];
  const missionInfo = MISSIONS.find((m) => m.id === pickedMission);
  const subSpecInfo = subSpecs.find((s) => s.id === pickedSubSpec);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(8,16,36,0.70)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.92, y: 48, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 48, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────── */}
        <div className="px-6 pt-5 pb-4" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: 6,
                    width: step === i ? 20 : 6,
                    background: step === i ? "#003399" : "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>
            <button onClick={onClose} className="text-white/35 hover:text-white/80 text-xl leading-none transition-colors">✕</button>
          </div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold mb-1">
            KI-Kompass · Schritt {step + 1} von 3
          </p>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.h2
              key={`h-${step}`}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.18 }}
              className="text-white text-xl font-bold leading-snug"
            >
              {STEP_HEADERS[step]}
            </motion.h2>
          </AnimatePresence>
          {step > 0 && missionInfo && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-white/50 text-xs mt-1.5">
              {missionInfo.icon}{" "}
              <span className="text-blue-200 font-semibold">{missionInfo.label}</span>
              {step > 1 && subSpecInfo && (
                <> · <span className="text-blue-100">{subSpecInfo.label}</span></>
              )}
            </motion.p>
          )}
        </div>

        {/* ── Body ───────────────────────────────── */}
        <div className="p-5">
          <AnimatePresence mode="wait" custom={dir}>
            {step === 0 ? (
              <motion.div
                key="s0" custom={dir} variants={slideVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.18 }}
                className="grid grid-cols-2 gap-2"
              >
                {MISSIONS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleMission(m.id)}
                    className="flex flex-col items-start gap-1 p-3.5 rounded-2xl border-2 border-slate-100 hover:border-blue-300 hover:bg-blue-50 text-left transition-all duration-150 active:scale-95"
                  >
                    <span className="text-3xl">{m.icon}</span>
                    <span className="font-semibold text-slate-800 text-sm leading-tight">{m.label}</span>
                    <span className="text-[11px] text-slate-400 leading-tight">{m.desc}</span>
                  </button>
                ))}
              </motion.div>
            ) : step === 1 ? (
              <motion.div
                key="s1" custom={dir} variants={slideVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.18 }}
                className="flex flex-col gap-2"
              >
                {subSpecs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSubSpec(s.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-amber-400 hover:bg-amber-50 text-left transition-all duration-150 active:scale-95"
                  >
                    <span className="text-3xl shrink-0">{s.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-800">{s.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
                    </div>
                  </button>
                ))}
                <button onClick={handleBack} className="text-xs text-slate-400 hover:text-slate-600 text-center mt-1 transition-colors">
                  ← Zurück
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="s2" custom={dir} variants={slideVariants}
                initial="enter" animate="center" exit="exit" transition={{ duration: 0.18 }}
                className="flex flex-col gap-2"
              >
                {HOSTING_OPTIONS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleHosting(h.id)}
                    className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-300 hover:bg-blue-50 text-left transition-all duration-150 active:scale-95"
                  >
                    <span className="text-3xl shrink-0">{h.icon}</span>
                    <div>
                      <div className="font-semibold text-slate-800">{h.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{h.desc}</div>
                    </div>
                  </button>
                ))}
                <button onClick={handleBack} className="text-xs text-slate-400 hover:text-slate-600 text-center mt-1 transition-colors">
                  ← Zurück
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const LAYER_INFO: Record<number, { color: string; label: string }> = {
  0: { color: "#94a3b8", label: "Basis-Layer" },
  1: { color: "#60a5fa", label: "Foundation Layer" },
  2: { color: "#a78bfa", label: "Spezial-Layer" },
  3: { color: "#fbbf24", label: "Agentic Layer" },
};

// ─── Pyramid ────────────────────────────────────────────────────────────────
const PYRAMID_LAYERS = [
  {
    id: "agentic" as FilterId,
    label: "Application & Agent Layer",
    sub: "Lovable · Cursor · Manus · Duck.ai · Perplexity",
    note: "Die Anwendungen, die du täglich nutzt — ChatGPT, Perplexity, Lovable …",
    icon: "🤖",
    w: 38,
    bg: "#fef3c7",
    border: "#d97706",
    text: "#92400e",
  },
  {
    id: "specialized" as FilterId,
    label: "Specialized Models",
    sub: "Sonar · Whisper · AlphaFold · EuroLLM · EUBERT",
    note: "Modelle, die auf ein Thema spezialisiert wurden — Übersetzen, Suchen, Forschung …",
    icon: "🔬",
    w: 58,
    bg: "#ede9fe",
    border: "#7c3aed",
    text: "#4c1d95",
  },
  {
    id: "foundation" as FilterId,
    label: "Foundation Models",
    sub: "Text · Bild · Audio · Video · World Models",
    note: "Die großen KI-Hirne — trainiert auf riesigen Datenmengen",
    icon: "🧠",
    w: 78,
    bg: "#dbeafe",
    border: "#3b82f6",
    text: "#1e3a8a",
  },
  {
    id: "cloud" as FilterId,
    label: "Cloud Infrastructure",
    sub: "Hetzner · AWS · Azure · Google Cloud · STACKIT",
    note: "Das Fundament: Hardware & Rechenzentren, auf denen alles läuft",
    icon: "☁️",
    w: 84,
    bg: "#e8f4f8",
    border: "#64748b",
    text: "#1e293b",
  },
] as const;

function PyramidDiagram({
  active,
  onSelect,
}: {
  active: FilterId;
  onSelect: (id: FilterId) => void;
}) {
  // For each connector between layer[i] and layer[i+1],
  // the trapezoid goes from layer[i].w wide at top → layer[i+1].w wide at bottom.
  function connectorClip(topW: number, botW: number) {
    const tl = (100 - topW) / 2;
    const tr = 100 - tl;
    const bl = (100 - botW) / 2;
    const br = 100 - bl;
    return `polygon(${tl}% 0%, ${tr}% 0%, ${br}% 100%, ${bl}% 100%)`;
  }

  // Top triangle peak: 0 at top, layer[0].w at bottom
  const topPeakW = PYRAMID_LAYERS[0].w;
  const tl0 = (100 - topPeakW) / 2;
  const topPeakClip = `polygon(50% 0%, ${100 - tl0}% 100%, ${tl0}% 100%)`;

  // Bottom base triangle: layer[last].w at top, 0 at bottom
  const botW = PYRAMID_LAYERS[PYRAMID_LAYERS.length - 1].w;
  const bl0 = (100 - botW) / 2;
  const botBaseClip = `polygon(${bl0}% 0%, ${100 - bl0}% 0%, 50% 100%)`;

  const NAVY = "#1e3a5f";

  return (
    <div className="w-full max-w-3xl mx-auto select-none">
      {/* ── Desktop Pyramid (hidden on mobile) ── */}
      <div className="hidden md:flex gap-3 items-stretch">
      {/* ── Pyramid ──────────────────── */}
      <div className="flex-1 min-w-0">
      {/* ── Peak ─────────────────────────── */}
      <div className="flex justify-center">
        <div
          style={{
            width: "100%",
            height: 36,
            backgroundColor: NAVY,
            clipPath: topPeakClip,
          }}
        />
      </div>

      {PYRAMID_LAYERS.map((layer, i) => {
        const isActive = active === layer.id;
        const next = PYRAMID_LAYERS[i + 1];
        const count = filterCategories(layer.id).reduce((a, c) => a + c.cards.length, 0);

        return (
          <div key={layer.id}>
            {/* ── Layer band ───────────────── */}
            <div className="flex justify-center">
              <button
                onClick={() => onSelect(layer.id)}
                className="relative transition-all duration-200 group"
                style={{ width: `${layer.w}%` }}
                title={`${layer.label} anzeigen — ${count} Karten`}
              >
                <div
                  className="w-full rounded-lg border-2 py-3 px-4 text-left transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? layer.border + "55" : layer.bg,
                    borderColor: layer.border,
                    boxShadow: isActive
                      ? `0 0 0 3px ${layer.border}88, 0 4px 16px ${layer.border}44`
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none shrink-0">{layer.icon}</span>
                    <span
                      className="font-bold text-sm leading-tight"
                      style={{ fontFamily: "Orbitron, sans-serif", color: layer.text }}
                    >
                      {layer.label}
                    </span>
                    <span
                      className="ml-auto shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full transition-all"
                      style={{
                        backgroundColor: isActive ? layer.border : layer.border + "22",
                        color: isActive ? "#fff" : layer.text,
                        opacity: isActive ? 1 : 0.7,
                      }}
                    >
                      {count}
                    </span>
                  </div>
                  <p
                    className="text-[10px] mt-1 opacity-55 truncate"
                    style={{ color: layer.text }}
                  >
                    {layer.sub}
                  </p>
                  <p
                    className="text-[10px] font-bold mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: layer.border }}
                  >
                    ↓ {count} Karten ansehen
                  </p>
                </div>
              </button>
            </div>

            {/* ── Connector trapezoid to next layer ── */}
            {next && (
              <div className="flex justify-center">
                <div
                  style={{
                    width: "100%",
                    height: 22,
                    backgroundColor: NAVY,
                    clipPath: connectorClip(layer.w, next.w),
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* ── Base ─────────────────────────── */}
      <div className="flex justify-center">
        <div
          style={{
            width: "100%",
            height: 28,
            backgroundColor: NAVY,
            clipPath: botBaseClip,
          }}
        />
      </div>
      </div>{/* end pyramid flex-1 */}
      </div>{/* end desktop flex row */}

      {/* ── Mobile Vertical List (hidden on desktop) ── */}
      <div className="md:hidden flex flex-col gap-3 px-3">
        {PYRAMID_LAYERS.map((layer) => {
          const isActive = active === layer.id;
          const count = filterCategories(layer.id).reduce((a, c) => a + c.cards.length, 0);

          return (
            <button
              key={layer.id}
              onClick={() => onSelect(layer.id)}
              className="w-full rounded-2xl border-2 p-3 text-left transition-all relative overflow-hidden"
              style={{
                backgroundColor: isActive ? layer.border + "33" : layer.bg,
                borderColor: layer.border,
                boxShadow: isActive ? `0 0 0 2px ${layer.border}88, 0 4px 12px ${layer.border}33` : "0 2px 6px rgba(0,0,0,0.06)",
                transform: isActive ? "scale(1.02) translateY(2px)" : "scale(1)",
              }}
            >
              <div className="flex items-start gap-4 relative z-10 w-full">
                <div className="flex-shrink-0 text-3xl mt-0.5">{layer.icon}</div>
                <div className="flex-1 min-w-0 pr-6">
                  <h3
                    className="font-bold text-sm tracking-wide"
                    style={{ fontFamily: "Orbitron, sans-serif", color: layer.text }}
                  >
                    {layer.label}
                  </h3>
                  <p className="text-[11px] leading-snug mt-1 max-w-[200px]" style={{ color: layer.text, opacity: 0.8 }}>
                    {layer.sub}
                  </p>
                  <p className="text-[11px] italic leading-tight mt-1" style={{ color: layer.text, opacity: 0.65 }}>
                    {layer.note}
                  </p>
                </div>
              </div>
              <div
                 className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                 style={{ backgroundColor: layer.border, color: "#fff" }}
              >
                {count}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function Index() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [activeMission, setActiveMission] = useState<MissionId | null>(null);
  const [activeSubSpec, setActiveSubSpec] = useState<SubSpecId | null>(null);
  const [activeHosting, setActiveHosting] = useState<HostingId | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentTierInView, setCurrentTierInView] = useState<number | null>(null);

  const baseCategories = activeMission ? CATEGORIES : filterCategories(activeFilter);
  const visibleCategories = applyQuestionnaire(baseCategories, activeMission, activeSubSpec, activeHosting);
  const tiersInView = [...new Set(visibleCategories.map((c) => c.tier))];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentTierInView(Number(entry.target.getAttribute("data-tier")));
          }
        });
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );
    tiersInView.forEach((tier) => {
      const el = document.getElementById(`tier-section-${tier}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [tiersInView.join(",")]);

  function handlePyramidSelect(id: FilterId) {
    const next = activeFilter === id ? "all" : id;
    setActiveFilter(next);
    setActiveMission(null);
    setActiveSubSpec(null);
    setActiveHosting(null);
    if (next !== "all") {
      setTimeout(() => {
        document.getElementById("cards-main")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }

  function handleQuestionnaireComplete(mission: MissionId, subSpec: SubSpecId | null, hosting: HostingId | null) {
    setActiveMission(mission);
    setActiveSubSpec(subSpec);
    setActiveHosting(hosting);
    setActiveFilter("all");
    setShowQuestionnaire(false);
  }

  function clearQuestionnaire() {
    setActiveMission(null);
    setActiveSubSpec(null);
    setActiveHosting(null);
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #D6E9F5, #C0D8EE, #B8D0E8)",
        fontFamily: "DM Sans, Space Grotesk, sans-serif",
      }}
    >
      {/* ── QUESTIONNAIRE MODAL ───────────────────────────────── */}
      <AnimatePresence>
        {showQuestionnaire && (
          <QuestionnaireModal
            onComplete={handleQuestionnaireComplete}
            onClose={() => setShowQuestionnaire(false)}
          />
        )}
      </AnimatePresence>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <header className="pt-7 pb-8 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Back to Salon AI */}
          <a
            href="/"
            className="inline-flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-70"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(27,46,74,0.12)",
              color: "#1B2E4A",
            }}
          >
            ← Salon AI
          </a>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "Playfair Display, serif", letterSpacing: "-0.01em", color: "#1B2E4A" }}
          >
            KI Guide 2026
          </h1>
          <p className="text-base font-medium mb-3 max-w-xl mx-auto" style={{ color: "#3D526A" }}>
            Alle relevanten Modelle & Tools — von der Infrastruktur bis zur Anwendung
          </p>
          <p className="hidden sm:block text-sm max-w-xl mx-auto mb-4 leading-relaxed" style={{ color: "#5A7A96" }}>
            Jedes Modell ist grundsätzlich sehr vielseitig — die Stärken, die wir hervorheben, basieren auf Nutzerfeedback aus Online-Communities (Reddit, Stack Overflow).
          </p>

          {/* PYRAMID — hidden on mobile, too complex for small screens */}
          <div className="hidden sm:block">
            <PyramidDiagram active={activeFilter} onSelect={handlePyramidSelect} />
          </div>

          {/* Questionnaire CTA — big & centred */}
          <div className="flex flex-col items-center gap-2 mt-6">
            {!activeMission ? (
              <button
                onClick={() => setShowQuestionnaire(true)}
                className="flex items-center gap-3 rounded-full font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: "#003399",
                  color: "#fff",
                  fontSize: 14,
                  padding: "12px 24px",
                  boxShadow: "0 6px 28px rgba(0,51,153,0.40), 0 2px 8px rgba(0,0,0,0.18)",
                  letterSpacing: "0.01em",
                }}
              >
                <span style={{ fontSize: 18 }}>🎯</span>
                <span className="hidden sm:inline">Welches KI-Tool passt zu dir?</span>
                <span className="sm:hidden">KI-Tool finden</span>
                <span style={{ opacity: 0.65, fontSize: 13 }}>3 Klicks →</span>
              </button>
            ) : (
              <button
                onClick={clearQuestionnaire}
                className="flex items-center gap-2 rounded-full transition-all hover:opacity-70"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(27,46,74,0.12)",
                  color: "#1B2E4A",
                  fontSize: 12,
                  padding: "8px 18px",
                }}
              >
                ✕ Filter zurücksetzen
              </button>
            )}
            <p className="text-xs mt-1 select-none" style={{ color: "#7A9DB8" }}>↓ scroll</p>
          </div>
        </div>
      </header>

      {/* ── STICKY FILTER BAR ─────────────────────────────────── */}
      <div className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm" style={{ background: "rgba(200,221,240,0.82)", borderColor: "rgba(255,255,255,0.35)" }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Row 1: Tier filters + layer indicator */}
          <div className="flex items-center gap-2 pt-2 pb-1">
            {/* Scrollable filter pills — flex-1 so indicator stays pinned right */}
            <div className="flex gap-1.5 overflow-x-auto pl-1 scrollbar-none items-center flex-1 min-w-0">
            {/* "Alle" — always prominent, acts as reset anchor */}
            {(() => {
              const totalCount = CATEGORIES.reduce((a, c) => a + c.cards.length, 0);
              const isAllActive = activeFilter === "all" && !activeMission;
              return (
                <button
                  onClick={() => { setActiveFilter("all"); setActiveMission(null); setActiveSubSpec(null); setActiveHosting(null); }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0"
                  style={{
                    background: "#ffffff",
                    color: "#1e293b",
                    border: isAllActive ? "2px solid #003399" : "2px solid transparent",
                    boxShadow: isAllActive ? "0 2px 10px rgba(0,51,153,0.18)" : "0 1px 4px rgba(0,0,0,0.10)",
                  }}
                >
                  <span>✨</span>
                  <span>Alle</span>
                  <span className="text-[10px] rounded-full px-1.5 bg-slate-100 text-slate-500 font-semibold">
                    {totalCount}
                  </span>
                </button>
              );
            })()}

            {/* Thin separator */}
            <div className="w-px h-5 bg-white/25 shrink-0" />

            {/* Other tier filters */}
            {FILTERS.filter((f) => f.id !== "all").map((f) => {
              const count = filterCategories(f.id).reduce((a, c) => a + c.cards.length, 0);
              const isActive = activeFilter === f.id && !activeMission;
              return (
                <button
                  key={f.id}
                  onClick={() => { setActiveFilter(f.id); setActiveMission(null); setActiveSubSpec(null); setActiveHosting(null); }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-white text-slate-800 shadow-md scale-105"
                      : "text-white/80 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                  <span className={`text-[10px] rounded-full px-1.5 ${isActive ? "bg-slate-100 text-slate-500" : "bg-white/20 text-white/70"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
            </div>{/* end scrollable pills */}

            {/* Current-tier breadcrumb — outside the scroll area so it's always visible */}
            {currentTierInView !== null && (
              <>
                {/* Desktop: icon breadcrumb ☁️ › 🧠 › 🔬 › 🤖 with active highlighted */}
                <div className="hidden sm:flex shrink-0 items-center gap-0.5 bg-slate-800/40 px-2.5 py-1.5 rounded-full border border-white/20 shadow-inner">
                  {([...PYRAMID_LAYERS].reverse()).map((layer, i) => {
                    const tierMap: Record<string, number> = { agentic: 3, specialized: 2, foundation: 1, cloud: 0 };
                    const tier = tierMap[layer.id];
                    const info = LAYER_INFO[tier];
                    const isActive = currentTierInView === tier;
                    return (
                      <div key={layer.id} className="flex items-center gap-0.5">
                        {i > 0 && <span className="text-white/20 text-xs leading-none mx-0.5">›</span>}
                        <div
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-all duration-300 cursor-default"
                          style={{
                            background: isActive ? info.color + "28" : "transparent",
                            border: `1px solid ${isActive ? info.color + "70" : "transparent"}`,
                            transform: isActive ? "scale(1.08)" : "scale(1)",
                          }}
                        >
                          <span className={`text-sm leading-none transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-35"}`}>
                            {layer.icon}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: info.color }}>
                              {layer.label.split(" ")[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: icon + layer name pill */}
                <div
                  className="sm:hidden shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-300"
                  style={{
                    background: LAYER_INFO[currentTierInView].color + "33",
                    border: `1px solid ${LAYER_INFO[currentTierInView].color}88`,
                  }}
                >
                  <span className="text-base leading-none">
                    {([...PYRAMID_LAYERS].reverse()).find(l =>
                      ({ agentic: 3, specialized: 2, foundation: 1, cloud: 0 } as Record<string, number>)[l.id] === currentTierInView
                    )?.icon}
                  </span>
                  <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: LAYER_INFO[currentTierInView].color }}>
                    {LAYER_INFO[currentTierInView].label}
                  </span>
                </div>
              </>
            )}
          </div>{/* end Row 1 outer flex */}
          {/* Row 2: Active filter state (only shown when questionnaire result is active) */}
          {activeMission && (
          <div className="border-t border-white/10 mt-1 pt-1.5 pb-2 flex items-center gap-2 flex-wrap">
            <>
                <span className="text-white/45 text-[10px] font-medium shrink-0">Für dich:</span>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold text-white" style={{ background: "#003399" }}>
                  <span>{MISSIONS.find((m) => m.id === activeMission)?.icon}</span>
                  <span>{MISSIONS.find((m) => m.id === activeMission)?.label}</span>
                </span>
                {activeSubSpec && (() => {
                  const allSubSpecs = Object.values(SUB_SPECS).flat();
                  const subSpec = allSubSpecs.find((s) => s.id === activeSubSpec);
                  return subSpec ? (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold text-white" style={{ background: "#2255BB" }}>
                      <span>{subSpec.icon}</span>
                      <span>{subSpec.label}</span>
                    </span>
                  ) : null;
                })()}
                {activeHosting && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold text-white" style={{ background: "#7A9DB8" }}>
                    <span>{HOSTING_OPTIONS.find((h) => h.id === activeHosting)?.icon}</span>
                    <span>{HOSTING_OPTIONS.find((h) => h.id === activeHosting)?.label}</span>
                  </span>
                )}
                {activeSubSpec && REDDIT_ORACLE[activeSubSpec] && (
                  <span className="text-[10px] text-white/60 italic hidden md:inline max-w-xs truncate">
                    „{REDDIT_ORACLE[activeSubSpec]}"
                  </span>
                )}
                <button
                  onClick={() => setShowQuestionnaire(true)}
                  className="text-[11px] text-white/55 hover:text-white px-2.5 py-1 rounded-full hover:bg-white/15 transition-all"
                >
                  ✏️ Ändern
                </button>
                <button
                  onClick={clearQuestionnaire}
                  className="text-[11px] text-white/45 hover:text-white/80 px-2 py-1 rounded-full hover:bg-white/15 transition-all"
                  title="Filter zurücksetzen"
                >
                  ✕
                </button>
            </>
          </div>
          )}
        </div>
      </div>


      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <main id="cards-main" className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8 space-y-3 sm:space-y-4">
        {tiersInView.map((tier) => {
          const tierCats = visibleCategories.filter((c) => c.tier === tier);
          const info = LAYER_INFO[tier];

          return (
            <div key={tier} id={`tier-section-${tier}`} data-tier={tier}>
              {/* Tier separator */}
              <div className="flex items-center gap-4 my-6 first:mt-0">
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: info.color + "44" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    color: info.color,
                    backgroundColor: info.color + "22",
                    border: `1px solid ${info.color}44`,
                  }}
                >
                  Tier {tier} · {info.label}
                </span>
                <div
                  className="h-px flex-1"
                  style={{ backgroundColor: info.color + "44" }}
                />
              </div>

              <div className="space-y-4">
                {tierCats.map((cat, i) => (
                  <CategorySection key={cat.id} category={cat} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* ── WHERE DOES THE LLM RUN? ───────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 mt-16 mb-8">
        <div
          className="rounded-3xl overflow-hidden border border-white/25"
          style={{ background: "rgba(15,23,42,0.80)", backdropFilter: "blur(12px)" }}
        >
          <div className="px-8 py-6 border-b border-white/10">
            <h2 className="text-xl font-black text-white text-center" style={{ fontFamily: "Orbitron, sans-serif" }}>
              🖥️ Wo läuft das KI-Modell eigentlich?
            </h2>
            <p className="text-center text-white/50 text-sm mt-1">
              Dasselbe Modell — drei verschiedene Orte, drei verschiedene Konsequenzen
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ── LOCAL ── */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-3 border"
              style={{ background: "rgba(100,116,139,0.15)", borderColor: "rgba(100,116,139,0.4)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "rgba(100,116,139,0.25)" }}
                >
                  💻
                </div>
                <div>
                  <div className="font-black text-white text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>Lokal</div>
                  <div className="text-[11px] text-slate-400">Eigener Computer</div>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <span className="text-white/75">Daten verlassen nie dein Gerät</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <span className="text-white/75">Kein Abo, keine API-Kosten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
                  <span className="text-white/75">Oft zu groß für normale PCs — braucht starke GPU & viel RAM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
                  <span className="text-white/75">Kleinere Modelle = weniger Intelligenz</span>
                </li>
              </ul>
              <div className="mt-auto pt-2 border-t border-slate-600/30">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Beispiele</p>
                <div className="flex flex-wrap gap-1">
                  {["Llama 3", "Mistral (lokal)", "DeepSeek", "Ollama"].map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-600/30 text-slate-300 border border-slate-600/40">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── US CLOUD ── */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-3 border"
              style={{ background: "rgba(59,130,246,0.12)", borderColor: "rgba(59,130,246,0.35)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "rgba(59,130,246,0.2)" }}
                >
                  🇺🇸
                </div>
                <div>
                  <div className="font-black text-white text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>US Cloud</div>
                  <div className="text-[11px] text-blue-400">Server in den USA</div>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <span className="text-white/75">Stärkste Modelle der Welt (GPT-4o, Claude, Gemini)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <span className="text-white/75">Sofort nutzbar, kein Setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  <span className="text-white/75">Daten gehen in die USA — US-Recht, Patriot Act</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  <span className="text-white/75">DSGVO-Konformität schwierig</span>
                </li>
              </ul>
              <div className="mt-auto pt-2 border-t border-blue-800/30">
                <p className="text-[10px] text-blue-500/70 font-semibold uppercase tracking-wider mb-1">Beispiele</p>
                <div className="flex flex-wrap gap-1">
                  {["ChatGPT", "Claude.ai", "Gemini", "Midjourney"].map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-600/30">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── EU CLOUD ── */}
            <div
              className="rounded-2xl p-5 flex flex-col gap-3 border"
              style={{ background: "rgba(16,185,129,0.10)", borderColor: "rgba(16,185,129,0.35)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "rgba(16,185,129,0.2)" }}
                >
                  🇪🇺
                </div>
                <div>
                  <div className="font-black text-white text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>EU Cloud</div>
                  <div className="text-[11px] text-emerald-400">Server in Europa</div>
                </div>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <span className="text-white/75">DSGVO-konform, Daten bleiben in der EU</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                  <span className="text-white/75">Kein US-Recht, kein Patriot Act</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
                  <span className="text-white/75">Modelle oft etwas schwächer als US-Top-Modelle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
                  <span className="text-white/75">Weniger Auswahl, teils höhere Kosten</span>
                </li>
              </ul>
              <div className="mt-auto pt-2 border-t border-emerald-800/30">
                <p className="text-[10px] text-emerald-500/70 font-semibold uppercase tracking-wider mb-1">Beispiele</p>
                <div className="flex flex-wrap gap-1">
                  {["Mistral (EU)", "STACKIT", "Hetzner AI", "EuroLLM"].map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-600/30">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="px-6 pb-5">
            <div
              className="rounded-xl px-5 py-3 text-center"
              style={{ background: "rgba(0,51,153,0.08)", border: "1px solid rgba(0,51,153,0.18)" }}
            >
              <p className="text-xs text-white/75 leading-relaxed">
                <span className="font-bold text-white/90">💡 Merksatz:</span> Das KI-Modell selbst ist oft dasselbe — der Unterschied ist, <em>wo</em> es läuft und wer Zugriff auf deine Eingaben hat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOSSARY ──────────────────────────────────────────── */}
      <section id="glossary" className="max-w-7xl mx-auto px-4 mt-16 mb-4">
        <div className="rounded-3xl border border-white/30 overflow-hidden" style={{ background: "rgba(15,23,42,0.85)" }}>
          <div className="px-8 py-6 border-b border-white/15">
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
              📖 Glossar — KI-Begriffe einfach erklärt
            </h2>
          </div>
          <div className="px-8 py-6 space-y-8">
            {[
              {
                group: "🧠 Wie KI denkt & lernt",
                color: "#60a5fa",
                terms: [
                  { term: "Foundation Model", def: "Ein großes, breit trainiertes Basismodell. Alles andere baut darauf auf — der Motor unter der Motorhaube." },
                  { term: "LLM", def: "Large Language Model — Großes Sprachmodell, das mit riesigen Textmengen trainiert wurde und Sprache versteht sowie erzeugt." },
                  { term: "Weltmodell (World Model)", def: "Eine KI, die nicht nur Text erzeugt, sondern physikalische Gesetze der Welt versteht und simuliert — Grundlage für Robotik." },
                  { term: "Halluzination", def: "Wenn eine KI mit vollem Vertrauen falsche Fakten erfindet. Nicht Lüge — strukturelle Schwäche: Die KI weiß nicht, was sie nicht weiß." },
                  { term: "Context Window", def: "Wie viel Text eine KI gleichzeitig im Kopf behalten kann. Kurzes Fenster = sie vergisst frühere Sätze. Langes = sie erinnert sich an alles." },
                  { term: "Token", def: "Die kleinste Einheit, mit der KI Text verarbeitet — ungefähr ¾ eines Worts. Kosten, Geschwindigkeit und Gedächtnis werden in Tokens gemessen." },
                  { term: "Prompt", def: "Die Eingabe oder Anweisung an eine KI. Qualität des Prompts = Qualität der Antwort. Prompting ist eine eigene Kunst." },
                  { term: "RAG", def: "Retrieval-Augmented Generation — die KI durchsucht zuerst deine Dokumente, dann antwortet sie. Wie ein Assistent, der erst nachschlägt, dann spricht." },
                  { term: "Fine-tuning", def: "Ein fertig trainiertes Modell wird auf spezifischen Daten nachgeschult — wie ein Allgemeinarzt, der sich zum Spezialisten fortbildet." },
                  { term: "Self-supervised", def: "Lernmethode: Die KI trainiert auf riesigen Datenmengen ohne manuelle Beschriftung. Sie findet Muster selbst." },
                  { term: "Multimodal", def: "Eine KI, die mehrere Medientypen gleichzeitig versteht und erzeugt — Text, Bild, Audio und Video in einem Modell. Kein Wechsel mehr zwischen Tools." },
                  { term: "NLP", def: "Natural Language Processing — Sprachverarbeitung. Der Fachbegriff dafür, dass Computer menschliche Sprache verstehen und verarbeiten können." },
                ],
              },
              {
                group: "🤖 Agenten & Automatisierung",
                color: "#fbbf24",
                terms: [
                  { term: "Agent / KI-Agent", def: "Eine KI, die nicht nur antwortet, sondern selbstständig handelt: Dateien öffnen, E-Mails senden, im Browser klicken — ohne dein Eingreifen." },
                  { term: "Agent Harness", def: "Das Cockpit für KI-Agenten: Software, die mehrere Agenten koordiniert, ihnen Werkzeuge gibt und ihre Zusammenarbeit steuert." },
                  { term: "Orchestrator", def: "Steuert mehrere KI-Agenten wie ein Dirigent ein Orchester: wer was wann macht und wie Ergebnisse zusammengefügt werden." },
                  { term: "Copilot", def: "Eine KI, die neben dir mitarbeitet und Vorschläge macht — kein Autopilot, aber ein sehr cleverer Co-Pilot." },
                  { term: "Browser-Automation", def: "Eine KI übernimmt den Browser: klicken, Formulare ausfüllen, navigieren — wie ein unsichtbarer Mitarbeiter am Computer." },
                  { term: "Computer-Use", def: "KI, die einen ganzen Computer bedienen kann: Maus bewegen, tippen, Apps öffnen — wie Fernsteuerung durch künstliche Intelligenz." },
                  { term: "Digital Twin", def: "Digitale Kopie eines realen Objekts oder Systems (z.B. einer Fabrik), in der man Szenarien risikolos simulieren kann." },
                ],
              },
              {
                group: "🛠️ Tech & Tools",
                color: "#a78bfa",
                terms: [
                  { term: "API", def: "Application Programming Interface — eine Schnittstelle, über die Programme miteinander kommunizieren. Wie ein Steckdosen-Standard: Jeder Toaster passt rein." },
                  { term: "GPU", def: "Grafikkarte. Ursprünglich für Videospiele entwickelt, heute die wichtigste Hardware zum Trainieren und Betreiben von KI-Modellen." },
                  { term: "VRAM", def: "Videospeicher der Grafikkarte. Entscheidet, wie groß ein Modell sein darf, das lokal läuft. Zu wenig VRAM = Modell passt nicht drauf." },
                  { term: "CLI / Terminal", def: "Ein schwarzes Texteingabe-Fenster ohne bunte Oberfläche. Statt auf Buttons zu klicken, tippt man Befehle — mächtig, aber nur für Techies." },
                  { term: "IDE", def: "Integrated Development Environment — die Werkbank für Entwickler: Editor, Fehlersuche und Tools in einer Oberfläche." },
                  { term: "Pull Request (PR)", def: "Ein Vorschlag für eine Code-Änderung. Entwickler reichen ihn ein, Kollegen prüfen ihn, dann wird er eingebaut — wie Gegenlesen vor dem Veröffentlichen." },
                  { term: "CI/CD", def: "Continuous Integration / Delivery — automatisches Testen und Ausliefern von Code. Jede Änderung wird sofort geprüft und bei Erfolg eingespielt." },
                  { term: "MVP", def: "Minimum Viable Product — die kleinstmögliche Version eines Produkts, die schon funktioniert und echte Nutzer testen können." },
                  { term: "Aggregator", def: "Eine Plattform, die mehrere KI-Modelle unter einem Dach vereint — wie ein Supermarkt statt Einzelläden." },
                  { term: "Vibe-Coding", def: "Programmieren durch freie Beschreibung: Du erklärst auf Deutsch, was du willst — die KI schreibt den Code. Kein Vorwissen nötig." },
                  { term: "Low-code / No-code", def: "Software bauen, ohne (viel) zu programmieren — Bausteine zusammenklicken statt Code schreiben." },
                  { term: "TTS (Text-to-Speech)", def: "Text wird in gesprochene Sprache umgewandelt. Die KI liest vor — von Artikeln über Bücher bis hin zu individuellen Stimmen." },
                  { term: "Inpainting", def: "Teile eines Bildes durch KI ersetzen oder ergänzen — z.B. Hintergrund austauschen oder störende Objekte entfernen, ohne neu zu zeichnen." },
                  { term: "LoRA", def: "Low-Rank Adaptation — eine schlanke Methode, ein großes Modell auf einen bestimmten Stil oder eine Person nachzutrainieren, ohne alles von vorne zu starten." },
                ],
              },
              {
                group: "🔒 Datenschutz & Kontrolle",
                color: "#34d399",
                terms: [
                  { term: "DSGVO", def: "Datenschutz-Grundverordnung — das EU-Regelwerk für den Umgang mit Personendaten. Je näher an EU-Servern, desto sicherer." },
                  { term: "Lokaler Betrieb / Self-hosted", def: "Die KI läuft auf deinem eigenen Computer oder Server. Daten verlassen nie dein Gerät — maximale Datensouveränität." },
                  { term: "Open Source", def: "Der Quellcode ist öffentlich. Jeder kann reinschauen, verändern, verbessern — und die KI oft kostenlos selbst betreiben." },
                  { term: "Open Weights", def: "Die trainierten Modell-Dateien sind frei verfügbar — du kannst sie herunterladen und lokal betreiben, bei einem Anbieter hosten oder in der Cloud nutzen. Datenschutz hängt davon ab, wo du es laufen lässt." },
                  { term: "Closed Source", def: "Der Quellcode ist geheim. Du kannst die KI nutzen, aber nicht reinschauen oder verändern." },
                  { term: "GAIA-X", def: "Europäische Cloud-Initiative: Standards für sichere, souveräne Datenspeicherung in Europa — unabhängig von US- oder China-Anbietern." },
                ],
              },
            ].map(({ group, color, terms }) => (
              <div key={group}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1" style={{ background: color + "40" }} />
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color, background: color + "18", border: `1px solid ${color}35` }}
                  >
                    {group}
                  </span>
                  <div className="h-px flex-1" style={{ background: color + "40" }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
                  {terms.map(({ term, def }) => (
                    <div key={term} className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-white">{term}</span>
                      <span className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{def}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-24" />

      {/* ── FLOATING CHAT ─────────────────────────────────────── */}
      <FloatingChat />

      {/* ── GLOSSARY CTA (fixed bottom-right FAB) ──────────────── */}
      <a
        href="#glossary"
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl cursor-pointer group transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          boxShadow: "0 4px 20px rgba(249,115,22,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <span className="text-base leading-none">📖</span>
        <span className="text-[11px] font-black text-white uppercase tracking-wide leading-none">Glossar</span>
        <span className="text-[10px] text-white/70 leading-none">↓</span>
      </a>
    </div>
  );
}
