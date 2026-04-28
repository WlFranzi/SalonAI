import { useState } from "react";
import { CATEGORIES } from "../data/monsters";
import CategorySection from "../components/CategorySection";

// ─── Types ──────────────────────────────────────────────────────────────────
type MissionId = "all" | "bilder" | "text" | "coding" | "research";
type HostingId = "all" | "cloud-eu" | "lokal";

// ─── Filter options ──────────────────────────────────────────────────────────
const MISSIONS: { id: MissionId; label: string; icon: string; sub: string }[] = [
  { id: "all",      label: "Alle Tools",              icon: "✨", sub: "" },
  { id: "bilder",   label: "Bilder & Design",         icon: "🎨", sub: "Logo · Branding · Fotos · UI" },
  { id: "text",     label: "Text & Schreiben",        icon: "✍️", sub: "Blog · E-Mail · Social · Copy" },
  { id: "coding",   label: "Code & Automatisierung",  icon: "💻", sub: "Coding · Agents · APIs · CLI" },
  { id: "research", label: "Recherche & Analyse",     icon: "🔍", sub: "PDFs · Daten · Suche · RAG" },
];

const HOSTING: { id: HostingId; label: string; icon: string; desc: string }[] = [
  { id: "all",       label: "Egal",          icon: "🌍", desc: "Alle Tools anzeigen" },
  { id: "cloud-eu",  label: "EU / DSGVO",    icon: "🛡️", desc: "Server in Europa, DSGVO-konform" },
  { id: "lokal",     label: "Nur lokal",     icon: "💻", desc: "Läuft auf deinem Gerät, keine Cloud" },
];

// ─── Filter logic ────────────────────────────────────────────────────────────
function applyFilters(mission: MissionId, hosting: HostingId): typeof CATEGORIES {
  let result = [...CATEGORIES];

  if (mission === "bilder") {
    result = result.filter((c) => c.id === "image");
  } else if (mission === "text") {
    result = result.filter((c) => c.id === "text");
  } else if (mission === "coding") {
    result = result
      .map((c) => ({
        ...c,
        cards: c.cards.filter((card) =>
          card.tags.some((t) => ["coding", "IDE", "vibe-coding", "agent", "CLI"].includes(t))
        ),
      }))
      .filter((c) => c.cards.length > 0);
  } else if (mission === "research") {
    result = result
      .map((c) => ({
        ...c,
        cards: c.cards.filter((card) =>
          card.tags.some((t) =>
            ["research", "RAG", "documents", "search", "PDF", "summarization", "long-context"].includes(t)
          )
        ),
      }))
      .filter((c) => c.cards.length > 0);
  }

  if (hosting === "cloud-eu") {
    result = result
      .map((c) => ({ ...c, cards: c.cards.filter((card) => card.sugarRating <= 2) }))
      .filter((c) => c.cards.length > 0);
  } else if (hosting === "lokal") {
    result = result
      .map((c) => ({
        ...c,
        cards: c.cards.filter((card) => card.sourceType === "open" || card.localOnlyWarning === true),
      }))
      .filter((c) => c.cards.length > 0);
  }

  return result;
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Index() {
  const [mission, setMission] = useState<MissionId>("all");
  const [hosting, setHosting] = useState<HostingId>("all");
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const visibleCategories = applyFilters(mission, hosting);
  const isFiltered = mission !== "all" || hosting !== "all";

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #D6E9F5, #C0D8EE, #B8D0E8)",
        fontFamily: "DM Sans, Space Grotesk, sans-serif",
      }}
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <header className="pt-7 pb-6 px-4 text-center">
        <div className="max-w-2xl mx-auto">
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
            style={{ fontFamily: "Playfair Display, serif", color: "#1B2E4A", letterSpacing: "-0.01em" }}
          >
            KI Guide 2026
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#3D526A" }}>
            Was willst du tun — und wo sollen deine Daten bleiben?
          </p>
        </div>
      </header>

      {/* ── STICKY FILTER BAR ────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 border-b shadow-sm"
        style={{
          background: "rgba(200,221,240,0.92)",
          borderColor: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 space-y-2">

          {/* Row 1 — use case */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
            {MISSIONS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMission(m.id)}
                className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  mission === m.id
                    ? "bg-[#1B2E4A] text-white shadow-md"
                    : "bg-white/70 text-[#1B2E4A] hover:bg-white border border-[#C5D5E4]"
                }`}
              >
                <span>{m.icon} {m.label}</span>
                {m.sub && (
                  <span className={`text-[10px] font-normal leading-none ${mission === m.id ? "text-white/60" : "text-slate-400"}`}>
                    {m.sub}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Row 2 — where do your data live? */}
          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-semibold shrink-0"
              style={{ color: "#5A7A96" }}
            >
              ☁️ Wo bleiben deine Daten?
            </span>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
              {HOSTING.map((h) => {
                const isActive = hosting === h.id;
                const activeColor =
                  h.id === "cloud-eu" ? "#065f46" : h.id === "lokal" ? "#374151" : "#003399";
                return (
                  <button
                    key={h.id}
                    onClick={() => setHosting(h.id)}
                    title={h.desc}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 active:scale-95"
                    style={{
                      background: isActive ? activeColor : "rgba(255,255,255,0.55)",
                      color: isActive ? "#fff" : "#4A6280",
                      border: isActive ? "2px solid transparent" : "1.5px solid rgba(27,46,74,0.10)",
                    }}
                  >
                    <span>{h.icon}</span>
                    <span>{h.label}</span>
                  </button>
                );
              })}
            </div>
            {isFiltered && (
              <button
                onClick={() => { setMission("all"); setHosting("all"); }}
                className="ml-auto text-[11px] hover:opacity-70 transition-opacity shrink-0"
                style={{ color: "#7A9DB8" }}
              >
                ✕ zurücksetzen
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── CARDS ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8 space-y-4">
        {visibleCategories.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#5A7A96" }}>
            <p className="text-lg mb-3">Keine passenden Tools gefunden.</p>
            <button
              onClick={() => { setMission("all"); setHosting("all"); }}
              className="text-sm underline hover:opacity-70 transition-opacity"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          visibleCategories.map((cat, i) => (
            <CategorySection key={cat.id} category={cat} index={i} />
          ))
        )}
      </main>

      {/* ── PRIVACY EXPLAINER ────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 mt-8 mb-8">
        <div
          className="rounded-2xl border border-white/20 overflow-hidden"
          style={{ background: "rgba(15,23,42,0.78)", backdropFilter: "blur(12px)" }}
        >
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-sm font-bold text-white text-center">
              🖥️ Wo läuft das KI-Modell — und was bedeutet das für deine Daten?
            </h2>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: "💻",
                title: "Lokal",
                sub: "Eigener Computer",
                pros: ["Daten verlassen nie dein Gerät", "Kein Abo, keine API-Kosten"],
                cons: ["Braucht starke GPU & viel RAM", "Kleinere Modelle = weniger Präzision"],
                examples: ["Llama 3", "DeepSeek", "Ollama"],
                borderColor: "rgba(100,116,139,0.45)",
                bg: "rgba(100,116,139,0.12)",
              },
              {
                icon: "🇺🇸",
                title: "US Cloud",
                sub: "Server in den USA",
                pros: ["Stärkste Modelle (GPT-4o, Claude, Gemini)", "Sofort nutzbar, kein Setup"],
                cons: ["Daten unterliegen US-Recht / Patriot Act", "DSGVO-Konformität schwierig"],
                examples: ["ChatGPT", "Claude.ai", "Gemini"],
                borderColor: "rgba(59,130,246,0.40)",
                bg: "rgba(59,130,246,0.10)",
              },
              {
                icon: "🇪🇺",
                title: "EU Cloud",
                sub: "Server in Europa",
                pros: ["DSGVO-konform", "Kein US-Recht / Patriot Act"],
                cons: ["Modelle teils etwas schwächer", "Weniger Auswahl"],
                examples: ["Mistral EU", "STACKIT", "Hetzner AI"],
                borderColor: "rgba(16,185,129,0.40)",
                bg: "rgba(16,185,129,0.08)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-4 flex flex-col gap-2.5 border"
                style={{ background: item.bg, borderColor: item.borderColor }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-[11px] text-white/45">{item.sub}</div>
                  </div>
                </div>
                <ul className="space-y-1">
                  {item.pros.map((p) => (
                    <li key={p} className="text-[11px] text-white/80 flex gap-1.5">
                      <span className="text-emerald-400 shrink-0 mt-px">✓</span>
                      {p}
                    </li>
                  ))}
                  {item.cons.map((c) => (
                    <li key={c} className="text-[11px] text-white/60 flex gap-1.5">
                      <span className="text-amber-400 shrink-0 mt-px">⚠</span>
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 mt-auto pt-1">
                  {item.examples.map((e) => (
                    <span
                      key={e}
                      className="text-[10px] px-1.5 py-0.5 rounded-full border"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.12)" }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-4">
            <p
              className="text-[11px] text-center leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Das Modell selbst ist oft dasselbe — der Unterschied ist <em>wo</em> es läuft und wer Zugriff auf deine Eingaben hat.
            </p>
          </div>
        </div>
      </section>

      {/* ── GLOSSARY (collapsible) ────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 mb-16">
        <button
          onClick={() => setGlossaryOpen(!glossaryOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border border-white/15 transition-all hover:border-white/25"
          style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(8px)" }}
        >
          <span className="font-semibold text-white/75 text-sm">📖 KI-Begriffe einfach erklärt</span>
          <span className="text-white/40 text-lg leading-none">{glossaryOpen ? "−" : "+"}</span>
        </button>

        {glossaryOpen && (
          <div
            className="rounded-2xl border border-white/15 mt-2 overflow-hidden"
            style={{ background: "rgba(15,23,42,0.82)" }}
          >
            <div className="px-6 py-6 space-y-8">
              {[
                {
                  group: "🧠 Wie KI denkt & lernt",
                  color: "#60a5fa",
                  terms: [
                    { term: "Foundation Model", def: "Ein großes, breit trainiertes Basismodell. Alles andere baut darauf auf — der Motor unter der Motorhaube." },
                    { term: "LLM", def: "Large Language Model — Großes Sprachmodell, das mit riesigen Textmengen trainiert wurde und Sprache versteht sowie erzeugt." },
                    { term: "Halluzination", def: "Wenn eine KI mit vollem Vertrauen falsche Fakten erfindet. Strukturelle Schwäche: Die KI weiß nicht, was sie nicht weiß." },
                    { term: "Context Window", def: "Wie viel Text eine KI gleichzeitig im Kopf behalten kann. Kurzes Fenster = sie vergisst frühere Sätze." },
                    { term: "Token", def: "Die kleinste Einheit, mit der KI Text verarbeitet — ungefähr ¾ eines Worts. Kosten und Geschwindigkeit werden in Tokens gemessen." },
                    { term: "Prompt", def: "Die Eingabe oder Anweisung an eine KI. Qualität des Prompts = Qualität der Antwort." },
                    { term: "RAG", def: "Retrieval-Augmented Generation — die KI durchsucht zuerst deine Dokumente, dann antwortet sie. Wie ein Assistent, der erst nachschlägt." },
                    { term: "Fine-tuning", def: "Ein fertig trainiertes Modell wird auf spezifischen Daten nachgeschult — wie ein Allgemeinarzt, der sich zum Spezialisten fortbildet." },
                    { term: "Multimodal", def: "Eine KI, die Text, Bild, Audio und Video in einem Modell versteht und erzeugt." },
                  ],
                },
                {
                  group: "🤖 Agenten & Automatisierung",
                  color: "#fbbf24",
                  terms: [
                    { term: "Agent / KI-Agent", def: "Eine KI, die nicht nur antwortet, sondern selbstständig handelt: Dateien öffnen, E-Mails senden, im Browser klicken — ohne dein Eingreifen." },
                    { term: "Copilot", def: "Eine KI, die neben dir mitarbeitet und Vorschläge macht — kein Autopilot, aber ein sehr cleverer Co-Pilot." },
                    { term: "Vibe-Coding", def: "Programmieren durch freie Beschreibung: Du erklärst auf Deutsch, was du willst — die KI schreibt den Code." },
                    { term: "Browser-Automation", def: "Eine KI übernimmt den Browser: klicken, Formulare ausfüllen, navigieren — wie ein unsichtbarer Mitarbeiter am Computer." },
                  ],
                },
                {
                  group: "🔒 Datenschutz & Kontrolle",
                  color: "#34d399",
                  terms: [
                    { term: "DSGVO", def: "Datenschutz-Grundverordnung — das EU-Regelwerk für den Umgang mit Personendaten. Je näher an EU-Servern, desto sicherer." },
                    { term: "Open Source", def: "Der Quellcode ist öffentlich. Jeder kann reinschauen, verändern, verbessern — und die KI oft kostenlos selbst betreiben." },
                    { term: "Open Weights", def: "Die trainierten Modell-Dateien sind frei verfügbar — du kannst sie herunterladen und lokal betreiben." },
                    { term: "Lokaler Betrieb", def: "Die KI läuft auf deinem eigenen Computer. Daten verlassen nie dein Gerät — maximale Datensouveränität." },
                    { term: "GAIA-X", def: "Europäische Cloud-Initiative: Standards für sichere, souveräne Datenspeicherung in Europa." },
                  ],
                },
                {
                  group: "🛠️ Tech-Begriffe",
                  color: "#a78bfa",
                  terms: [
                    { term: "API", def: "Application Programming Interface — eine Schnittstelle, über die Programme miteinander kommunizieren." },
                    { term: "GPU", def: "Grafikkarte. Ursprünglich für Videospiele, heute die wichtigste Hardware zum Trainieren und Betreiben von KI-Modellen." },
                    { term: "Low-code / No-code", def: "Software bauen, ohne (viel) zu programmieren — Bausteine zusammenklicken statt Code schreiben." },
                    { term: "TTS (Text-to-Speech)", def: "Text wird in gesprochene Sprache umgewandelt. Die KI liest vor." },
                    { term: "Inpainting", def: "Teile eines Bildes durch KI ersetzen oder ergänzen — z.B. Hintergrund austauschen." },
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {terms.map(({ term, def }) => (
                      <div key={term} className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-white">{term}</span>
                        <span className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>{def}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="pb-10" />
    </div>
  );
}
