import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── API Keys (aus .env — nie ins Git committen!) ────────────────────────────
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? "";

const FALLBACK_ANSWER =
  "Gute Frage! ☁️ Ich bin gerade kurz offline — aber ich leite sie direkt an Franziska weiter. Sie meldet sich bald! 😊";

// ─── Gemini API ──────────────────────────────────────────────────────────────
async function askGemini(question: string): Promise<string> {
  if (!GEMINI_KEY) return FALLBACK_ANSWER;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text: "Du bist der freundliche KI-Kompass im KI Monster Guide — einem deutschen Überblick über KI-Tools. Antworte auf Deutsch, fröhlich, kurz (max. 3 Sätze), einfach verständlich ohne Fachjargon. Verwende gelegentlich ein passendes Emoji. Wenn du etwas nicht weißt, sag das ehrlich.",
              },
            ],
          },
          contents: [{ parts: [{ text: question }] }],
        }),
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? FALLBACK_ANSWER;
  } catch {
    return FALLBACK_ANSWER;
  }
}

// ─── Suggestion detection ────────────────────────────────────────────────────
function isSuggestion(text: string): boolean {
  const t = text.toLowerCase();
  return [
    "fehlt", "vermisse", "würde", "vorschlag", "hinzufügen",
    "wünsche", "könnte man", "wäre schön", "noch nicht", "nicht gelistet",
    "melden", "modell fehlt", "tool fehlt",
  ].some((kw) => t.includes(kw));
}

// ─── Email via Web3Forms ─────────────────────────────────────────────────────
type Message = { role: "user" | "bot"; text: string };

async function sendConversationByEmail(
  msgs: Message[],
  type: "question" | "suggestion" = "question"
) {
  if (!WEB3FORMS_KEY) return;
  const body = msgs
    .map((m) => `${m.role === "user" ? "👤 Besucher" : "🤖 KI-Kompass"}: ${m.text}`)
    .join("\n\n");
  const subject =
    type === "suggestion"
      ? "💡 KI Monster Guide — Vorschlag von Besucher"
      : "🤖 KI Monster Guide — Besucher-Konversation";
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "KI Monster Guide",
        email: "franziska.wittleder@gmail.com",
        message: body,
      }),
    });
  } catch {
    // silent fail
  }
}

// ─── Quick chips ─────────────────────────────────────────────────────────────
const QUICK_CHIPS: { text: string; type: "question" | "suggestion" }[] = [
  { text: "Was ist ein KI-Agent?",       type: "question" },
  { text: "Was bedeutet DSGVO?",         type: "question" },
  { text: "Welches Tool empfiehlst du?", type: "question" },
  { text: "Was ist ein LLM?",            type: "question" },
  { text: "Modell fehlt hier! 🙋",       type: "suggestion" },
];

// ─── Flying emoji animation ──────────────────────────────────────────────────
const SEND_EMOJIS = ["🌈", "✨", "⭐", "🚀", "💫", "🌟", "🎉"];

// ─── Component ───────────────────────────────────────────────────────────────
export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([
    { role: "bot", text: "Hallo! 👋 Hast du Fragen zum Guide — oder vermisst du ein Modell?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [flyEmoji, setFlyEmoji] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  // Send full conversation transcript when chat is closed
  useEffect(() => {
    if (!open && msgs.some((m) => m.role === "user") && !emailSent) {
      sendConversationByEmail(msgs, "question");
      setEmailSent(true);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function triggerSendAnimation() {
    const emoji = SEND_EMOJIS[Math.floor(Math.random() * SEND_EMOJIS.length)];
    setFlyEmoji(emoji);
    setTimeout(() => setFlyEmoji(null), 900);
  }

  async function handleSend(text?: string) {
    const q = (text ?? input).trim();
    if (!q || typing) return;
    setInput("");
    triggerSendAnimation();

    const userMsg: Message = { role: "user", text: q };
    setMsgs((prev) => [...prev, userMsg]);
    setTyping(true);

    let answer: string;
    if (isSuggestion(q)) {
      answer =
        "Danke für deinen Vorschlag! 🙏 Wir nehmen uns das wirklich zu Herzen — das Orga-Team freut sich über jedes Feedback! ✨";
      // Suggestions get emailed immediately, not just on close
      sendConversationByEmail(
        [userMsg, { role: "bot", text: answer }],
        "suggestion"
      );
    } else {
      answer = await askGemini(q);
    }

    setMsgs((prev) => [...prev, { role: "bot", text: answer }]);
    setTyping(false);
  }

  const hasUserMsgs = msgs.some((m) => m.role === "user");

  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.92 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed z-[120] flex flex-col overflow-hidden"
            style={{
              bottom: 80,
              left: 16,
              width: 320,
              height: 440,
              borderRadius: 24,
              boxShadow: "0 16px 60px rgba(30,58,95,0.35), 0 4px 16px rgba(0,0,0,0.12)",
              border: "2px solid rgba(255,255,255,0.45)",
              background: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 45%, #7c3aed 100%)",
            }}
          >
            {/* Rainbow background (low opacity) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,0,128,0.07) 0%, rgba(255,165,0,0.07) 20%, rgba(255,255,0,0.06) 40%, rgba(0,255,128,0.07) 60%, rgba(0,200,255,0.07) 80%, rgba(180,0,255,0.07) 100%)",
                borderRadius: 22,
              }}
            />

            {/* Cloud bumps at top */}
            <div className="absolute -top-3 left-0 right-0 flex justify-around pointer-events-none z-10">
              {[32, 44, 38, 28, 36].map((size, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: size,
                    height: size,
                    background: "linear-gradient(160deg, #1e3a8a, #1d4ed8)",
                    border: "2px solid rgba(255,255,255,0.4)",
                    marginTop: i % 2 === 0 ? 4 : 0,
                  }}
                />
              ))}
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-5 pb-3 shrink-0">
              <div>
                <p className="text-white font-bold text-sm leading-tight">☁️ Fragen & Feedback</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white/80 text-lg leading-none transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              className="relative z-10 flex-1 overflow-y-auto px-3 py-2 space-y-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
            >
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="text-xs leading-relaxed"
                    style={{
                      maxWidth: "88%",
                      padding: "8px 12px",
                      borderRadius: 14,
                      background:
                        m.role === "user"
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.15)",
                      color: m.role === "user" ? "#1e293b" : "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(8px)",
                      border: m.role === "bot" ? "1px solid rgba(255,255,255,0.2)" : "none",
                      borderBottomRightRadius: m.role === "user" ? 4 : 14,
                      borderBottomLeftRadius: m.role === "bot" ? 4 : 14,
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="flex items-center gap-1 px-3 py-2"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "14px 14px 14px 4px",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="rounded-full bg-white/70"
                        style={{
                          width: 6,
                          height: 6,
                          animation: `bounce 1s ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick chips */}
            {!hasUserMsgs && (
              <div className="relative z-10 px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.text}
                    onClick={() => handleSend(chip.text)}
                    className="text-[10px] px-2.5 py-1 rounded-full transition-all hover:brightness-125"
                    style={
                      chip.type === "suggestion"
                        ? {
                            background: "rgba(251,191,36,0.18)",
                            color: "rgba(251,191,36,0.95)",
                            border: "1px solid rgba(251,191,36,0.4)",
                          }
                        : {
                            background: "rgba(255,255,255,0.13)",
                            color: "rgba(255,255,255,0.82)",
                            border: "1px solid rgba(255,255,255,0.22)",
                          }
                    }
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div
              className="relative z-10 flex items-center gap-2 px-3 py-2.5 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Frage stellen oder Vorschlag machen…"
                className="flex-1 text-xs outline-none placeholder:text-white/40"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  borderRadius: 20,
                  padding: "7px 14px",
                  color: "white",
                  backdropFilter: "blur(8px)",
                }}
              />
              {/* Send button + fly emoji */}
              <div className="relative shrink-0">
                <AnimatePresence>
                  {flyEmoji && (
                    <motion.span
                      key="fly"
                      initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                      animate={{
                        y: -60,
                        x: Math.random() > 0.5 ? 20 : -20,
                        opacity: 0,
                        scale: 1.8,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute pointer-events-none text-lg"
                      style={{ bottom: 0, left: 0, zIndex: 20 }}
                    >
                      {flyEmoji}
                    </motion.span>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => handleSend()}
                  disabled={typing}
                  className="flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-90 disabled:opacity-50"
                  style={{
                    width: 34,
                    height: 34,
                    background: input.trim() && !typing
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.2)",
                    color: input.trim() && !typing ? "#1d4ed8" : "rgba(255,255,255,0.5)",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button — real CSS cloud shape ────────────────── */}
      <div className="fixed z-[120]" style={{ bottom: 16, left: 16 }}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative transition-all duration-200 hover:brightness-105 active:scale-95 focus:outline-none"
          style={{
            width: 168,
            height: 80,
            display: "block",
            filter:
              "drop-shadow(0 6px 16px rgba(56,189,248,0.45)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
          }}
          aria-label={open ? "Chat schließen" : "Fragen & Feedback"}
        >
          <svg viewBox="0 0 168 80" width="168" height="80" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={open ? "#bae6fd" : "#e0f2fe"}
              stroke={open ? "#7dd3fc" : "#bae6fd"}
              strokeWidth="1.5"
              d="
                M 28 72
                H 142
                Q 162 72 162 53
                Q 162 37 146 35
                Q 147 16 130 13
                Q 116 4  102 16
                Q  92 6   76 12
                Q  62 3   48 15
                Q  28 12  22 28
                Q   6 30   6 47
                Q   6 66  22 70
                Z
              "
            />
          </svg>
          <div
            className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none"
            style={{ paddingBottom: 18 }}
          >
            {open ? (
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0369a1", letterSpacing: "0.04em" }}>
                ✕ Schließen
              </span>
            ) : (
              <>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#0284c7",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    lineHeight: 1.2,
                  }}
                >
                  Fragen?
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#38bdf8",
                    letterSpacing: "0.04em",
                    lineHeight: 1.2,
                  }}
                >
                  & Feedback
                </span>
              </>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
