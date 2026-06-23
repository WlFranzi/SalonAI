# Salon AI Workshop №1 — "Mathe mit Worten"

> **Pflicht-Lese-Reihenfolge für jede neue Session:**
> 1. **Diese Datei** (Konzept · Patterns · was schon gebaut · was noch fehlt)
> 2. **`index.html`** (Source of Truth für CSS-Klassen, HTML-Struktur, JS-Hooks — niemals Klassen erfinden, immer wiederverwenden)
> 3. **`cheatsheet.html`** (Begleit-Spickzettel, gleiche Sprache & Patterns)
> 4. **`.claude/skills/SalonAI_Critics/SKILL.md`** (Experten-Panel, falls Feedback gewünscht)

---

## Was das ist

Ein Live-Workshop am **28. Mai 2026 in München** (Format: Salon AI Immersive). Zielgruppe: **Senior-Corporate-Profile** — Anwälte, Ärzte, Professoren, Head of PR, M&A-Partner. Nicht-technisch, aber strategisch denkend. Versprechen im Hero:

> *"Ein Abend, an dem KI aufhört, Magie zu sein."*

Wird deployt auf **salon-ai.eu/mai-workshop** über GitHub Pages.

---

## Dateistruktur

```
Mai-stepbystepguide/
├── CLAUDE.md                    # diese Datei — Kontext für neue Sessions
├── index.html                   # Workshop-Website (haupt-Artefakt) — Source of Truth
├── cheatsheet.html              # Begleit-Spickzettel mit 9 Mathe-Themen
├── bias.png                     # Bias-Visualisierung (für I.9)
├── embedding.png                # Embedding-Erklärung (Cheat Sheet)
├── word_vectors.png             # word2vec-Analogien (king→queen)
├── GPT-humans-cultural-distance-from-US-2048x1928.png  # Ada-Lovelace-Karte
├── jorinde-voigt-…jpg           # Moodboard-Anker
├── ATO Lab - Moodboard copy.pdf # visuelle Inspiration
├── workshopMaven_Tipps copy.pdf # Maven-Pädagogik-Inspiration
├── assets/                      # weitere Assets
└── .claude/
    └── skills/
        └── SalonAI_Critics/
            └── SKILL.md         # 19-Experten-Panel für Feedback
```

---

# 1 — Was schon gebaut ist (Stand-Snapshot)

## ✅ Hero (existing)
- Titel "Mathe mit Worten"
- Eyebrow: "Salon AI · 28 May"
- Trailer mit **2 Senior-Beispielen** (Legal · PR & Comms)
- Iteration-Framing ("dutzende Prompts, keiner perfekt")
- Mini-TOC rechts (Akt-Marker I–VI + ★ + ↑)

## ✅ Akt I — Magie + Verstehen (35 Min)
Reihenfolge:
- **I.1** Anleitung · 2 Min — 4 leere Vorher/Nachher-Paare als Pencil-Sketch
- **I.2** Übung 1 · 5 Min — Copy-Paste-Prompt mit 5 Benchmark-Beispielen (Deal Sourcing, Legal, Academia, PR, Medicine) + Strategic Context-Block + 4 nummerierte Anleitungs-Steps
- **Iter-Note** "Jetzt mach sie besser"
- **Disclaimer-Box** über mentale Modelle vs. Attention
- **I.3** die Karte verstehen · 3 Min — TwoColScrollmation mit Master-Canvas, 3 Stages (Wörter→Punkte / Vorher-Nachher / deine Prediction)
- **Deeper-Note** (Karpathy: Attention statt Vektor)
- **Failure-Box** (zu wenige/uneinheitliche Beispiele)
- **I.4** Faktoid 13 Billionen
- **I.5** Faktoid 12.288 Dim (GPT-3-spezifisch)
- **I.5b** Übergang · 2 Min — "Heißt: KI ist wirklich nur komplexe Mathe" + Wort-9-Beispiel + Caveat
- **I.6** ScrollpointsSection — Wort-Wolke mit %, 3 Stages (Mail → an → meinen Chef)
- **Exkurs (collapsible)** — Reasoning-Modelle Experten-Analogie
- **Deeper-Note** (Karpathy: Sub-Word-Tokens)
- **I.7** Core Concept · 1 Min — Reveal "Das ist Mathe mit Worten"
- **I.8** Tisch-Aufgabe · 5 Min — 4 Karten (incl. PowerPoint-Bonus)
- **I.9** Schlagseite · 3 Min — Tech-Gründer-Bias-Demo + 3 Hover-Karten + Ada-Lovelace
- **Deeper-Note** (RLHF + Daten)
- **Failure-Box** (Defaults aktiv abfragen)
- **Recap 1** mini — "was du jetzt kannst"
- **Atemholen** → Akt II

## ✅ Akt II — Vom Browser auf den Rechner (40 Min)
- **Chapter Card II** mit "Nach diesem Akt kannst du —"
- **II.1** Brücke · 3 Min — "Wofür brauchst du überhaupt einen Agent?" Prompt
- **II.2** Installation · 10 Min — **Claude Cowork** (GUI, kein Terminal!), 4 Doppelklicks
- **II.3** Erste Übung im Agent · 5 Min — Chat-vs-Agent-Self-Explain-Prompt (README.md + visual.html)
- **Failure-Box** (Agent fragt nach Erlaubnis)
- **Deeper-Note** (KI in Cloud, Agent = Brücke)
- **II.4** Was ein Agent ist · 3 Min — Master-Card-SVG (Ordner + 3 Sheets) + 3 Use-Case-Karten
- **II.5** Hands-on · 10 Min — Reminders-Tracker bauen, 3 To-dos diktieren
- **Failure-Box** (Ordner-Wechsel = neue claude.md)
- **Deeper-Note** (Memory ist Text-Datei)
- **Recap 2** mini
- **Atemholen** → Akt III

## ✅ Cheat Sheet (`cheatsheet.html`, separat)
Die 9 Mathe-mit-Worten-Themen als Take-away:
1. **Iterative Verfeinerung** (Haltung — kommt vor allen Werkzeugen)
2. **Verortung im Konzept-Raum** (Persona, Mittelpunkt, Inversion, Subtraktion)
3. **Richtungs-Extraktion** (Few-Shot)
4. **Distanz-Messung** (Heuchelei-Test)
5. **Cluster-Reduktion** (Landkarte)
6. **Schrittweite** (CoT, Decomposition, Step-Back)
7. **Routenwahl-Strenge** (Sampling)
8. **Pfad-Multiplexing** (Self-Consistency, Reflection, Kritiker)
9. **No-Go-Regionen** (Negative Prompting)

Im Workshop **noch nicht verlinkt** — kommt als Take-away nach Recap 3.

---

# 2 — Was noch fehlt (in Reihenfolge bauen)

## ⏳ Akt III — Kontext: das Steuerrad (~25 Min)

Inhaltliches Versprechen (Chapter Card): *"deinem Agent beibringen, wer du bist — und ihn mit dem richtigen Material füttern"*

Mapped zu Cheat-Sheet-Themen: **Thema 2** (Verortung) · **Thema 3** (Richtungs-Extraktion) · **Thema 5** (Cluster-Reduktion).

### III.1 — Lenkrad · 2 Min
- Headline: *"Kontext ist <em>das Steuerrad</em>."*
- Lead: *"Drei Zustände: zu wenig → generisch. Zu viel → chaotisch. Genau richtig → magisch."*
- Visual: Pencil-Sketch eines Lenkrads, 3 Positionen markiert

### III.2 — Vier Formen Kontext · 3 Min
- Headline: *"Vier Sorten Material, die du dem Agent gibst"*
- Grid mit 4 Karten:
  - **① Beispiele** — *"3-5 Vorher/Nachher-Paare"* (Few-Shot)
  - **② Dokumente** — *"PDF, Text, Datei in seinem Ordner"*
  - **③ Bilder** — *"Screenshot, Foto, Skizze"*
  - **④ URLs** — *"Webseiten zum Lesen"*
- Component: `.grid-section` mit `.grid-card` × 4

### III.3 — Master-Canvas revisit · 4 Min
- Headline: *"Mehr Punkte → schärferes Muster"*
- TwoColScrollmation mit demselben Master-Canvas wie I.3 — diesmal mit 2 Stages:
  - Stage 1: **Schablone (klein)** — wenige Punkte, klare Richtung
  - Stage 2: **Landkarte (groß)** — viele Punkte, Cluster-Region mit Label
- Caption: *"Beides ist auch Mathe mit Worten. Nur jetzt mit deinem Kontext."*

### III.4 — Live: Bild als Kontext · 5 Min  [I-do/We-do/You-do]
- Headline: *"Kalender-Screenshot als Kontext"*
- Prompt-Card:
  ```
  Anbei ein Screenshot meines Kalenders der letzten Woche.
  
  Sag mir:
  1. Wo geht meine Zeit hin — kategorisiert (Strategy / Operations / Admin / Pausen)?
  2. Welcher Termin war Energieräuber, welcher Energiegeber — woran erkennst du das?
  3. Wenn du EINEN Termin streichen könntest, ohne dass die Welt zusammenbricht — welcher wäre das?
  ```
- After: kurze Reflektions-Karte *"Was hast du gerade gemacht? Du hast deinem Agent 40 Stunden deiner Realität auf einmal gegeben."*

### III.5 — Live: Beispiele als Kontext · 5 Min  [I-do/We-do/You-do]
- Headline: *"Hier sind 5 gute, 3 schlechte — schreib die nächste"*
- Erinnert an I.2 (Few-Shot), aber jetzt mit eigenem Material aus dem Arbeitsalltag
- Prompt-Card:
  ```
  Hier sind 5 [Mails / Briefs / Memos / Pitches], die ich gut fand:
  [einfügen]
  
  Hier sind 3, die ich nicht gut fand:
  [einfügen]
  
  Lerne meinen Standard. Schreib mir dann die nächste.
  Validiere zuerst mit mir, was du als Muster erkannt hast — bevor du loslegst.
  ```
- **Reflection nach III.5** (Wes-Pause):
  *"Schau auf den Output. Sag deinem Tisch-Nachbarn in einem Satz: was war anders als bei deinem ersten Versuch in Akt I.2?"* — 2 Min am Tisch.

### III.6 — Live: Ordner als Kontext · 4 Min
- Headline: *"Das hier kann nur ein Agent — Ordner-Zugriff"*
- Lead: *"Im Browser-Chat müsstest du jede Datei einzeln hochladen. Im Agent reicht: 'schau in /competitors/.'"*
- Prompt-Card (für Cowork):
  ```
  Im Ordner /competitors/ liegen Notizen zu unseren wichtigsten Wettbewerbern.
  
  Lies alle. Sag mir:
  1. Welche Verschiebung war diesen Monat am wichtigsten?
  2. Welcher Wettbewerber hat seine Positionierung gewechselt — woran erkennst du das?
  3. Eine Sache, die wir bisher übersehen?
  ```
- Wenn der Teilnehmer kein /competitors/ hat: alternativ ein Ordner mit eigenen Briefings / Reports
- Deeper-Note: *"Ein Agent ist nur so schlau wie sein Ordner-Inhalt. Sauber halten ist die unsexy Wahrheit."*

### Recap 3a (mini) — *"was du jetzt kannst"*
- Kalender / Bilder als Kontext nutzen
- Few-Shot mit eigenem Material
- Ordner-Inhalte abfragen lassen

### Atemholen → Akt IV
*"Du nutzt KI jetzt für ziemlich viel. <em>Vertraust du ihr blind?</em>"*

---

## ⏳ Akt IV — Qualitätsmanagement (~10 Min)

Inhaltliches Versprechen: *"deine KI-Outputs immer einmal selbst stresstesten — bevor du sie verschickst."*

Mapped zu Cheat-Sheet-Themen: **Thema 8** (Pfad-Multiplexing).

### IV.1 — Vier Fragen · 4 Min
- Headline: *"Vier Fragen, die das aufdecken"*
- Lead: *"Vier Meta-Fragen, die du an jeden KI-Output dranhängen kannst. Werden zur Routine."*
- Grid mit 4 Karten:
  - **① Was hast du übersehen?**
  - **② Was wäre das stärkste Gegenargument?**
  - **③ Welche Annahme machst du, die fragwürdig ist?**
  - **④ Wo bist du dir am unsichersten?**
- Prompt-Card (zum Dranhängen):
  ```
  Bevor du fertig bist — beantworte für dich selbst:
  1. Was hast du übersehen?
  2. Was wäre das stärkste Gegenargument zu deinem Vorschlag?
  3. Welche Annahme machst du gerade, die fragwürdig ist?
  4. Wo bist du dir am unsichersten?
  
  Dann überarbeite deinen Output entsprechend.
  ```

### IV.2 — Vier Kritiker · 6 Min  [I-do/We-do]
- Headline: *"Lass die KI sich <em>selbst</em> kritisieren"*
- Visual: Kritiker-Gremium-Kreis (4 Personen + 1 Synthese-Punkt in der Mitte, alles als Pencil-Sketch)
- Prompt-Card:
  ```
  Sei nacheinander vier verschiedene Kritiker für meinen Vorschlag:
  ① ein nüchterner CFO — kostet das wirklich was?
  ② eine Compliance-Anwältin — was kann hier rechtlich schiefgehen?
  ③ ein erfahrener Branchenveteran — ist das wirklich neu?
  ④ eine skeptische Kundin — warum sollte ich das kaufen?
  
  Fasse danach die 3 größten Schwachstellen zusammen, gewichtet nach Schweregrad.
  ```
- Beispiel-Output (im Stil von cheat sheet):
  ```
  CFO: "Rampe zu optimistisch. Bei 30% Conversion brichst du in Monat 7."
  Anwältin: "DSGVO-Lücke: EU-Cookie-Daten fließen ungeklärt nach US."
  Veteran: "Die Idee gab's 2018 unter dem Namen X. Warum klappte sie nicht?"
  Kundin: "Drei Klicks bis zum Kernnutzen. Ich klick zwei und springe ab."
  ```

### Atemholen → Akt V
*"Vier Kritiker rufst du jetzt manuell. <em>Das wird mühselig.</em> Machen wir's automatisch."*

---

## ⏳ Akt V — Workflow vs. Skill (~15 Min)

Inhaltliches Versprechen: *"einen wiederverwendbaren Skill bauen, der dich beim nächsten Mal automatisch findet — und ihn iterativ besser machen."*

Mapped zu Cheat-Sheet-Themen: implizit Thema 1 (Iterative Verfeinerung als Haltung) + die Skill-Mechanik.

### V.1 — Die Eselsbrücke · 3 Min
- Headline: *"Workflow oder Skill — was ist was?"*
- Component: `.model-compare` (zwei Karten side-by-side, wie I.7b)
  - **Workflow** (schwarzer Border): *"Du startest ihn — wie ein Rezept anstoßen."* (z.B. "tag planen")
  - **Skill** (iris Border): *"Werkzeug im Kasten — Claude greift selber, wenn die Situation passt."*
- Eselsbrücke unten: *"Workflow = Rezept. Skill = Werkzeug. Du backst, er hat das Werkzeug."*

### V.2 — Kritiker als Skill installieren · 6 Min  [We-do/You-do]
- Headline: *"Den Kritiker-Trick in einen Skill packen"*
- Lead: *"Du hast eben das Kritiker-Gremium kopiert. Jetzt machen wir's permanent — der Agent ruft sie nächstes Mal selbst."*
- Prompt-Card (in Cowork eintippen):
  ```
  Pack die 4 Kritiker, die wir gerade benutzt haben, in einen Skill.
  
  Ab jetzt:
  Wann immer ich dich um Feedback zu einem Plan, einer Mail, einem Vorschlag bitte —
  rufe dieses 4-Kritiker-Gremium selbständig auf, OHNE dass ich dich daran erinnern muss.
  
  Schreibe den Skill so, dass ich ihn später überarbeiten kann.
  ```
- Failure-Box: *"Skills funktionieren nur in Cowork (Plugin-Mechanik). Im Browser-Chat musst du den Prompt jedesmal selbst tippen."*

### V.3 — Skill iterativ besser machen · 6 Min  [You-do]
- Headline: *"Ein Skill ist nicht fertig, wenn er installiert ist"*
- Lead: *"Nutz ihn. Korrigier ihn. Lass ihn lernen, wie du tickst."*
- Prompt-Card (Iteration zum Kopieren):
  ```
  I took your update and rewrote it. This is closer to what I'd actually send.
  
  What changes would you make to the skill to account for the differences?
  ```
- Botschaft: *"Ein Skill wird besser, je öfter du ihn benutzt und korrigierst. Vom Konsument zum Konstrukteur — durch Schreiben."*
- Reflection-Pause: *"Welchen Skill willst du selbst bauen — bis Ende der Woche? Sag's deinem Tisch-Nachbarn."*

### Recap 4 (mini) — *"was du jetzt kannst"*
- Workflow von Skill unterscheiden
- Eigene Skills bauen + iterativ verbessern
- Den Vier-Kritiker-Trick permanent machen

### Atemholen → Akt VI
*"Bis hier sitzt Claude in deinem Ordner. <em>Wir öffnen jetzt die Tür</em> zu deinem Kalender, Mail, Slack."*

---

## ⏳ Akt VI — Anschluss an die Welt (~5 Min, bewusst kurz / Teaser)

Inhaltliches Versprechen: *"verstehen, was als Nächstes kommt — und welche Tür dein Agent als Nächstes aufstößt."*

### VI.1 — MCP · 3 Min
- Headline: *"<em>MCP</em> — die Steckdose zur Welt"*
- Lead: *"Bisher saß der Agent in deinem Ordner. MCP ist der Standard, der ihn an deinen Kalender, dein Mail-Postfach, dein Slack, deine Notion anschließt."*
- Visual: Pencil-Steckdose mit 4 Geräten dran (Kalender · Mail · Slack · Notion)
- Caption: *"Das musst du heute nicht installieren. Du musst nur wissen: es gibt's, es heißt MCP, und es ist der nächste Schritt."*

### VI.2 — Scheduled · 2 Min (nur erklären, kein Visual)
- Headline: *"Und: er kann auch ohne dich loslaufen"*
- Lead in einem Absatz:
  *"Claude kann zu festen Zeiten arbeiten — z.B. jeden Morgen um 7 deinen Tagesbrief schreiben, jeden Sonntag deine Woche zusammenfassen. Wie genau, zeigen wir nicht heute Abend. Aber du weißt jetzt: es geht."*

---

## ⏳ Commitment-Moment · 2 Min

Vor Recap 3 — Wes-Style Accountability:
- Dunkler Hintergrund (wie atemholen), aber breiter
- Headline: *"Was machst du <em>Montagmorgen</em>?"*
- Eingabefeld (Textarea), in das der Teilnehmer einen Satz tippt: *"Diese Woche baue ich ___"*
- Subtext: *"Sag's deinem Tisch-Nachbarn. Verbindlichkeit verdoppelt die Wahrscheinlichkeit."*
- Component: `.commitment` (existiert schon im CSS, mit `.commitment__inner`, `.commitment__field` etc.)

---

## ⏳ Recap 3 · 1 Min — cinematic Vollbild

- Cinematic Wort-Wolke mit allen Begriffen des Abends:
  *Vorher/Nachher · Embedding · Distanz · Muster · Agent · Anleitung · Notizblock · Kontext · Schablone · Landkarte · Vier Fragen · Vier Kritiker · Workflow · Skill · MCP*
- Bildunterschrift: ***"Du hast heute gelernt, mit Worten zu rechnen."***
- Link zum Cheat Sheet als Take-away unten — *"Spickzettel für danach: cheatsheet.html"*

---

## ⏳ Outro · 30 Sek

- Headline: *"Diese Seite bleibt online."*
- Lead: *"Komm wieder. Probier die Prompts mit deinen echten Sachen. Schreib mir, was funktioniert hat."*

---

# 3 — CSS-Komponenten-Referenz (exakte Klassen)

> **Wichtig:** alle diese Klassen sind in `index.html` definiert. **NIEMALS** neue Klassen erfinden, wenn eine bestehende passt. Immer zuerst in der `<style>`-Section von index.html nachsehen.

## Layout / Strukturelle Sections

| Komponente | Hauptklasse | Modifier | Sub-Elemente | Zweck |
|---|---|---|---|---|
| Section-Wrapper | `.text-section` | `.text-section--wide` | — | Standard-Textblock mit Padding |
| Zwei-Spalten-Scroll | `.two-col-scroll` | — | `.two-col-scroll__media` (sticky), `.two-col-scroll__content`, `.two-col-scroll__step` (`data-step="1"`/`2`/`3`) | Sticky-Medium links, scrollender Text rechts. Stage-Progression über `data-stage` |
| Scrollpoints | `.scrollpoints` | — | `.scrollpoints__stage` (sticky Grid), `.scrollpoints__media` (SVG), `.scrollpoints__caption-slot`, `.scrollpoints__caption` (`data-caption="1"/2/3`), `.scrollpoints__triggers`, `.scrollpoints__trigger` (`data-stage="1"/2/3`) | Fixe Visualisierung mit progressiven Stages + Captions im Slot rechts |
| Reveal | `.reveal` | — | `.reveal__trigger` (data-reveal-trigger), `.reveal__layer` (.reveal__layer--top, --bottom) | Dunkler Layer schiebt sich rein (für Reveals wie I.7) |
| Faktoid | `.faktoid` | — | `.faktoid__inner`, `.faktoid__eyebrow`, `.faktoid__number`, `.faktoid__unit`, `.faktoid__body`, `.faktoid__caveat` | Riesen-Zahlen-Sektion (13 Billionen, 12.288 Dim) |
| Hero | `.hero` | — | `.hero__eyebrow`, `.hero__title`, `.hero__sub`, `.hero__trailer`, `.hero__trailer-label`, `.hero__trailer-list`, `.hero__framing`, `.hero__scroll` | Startsektion |
| Chapter Card | `.chapter` | — | `.chapter__num`, `.chapter__label`, `.chapter__title`, `.chapter__after` | Akt-Einleitung mit "Nach diesem Akt kannst du —" |
| Atemholen | `.atemholen` | — | `.atemholen__inner`, `.atemholen__text` | Dunkler Übergangs-Streifen zwischen Akten |
| Commitment | `.commitment` | — | `.commitment__inner`, `.commitment__eyebrow`, `.commitment__title`, `.commitment__sub`, `.commitment__field`, `.commitment__field-label` (mit `<textarea>`) | Wes-Style Accountability-Moment |
| Grid-Sektion | `.grid-section` | — | `.grid-section__grid`, `.grid-card`, `.grid-card__label`, `.grid-card__title`, `.grid-card__body` | 3-Karten-Grid (z.B. Use Cases) |
| Tisch-Aufgabe | `.tisch` | — | `.tisch__head`, `.tisch__cards`, `.tisch__card`, `.tisch__card-label`, `.tisch__card-body`, `.tisch__timer` | 4-Karten-Tisch-Übung (Bonus-Karte: inline-Style coral) |
| Gallery | `.gallery` | — | `.gallery__grid`, `.gallery__item`, `.gallery__label`, `.gallery__title`, `.gallery__body` (mit `.gallery__item--active`) | Slideshow / Karten-Galerie |

## Inhalts-Komponenten (zum Einstreuen)

| Komponente | Hauptklasse | Sub-Elemente | Inhalt-Formel |
|---|---|---|---|
| **Prompt-Card** | `.prompt-card` | `.prompt-card__label`, `.prompt-card__body` (`<pre>`), `.copy-btn` | Copy-Button wird per JS hinzugefügt |
| **Prompt-Steps** | `.prompt-steps` | `.prompt-step` (counter-incrementing) | 4 nummerierte Anleitungs-Karten oberhalb eines Prompts |
| **Iter-Note** (coral) | `.iter-note` | `.iter-note__label` | *"★ Iterations-Moment"* — Aufforderung, weiter zu machen |
| **Failure-Box** (coral) | `.failure-box` | `.failure-box__label`, `.failure-box__text` | *"Häufiger Fehler"* + Beschreibung |
| **Deeper-Note** (grau) | `.deeper-note` | `.deeper-note__label`, `.deeper-note__text`, `.konsequenz` (span im text) | *"Wenn du tiefer willst"* — Wahrheit max 15 Wörter + *"Konsequenz für dich"* max 12 Wörter |
| **Disclaimer-Box** | `.disclaimer-box` | `.disclaimer-box__inner`, `.disclaimer-box__icon`, `.disclaimer-box__text` | Iris-Akzent, einmalig vor I.3 |
| **Exkurs (collapsible)** | `.exkurs` (`<details>`) | `.exkurs__summary` (`<summary>`), `.exkurs__label`, `.exkurs__title`, `.exkurs__toggle`, `.exkurs__body`, `.exkurs__analogy` | *"AUSKLAPPEN"*-Block für optionale Tiefe |
| **Model-Compare** | `.model-compare` | `.model-compare__card` (+ `--reasoning` modifier), `.model-compare__label`, `.model-compare__desc`, `.model-compare__list`, `.model-compare__use`, `.model-compare__feel` | 2 Karten side-by-side für Vergleiche (Standard vs Reasoning, Workflow vs Skill) |
| **Bias-Cards** | `.bias-cards` | `.bias-card` (`tabindex="0"`), `.bias-card__number`, `.bias-card__label`, `.bias-card__pop` (Popover) | Hover/Tap zeigt Popover mit Quelle und ggf. Bild |
| **Master-Card** | `.master-card` | `.master-card__caption` | Wiederkehrender Pencil-SVG-Canvas mit Stage-Klassen `.stage .stage--1/2/3` |
| **Recap-Mini** | `.recap-mini` | `.recap-mini__label`, `.recap-mini__list`, `.recap-mini__item` | 3-Item-Liste *"was du jetzt kannst"* |

## SVG-Helper-Klassen (für Pencil-Sketches)
- `.pencil-stroke` — `stroke:#2a2520; fill:none; linecap/linejoin: round`
- `.pencil-fill` — `fill:#2a2520`
- `.pencil-coral` — coral version
- `.pencil-iris` — iris version
- `.pencil-leaf` — leaf version
- `.label-serif` — Cormorant italic, 14px
- `.label-hand` — Caveat, 18px
- `.label-sans` — Inter, 11px uppercase mit letter-spacing

## Eyebrow-Klasse
- `.eyebrow` — Inter, 0.74rem, 0.32em letter-spacing, uppercase, ink-soft farbe
- **Schema:** `[Nummer] · [Name] · [Dauer]` (z.B. *"I.2 · Übung 1 · 5 Min"*)

---

# 4 — Visuelle Patterns (nicht verhandelbar)

## Farben (CSS Custom Properties)
```css
--paper:        #ffffff
--paper-tint:   #fafafa
--paper-warm:   #f5f1ea
--ink:          #0e0c0a
--ink-soft:     #6b6259
--rule:         #eae6df
--gold:         #5c4f43
--gold-deep:    #2c2520
--iris:         #6b4e8e
--iris-deep:    #3b285a
--coral:        #e26a4a
--coral-soft:   #fdf0eb
--leaf:         #7a8c5c
--watermark:    #f0ece4
```

## Fonts
```css
--serif: 'Cormorant Garamond', Didot, Georgia, serif;   /* Italic headlines */
--hand:  'Caveat', cursive;                              /* Hand-annotations */
--sans:  'Inter', -apple-system, sans-serif;             /* Labels, body */
```

## Body-Background (Embedding-Atmosphäre)
```css
body {
  background-image: radial-gradient(circle, rgba(107,78,142,.09) 1px, transparent 1.4px);
  background-size: 48px 48px;
  background-attachment: fixed;
}
```

---

# 5 — JS-Hooks (existing in index.html)

Alle in einem `<script>`-Block am Ende von `index.html`:

| Hook | Funktion | Auslöser |
|---|---|---|
| **Copy-Buttons** | Per JS auf jedem `.copy-btn` im `.prompt-card`-Kontext | Click → Clipboard + 1.6s "kopiert ✓" Animation |
| **Mini-TOC Active State** | Highlightet aktiven Akt-Punkt | Scroll-Position vs. section-IDs (hero/akt1/akt2/akt3/akt4/akt5/akt6/recap) |
| **Scrollpoints Engine** | Setzt `data-stage` auf `.scrollpoints` Element | Welcher `.scrollpoints__trigger` ist über halber Viewport-Höhe |
| **Two-Col-Scroll Stage Progression** | Setzt `data-stage` auf `.two-col-scroll` | Welcher `.two-col-scroll__step` ist über halber Viewport-Höhe |
| **Reveal Engine** | Setzt `data-revealed="true"` auf `.reveal` | `.reveal__trigger` über 30% Viewport-Höhe |
| **Bias-Card Tap-Toggle** | Mobile-Fallback für Hover-Popover | Click toggelt `.expanded` class, Click outside schließt |

**Beim Bauen neuer Akte:** Nichts vom JS muss ergänzt werden, solange du existierende Komponenten wiederverwendest. Neue IDs (`akt3`, `akt4`, etc.) müssen aber in der `sections`-Liste im JS ergänzt werden, falls Mini-TOC sie tracken soll — aktuell sind sie schon drin.

---

# 6 — Schreibregeln (NIE brechen)

## Sprache
- **"Du"** durchgehend
- **Erwachsene Sprache** — KEIN Schul-Slang. ❌ "geknallt", "floppten", "kapiert", "Spam-Filter", "wackelig" → ✅ "überzeugt", "verfehlten ihre Wirkung", "erkennt", "ungelesen", "instabil"
- **Italic für Akzente** mit `<em>` (wird coral via CSS)

## Strukturelle Formeln

| Komponente | Formel |
|---|---|
| **Atemholen-Balken** | *"Bis hier [Konsequenz konkret]. [Konsequenz/Frage zum nächsten Akt]"* |
| **Deeper-Note** | *"[Wahrheit max 15 Wörter]"* + *"Konsequenz für dich — [Handlung/Beruhigung max 12 Wörter]"* |
| **Chapter Card "Nach diesem Akt"** | *"[konkrete Handlung]"* — NIE "verstehen", IMMER "tun" |
| **Recap-mini Items** | *"[was du jetzt kannst, ein Tun]"* — nicht "gelernt", sondern "kannst" |
| **Eyebrow** | *"[Nummer] · [Name] · [Dauer in Min]"* |

## Atemholen-Texte (Master-Liste)
- **Akt I → II:** *"Bis hier hast du alles im Chatfenster gemacht. <em>Drei Dinge nerven dich bald.</em>"* ✅
- **Akt II → III:** *"Du hast einen Agent. <em>Er hat aber keine Ahnung, wer du bist.</em> Das müssen wir ändern."* ✅
- **Akt III → IV:** *"Du nutzt KI jetzt für ziemlich viel. <em>Vertraust du ihr blind?</em>"*
- **Akt IV → V:** *"Vier Kritiker rufst du jetzt manuell. <em>Das wird mühselig.</em> Machen wir's automatisch."*
- **Akt V → VI:** *"Bis hier sitzt Claude in deinem Ordner. <em>Wir öffnen jetzt die Tür</em> zu deinem Kalender, Mail, Slack."*

---

# 7 — Konzeptuelle Säulen (nicht verhandelbar)

1. **"Mathe mit Worten"** — Wörter sind Punkte, Operationen sind Geometrie. Zentrale Metapher.
2. **9 Themen** (siehe Cheat Sheet) — die MECE-Taxonomie aller Prompt-Techniken
3. **Iterative Verfeinerung als Haltung** — kein Prompt ist perfekt im ersten Schuss
4. **Ehrlichkeit über Metapher-Status** — Disclaimer-Boxen + Deeper-Notes machen klar: Modell vs. Realität
5. **Senior-Audience-Sprache** — keine Anfänger-Beispiele
6. **Persona-Vorsicht** (Zheng 2024) — Persona-Prompts helfen oft NICHT bei messbaren Aufgaben
7. **Reasoning-Modelle berücksichtigt** — Standard-Chat vs. Reasoning ist eine Anwendungs-Entscheidung
8. **Wes-Kao-Prinzip:** Jeder Akt endet mit *"du kannst jetzt ___"*, nicht *"du hast gelernt ___"*
9. **Maven-Pädagogik:** I-do/We-do/You-do-Sequenz pro Sub-Akt, Closing-the-Loop Reflexions-Pausen

---

# 8 — Experten-Panel: SalonAI_Critics-Skill

Liegt unter `.claude/skills/SalonAI_Critics/SKILL.md`. **19 Experten** in 5 Linsen:

1. **Pädagogik** — Mollick, Karpathy, Godin, Wes Kao, Maven School
2. **Web-Interaktion** — Comeau, Case, Bruno Simon, Rauch, Active Theory
3. **Human-AI-Design** — Maggie Appleton, Linus Lee, Jack Butcher
4. **Räumliche Inszenierung** — Es Devlin, Refik Anadol, Moment Factory, Tundra/Ouchhh
5. **Physisches Output** — LB Allix

**Trigger-Phrasen:** *"run critics on X"*, *"critic this"*, *"was würde Mollick/Karpathy/Godin/Kao/Maven/Comeau sagen"*, *"apply SalonAI_Critics"*

**Default:** Core 4 (Mollick · Karpathy · Godin · Kao). Output-Format ist im Skill festgelegt — pro Experte 3 Punkte + Was-zu-ändern, dann Synthese A/B/C nach Impact, dann Entscheidungs-Frage.

---

# 9 — Bekannte Open Issues

- **Bias.png** noch nicht in I.9 eingebunden (existiert aber im Ordner)
- **Fireworks-Animation** für Atemholen nach Akt I — vom User gewünscht, noch nicht gebaut
- **Akt I Atemholen** sagt *"Drei Dinge nerven dich bald"* — die drei Dinge sind aktuell nicht aufgelistet, User wollte konkretisieren
- *"Narrative-Shift vorhergesagt"* im Hero-Trailer evtl. zu jargonig — Alternative diskutieren
- **Cheat-Sheet-Verlinkung** am Workshop-Ende (nach Recap 3) — noch nicht eingebaut
- **Cowork-spezifische Datei-Namen** (`claude.md`, `memory/`, `context/`) — eventuell mit echten Cowork-Konventionen abgleichen, falls die abweichen
- **Couch-to-5K**-Inspiration vom User erwähnt — Inhalt von couchto5k.ai sollte als ausklappbare "wenn du dranbleiben willst"-Karte rein

---

# 10 — Workflow für eine neue Session

1. **Diese Datei lesen** — Stand klar
2. **`index.html` öffnen** — Pattern-Bibliothek studieren
3. **Wenn neuer Akt gebaut wird:**
   - Chapter Card mit Akt-Nummer + "Nach diesem Akt kannst du —"
   - Sub-Sektionen mit Eyebrow `[Nummer] · [Name] · [Dauer]`
   - Mind. 1 Hands-on-Übung pro Akt (I-do/We-do/You-do)
   - Mind. 1 Closing-the-Loop Reflexions-Pause
   - 1-2 Häufige Fehler an passenden Stellen
   - 1-2 Deeper-Notes wo Karpathy-Wahrheiten relevant
   - Recap-mini am Ende mit "was du jetzt kannst"
   - Atemholen-Balken zum nächsten Akt (Master-Liste oben)
4. **Wenn kritisches Feedback gewünscht:** `SalonAI_Critics`-Skill triggern
5. **Wenn ein Wort/Begriff nicht passt:** Schreibregeln (Sektion 6) checken — vor allem die "erwachsene Sprache"-Regel

---

# 11 — Deployment-Kontext

- **Hauptordner:** `/Users/franziska/Documents/SalonAI/Website/`
- **Workshop-Unterordner:** `Mai-stepbystepguide/`
- **Wird über GitHub Pages auf `salon-ai.eu/mai-workshop` deployt**
- **Achtung:** restliche Site-Struktur (`index.html` im Wurzel, `event.html`, `host.html`, etc.) NICHT verändern — die gehört zur Salon-AI-Hauptseite
