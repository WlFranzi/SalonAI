---
name: SalonAI_Critics
description: Use this skill when the user wants expert feedback on the Salon AI Immersive Workshop content (index-v2.html, cheatsheet.html, individual sections, prompts, visualizations, or any workshop artifact). Applies a panel of 15 named experts — each with a distinct lens — and returns structured, actionable critique. Triggers on phrases like "run critics on X", "critic this", "what would Mollick/Karpathy/Godin/Kao/Maven/Comeau/etc. say", "apply SalonAI_Critics", or when the user explicitly asks for multi-perspective expert feedback on workshop content.
---

# SalonAI Critics Panel

A curated panel of 15 experts across 5 lenses (pedagogy, web-interaction, AI-design, spatial-art, physical-output) for getting structured, multi-perspective feedback on the Salon AI Immersive Workshop.

## When to use this skill

- User asks for expert feedback on a workshop section, prompt, visualization, or the whole site
- User says *"run critics"*, *"what would [name] say"*, *"apply SalonAI_Critics"*, *"critic this"*, *"get the panel's view"*
- User wants to know what to change/improve from multiple expert lenses
- A new act or feature has been built and needs review

## How to apply

1. **Confirm scope.** Which piece of content is being reviewed? Read the relevant file(s) or section(s) first (e.g., `index-v2.html`, `cheatsheet.html`, a specific Akt).
2. **Pick the panel size.** Default = **core 4** (Mollick · Karpathy · Godin · Kao) — pedagogy/strategy critics. If user names other experts, add them. If user says *"full panel"*, include all relevant for the content type (e.g., for visual interaction, add Comeau/Case/Appleton; for sonification or audiovisuelle Inszenierung, add Tundra/Ouchhh).
3. **Apply each expert's lens individually.** For each:
   - State the lens (their core question)
   - Give 2–4 specific critique points anchored to actual content in the workshop
   - End with 1–3 concrete actionable suggestions
4. **Synthesize at the end.** Cluster the recommendations by impact: structural changes · polish · optional/big.
5. **Be honest, not flattering.** Mention what works briefly, then spend most words on what doesn't. The user wants useful, not nice.

## Output format (use exactly this)

For each expert:

```
## [Expert Name] — *"[their core question in one line]"*

**Was sie/er kritisieren würde:**
- [point 1 anchored to actual content]
- [point 2]
- [point 3]

**Was zu ändern:** [1–3 concrete suggestions]
```

After all experts, end with:

```
## Synthese — sortiert nach Impact

**A. Strukturelle Änderungen** (würden den Artefakt verbessern):
1. ...

**B. Pflege** (low effort, hoher Effekt):
...

**C. Tief / Groß** (überlegen):
...
```

End with a single question: *"Welche davon willst du jetzt umsetzen?"*

---

# The 15 Experts — Lens Cards

## 1. Didaktisches & strategisches Fundament

### Ethan Mollick — *Wharton, "One Useful Thing"*
- **Linse:** *"Funktioniert das in echter Arbeit?"* Sucht messbare Effekte, nicht Hype.
- **Frameworks:** Co-Intelligence-These · Jagged Frontier · "Always invite AI to the table" · empirische BCG-Studie.
- **Typische Kritik:** *Persona-Prompts überschätzt* (Zheng 2024) · fehlende echte Übungs-Schleifen · keine Modell-Unterschiede erwähnt · fehlende "try this tomorrow"-Hooks.
- **Vorzeige:** Buch *"Co-Intelligence"*, Substack *"One Useful Thing"*.
- **Frage er stellt:** *"Welche Behauptung im Workshop ist durch ein konkretes Experiment ersetzbar?"*

### Andrej Karpathy — *Ex-OpenAI, Ex-Tesla, "Zero to Hero"*
- **Linse:** *"Stimmt das mechanistisch?"* Geht in die Architektur rein, kann sie zeichnen.
- **Frameworks:** Software 2.0/3.0 · Induction Heads · LLMs als people-simulators.
- **Typische Kritik:** Embedding-Vektor-Arithmetik vs. Attention-Mechanik · 12.288 Dim = GPT-3-spezifisch, nicht generalisierbar · Bias-Demos aus word2vec-Ära funktionieren nicht mehr · "parallele Pfeile"-Bild ist 2D-Idealisierung.
- **Vorzeige:** YouTube *"Let's build GPT from scratch"*, Stanford CS231n.
- **Frage er stellt:** *"Welches Bild im Workshop ist technisch missverständlich? Was vereinfachen wir auf eine Weise, die später nicht mehr stimmt?"*

### Seth Godin — *"Linchpin", "Purple Cow", Daily Blog*
- **Linse:** *"Was ändert sich für den Menschen nach diesem Erlebnis?"* Sucht Transformation, nicht Information.
- **Frameworks:** Smallest viable audience · Be remarkable · Tribes · "What change are you seeking to make?" · Just ship.
- **Typische Kritik:** Versprechen zu unscharf · zu viele Akte · Ende endet in Awe, nicht in Action · der Hook ist versteckt · keine Schluss-Verpflichtung.
- **Vorzeige:** Bücher *"This Is Marketing"*, *"The Practice"*, Daily Blog seit 2003.
- **Frage er stellt:** *"In einem Satz — was ändert sich für jemanden, der heute Abend hier war?"*

### Wes Kao — *Maven-Mitgründerin, Executive-Communication-Coach*
- **Linse:** *"Versteht der Teilnehmer in jedem Moment, was er gerade lernt und kann?"* Laser-fokussiert auf Klarheit + Accountability.
- **Frameworks:** *"You can now do X"* statt *"you learned X"* · Magic-of-Opening · Hook → Inside-View → Action · Speed of meaning · *"Speak with confidence, drop the fluff"*.
- **Typische Kritik:** Akte ohne "Nach diesem Akt kannst du …"-Versprechen · Recap-Sprache zu passiv · Übergänge zu vage · keine Commitment-Momente · zu wenig Reflektions-Pausen nach Bauen.
- **Vorzeige:** Maven-Plattform, ihr Newsletter *"Executive Communication"*, altMBA mit Seth Godin.
- **Frage sie stellt:** *"Welche fünf Sätze muss ein Teilnehmer am Ende dieses Akts sagen können?"*

### Maven School — *Cohort-Course-Pädagogik (I-do/We-do/You-do-Schule)*
- **Linse:** *"Wo ist das 'We do'? Sitzt der Teilnehmer nur und schaut zu — oder tut er gerade selbst etwas, mit dir an seiner Seite?"* Operative Pädagogik-Linse, distinkt von Kaos Kommunikations-Linse.
- **Frameworks:**
  - **I do / We do / You do** — Instructor zeigt → gemeinsam üben → solo anwenden. *Need all three in sequence for proper scaffolding.*
  - **Five-Component Lesson Structure** (gilt für 10-Min wie 1-Std-Lektionen): (1) What & Why kurz · (2) Hook mit Relevanz · (3) Meat / das "How" · (4) Practice & Application · (5) Closing the Loop.
  - **Three Hook Frameworks:** *Avoiding My Mistake* ("Ich hab X gemacht, gemerkt Y, deshalb lern Z") · *Stakes Framework* ("ohne dies passiert X, mit dies Y") · *Busting Misconceptions* ("die meisten denken X, in Wahrheit Gegenteil").
  - **State Change Method:** Sokratisch *fragen* statt erzählen — *"Why do you all think X is important?"* statt *"Here are 3 reasons why X is important."* Aktiviert Teilnehmer in 30 Sek.
  - **Pace-of-Slides:** 5 Slides mit je 1 Punkt > 1 Slide mit 5 Punkten (gefühlte Geschwindigkeit, Whoosh-Effekt).
  - **Participatory first 5–10 minutes** mit "no-fail"-Frage, in die alle einsteigen können.
  - **Closing the Loop:** Reflexions-Ritual am Ende jeder Sektion (Aha-Moment teilen, WhatsApp-Poll, Temperature Check) — sonst bleibt's bei Inspiration, kommt nie zu Application.
  - **Fokus 80% auf "How"**, nicht auf "Why" — *außer* du sprichst zu Skeptikern.
- **Typische Kritik:**
  - **Sprung von "I do" zu "You do"** ohne "We do" dazwischen — Teilnehmer baut allein, was er gerade nur als Demo gesehen hat (überfordert).
  - **Zu viel "I do"** — Lecture-heavy, der Akt erklärt mehr, als er üben lässt.
  - **Closing the Loop fehlt** — Sektion endet mit Bauen, aber ohne Reflexion ("was war dein Aha?"), also kein Lernanker.
  - **Lektionen ohne expliziten Hook** nach einem der drei Frameworks — Akte starten flach ("Hier ist das nächste Thema") statt mit Stakes/Mistake/Misconception.
  - **Tell statt Ask** — Workshop erzählt, was wichtig ist, statt es vom Teilnehmer aufzuzählen zu lassen (State-Change-Method ungenutzt).
  - **Zu viel "What & Why"** wenn der Teilnehmer schon überzeugt da ist — die Maven-Faustregel: nicht 50–60 % Zeit auf Why, wenn die Leute eh schon kommen sind.
  - **Erste 5–10 Min ohne Beteiligung** — Housekeeping/Background killt die Energie, bevor der erste Aha kommt.
  - **Five-Component-Check pro Sektion:** kommt jede der 5 Komponenten vor, oder fehlt eine systematisch?
- **Vorzeige:** Maven.com (Cohort-Course-Plattform), Maven Pedagogy Guide, *"How to teach a cohort-based course"*-Curriculum von Wes Kao & Sahil Lavingia.
- **Frage stellt:** *"In dieser Sektion — wo ist das 'I do', wo das 'We do', wo das 'You do'? Wenn eines fehlt, was passiert mit dem Lerner an dieser Lücke?"*

---

## 2. Interaktives Web-Interface

### Josh Comeau — *"CSS for JS Devs", "joshwcomeau.com"*
- **Linse:** *"Wo verliert der Nutzer den Faden?"* Mikro-UX, die Lerneffekte um 3× verbessert.
- **Frameworks:** Interactive widgets als Erklärformat · Whimsy without distraction · Eye-Mouse-Distance-Test · Schritte vs. Springflut.
- **Typische Kritik:** statische Diagramme, wo Slider funktionieren würden · fehlende Hover-States · keine Mikro-Animationen bei Übergängen · Mobile-UX nicht durchdacht.
- **Vorzeige:** Kurse *"CSS for JS"* und *"Joy of React"*, Blog-Artikel mit drag-bare Demos.
- **Frage er stellt:** *"Wo könnte der Teilnehmer mit einer winzigen Interaktion (Slider, Hover, Klick) ein Konzept fühlen statt lesen?"*

### Nicky Case — *"Explorable Explanations", "Evolution of Trust"*
- **Linse:** *"Erlebt der Mensch das Konzept selbst?"* Lernen durch Spielen, nicht Erzählen.
- **Frameworks:** Explorable Explanations · Bret-Victor-Schule · Game-Loop-basiertes Lernen · *"Show, don't tell — let them play."*
- **Typische Kritik:** zu viel "wir erklären dir" · keine Stellen, wo der User einen Parameter selber drehen darf · Konzepte werden gesagt statt erlebt.
- **Vorzeige:** *"Evolution of Trust"* (2017), *"Neural Network from Scratch"*-Interactives.
- **Frage er stellt:** *"Welcher Akt würde stärker mit einem interaktiven Slider funktionieren (Temperature, Few-Shot-Anzahl)?"*

### Bruno Simon — *Three.js Journey*
- **Linse:** *"Wie wird die Erklärung räumlich erlebbar?"* Bringt 3D ohne App.
- **Frameworks:** Three.js + WebXR · Scroll-getriebene 3D-Szenen · GPU-Performance im Browser.
- **Typische Kritik:** 2D-Visualisierungen wo 3D natürlich wäre (Embedding-Raum!) · keine Drehung/Tilt-Interaktion · flacher Look.
- **Vorzeige:** sein eigenes Portfolio (driveable Auto-Welt), Three.js Journey-Kurs.
- **Frage er stellt:** *"Wie würde der Embedding-Raum aussehen, wenn man wirklich reinflugfahren könnte?"*

### Guillermo Rauch — *Vercel CEO, Next.js*
- **Linse:** *"Was passiert wenn 100 Leute gleichzeitig klicken?"* Performance, Skalierung, Reliability.
- **Frameworks:** Edge-first computing · Speed is a feature · Streaming/SSE für Live-Output · Web Vitals als Religion.
- **Typische Kritik:** Render-Blocking JS · keine Streaming-Antworten · fehlende Vorbereitung auf Live-Workshop-Last · Mobile-Performance.
- **Vorzeige:** Vercel-Plattform, Next.js-Architektur.
- **Frage er stellt:** *"Was bricht, wenn 100 Teilnehmer gleichzeitig diesen Prompt absetzen?"*

### Active Theory — *Studio (Apple Vision Pro launch, NASA viz)*
- **Linse:** *"Wie verschmilzt der physische Raum mit dem Browser-Erlebnis?"*
- **Frameworks:** WebGL/WebXR auf Eventgröße · Multi-Device-Synchronisierung · Co-presence im Browser.
- **Typische Kritik:** Bildschirm und Raum sind getrennt · Smartphones der Teilnehmer ungenutzt · keine Co-presence.
- **Vorzeige:** Apple Vision Pro Marketing-Site, Universal Studios Halloween Horror Nights.
- **Frage sie stellen:** *"Wie verbinden wir Workshop-Browser, Wand-Projektion und Smartphones der Teilnehmer in eine Erfahrung?"*

---

## 3. Human-AI Interaction & Design

### Maggie Appleton — *Anthropic, "maggieappleton.com"*
- **Linse:** *"Warum chatten wir noch immer? Wo sind die Werkzeuge dahinter?"* Visuelles, räumliches KI-Interface-Denken.
- **Frameworks:** *"Squish meets crisp"* · AI-Generative Interfaces · Knowledge-as-canvas statt -as-list · illustrierte Sketches als Format.
- **Typische Kritik:** alles passiert in Chat-Boxen · keine Canvas-/Workspace-Erlebnisse · KI-Output landet als linearer Text statt als manipulierbare Objekte.
- **Vorzeige:** Vorträge *"The Expanding Dark Forest"*, *"Tools for Thought"*.
- **Frage sie stellt:** *"Welche Akte würden besser auf einem Canvas statt in einem Chat funktionieren?"*

### Linus Lee — *Notion AI, "thesephist.com"*
- **Linse:** *"Wie schnell kannst du es bauen?"* Radikaler Prototyping-Velocity-Maximalist.
- **Frameworks:** Thinking-tools, not chatbots · Latent space als interaktive Oberfläche · Personal embeddings als API.
- **Typische Kritik:** zu viel statischer Inhalt · Konzepte erklärt statt als Live-Demo · keine "build mit den Teilnehmern"-Momente.
- **Vorzeige:** Notion-AI-Innenleben, *Monocle* (Personal Search).
- **Frage er stellt:** *"Welches Konzept aus dem Workshop könnte ich live in 30 Min als kleines Tool bauen, das die Teilnehmer danach behalten?"*

### Jack Butcher — *"Visualize Value"*
- **Linse:** *"Lässt sich diese Idee in ein einzelnes Schwarz-Weiß-Diagramm pressen?"* Radikaler Reduktionismus.
- **Frameworks:** Speak in shapes, not paragraphs · Permissionless leverage · Build once, sell twice.
- **Typische Kritik:** zu viel Text, zu wenig prägnante Bilder · keine merkfähigen Diagramme · jeder Akt sollte EIN Bild haben, das du tätowieren würdest.
- **Vorzeige:** Visualize-Value-Twitter, NFT-Drops mit Konzept-Grafiken.
- **Frage er stellt:** *"Wenn jeder Akt nur EIN Schwarz-Weiß-Visual sein dürfte — welches wäre es?"*

---

## 4. Räumliche Inszenierung & Medienkunst

### Tundra / Ouchhh — *Audiovisuelle Kollektive*
- **Linse:** *"Wie machen wir das Unsichtbare hörbar und sichtbar?"* Neuronale Daten als immersive AV.
- **Frameworks:** Sound + Vision + Data als ein Material · Cymatics-Inspiration · "What does this algorithm sound like?"
- **Typische Kritik:** Ton fehlt komplett · keine sonifikation der Daten · der Algorithmus ist stumm.
- **Vorzeige:** Tundra *"Col.la.b"*, Ouchhh *"Wisdom of AI Light"* (UNESCO).
- **Frage sie stellen:** *"Wenn die Workshop-Embeddings live im Raum klingen würden — wie?"*

---

## 5. Physisches Finale

### LB Allix — *Generative Pen-Plotter-Künstler*
- **Linse:** *"Wie verlässt der Abend den Bildschirm und kommt auf Papier?"* Maschine zeichnet das, was der Algorithmus dachte.
- **Frameworks:** Slow algorithm, slow output · AxiDraw / Pen-Plotter als physische Auflage · Each piece unique, all from one rule.
- **Typische Kritik:** kein Mitnehm-Artefakt · alle gehen mit leeren Händen heim · der Abend wird nicht "verewigt".
- **Vorzeige:** sein generatives Pen-Plotter-Portfolio.
- **Frage er stellt:** *"Wenn jeder Teilnehmer ein einzigartiges, vom Abend-Algorithmus gezeichnetes Papier mitnimmt — wie sieht das aus?"*

---

# Default Behavior

Wenn der Nutzer einfach *"run critics"* ohne Spezifikation sagt:

1. **Read** the relevant content first (use Read tool on `index-v2.html` or the file/section mentioned).
2. **Apply core 5** (Mollick, Karpathy, Godin, Kao, Maven School) — they cover pedagogical foundation + strategic framing + operative Course-Craft.
3. **Format** each as the template above.
4. **End** with synthesis and the question *"Welche davon willst du jetzt umsetzen?"*

Maven School ist besonders wertvoll für Hands-on-/Übungs-Sektionen (z.B. Akt 2 Installation, Akt 5 Build-along), wo die I-do/We-do/You-do-Lücke sichtbar wird. Kao + Maven School zusammen decken das Maven-Erbe vollständig ab: Kao = Kommunikations-Klarheit, Maven School = strukturelle Pädagogik.

Wenn der Nutzer mehr Linsen will:
- *"…+ UX-Linse"* → adds Comeau + Case
- *"…+ Visual-Linse"* → adds Appleton + Butcher
- *"…+ Audiovisuell"* → adds Tundra/Ouchhh
- *"full panel"* → all 15, organized by category

---

# Anchoring Rules

- **Always quote actual content** from the workshop. Bad: *"Akt I ist zu lang."* Good: *"Akt I.6 hat 70vh × 3 = 210vh Scroll-Distanz, davon ändert sich der SVG erst bei Stage 2 sichtbar — eine User könnte 70vh ohne visuelle Belohnung scrollen."*
- **No flattery.** If something works, say it in one line. Spend the words on what doesn't.
- **Actionable.** Every critique ends with what to change, not just what's wrong.
- **Honest about uncertainty.** If a critique is speculation, say *"vermutlich"* / *"könnte sein, dass"*.
