import { useState } from "react";
import { CATEGORIES } from "../data/monsters";
import CategorySection from "../components/CategorySection";

// ─── Types ──────────────────────────────────────────────────────────────────
type MissionId = "all" | "bilder" | "text" | "coding" | "research";
type HostingId = "all" | "cloud-eu" | "lokal";

// ─── Language ────────────────────────────────────────────────────────────────
function getLang(): string {
  try { return localStorage.getItem("salonai_lang") || "de"; } catch { return "de"; }
}

// ─── KI Guide UI Translations ────────────────────────────────────────────────
const KI_UI: Record<string, {
  title: string; sub: string;
  mission_all: string; mission_bilder: string; mission_bilder_sub: string;
  mission_text: string; mission_text_sub: string;
  mission_coding: string; mission_coding_sub: string;
  mission_research: string; mission_research_sub: string;
  hosting_all: string; hosting_all_desc: string;
  hosting_eu: string; hosting_eu_desc: string;
  hosting_local: string; hosting_local_desc: string;
  data_row: string; reset: string; no_tools: string; filter_reset: string;
  glossary_btn: string; privacy_title: string;
  local_title: string; local_sub: string; us_title: string; us_sub: string; eu_title: string; eu_sub: string;
  privacy_note: string;
}> = {
  de: {
    title: "KI Guide 2026", sub: "Was willst du tun — und wo sollen deine Daten bleiben?",
    mission_all: "Alle Tools", mission_bilder: "Bilder & Design", mission_bilder_sub: "Logo · Branding · Fotos · UI",
    mission_text: "Text & Schreiben", mission_text_sub: "Blog · E-Mail · Social · Copy",
    mission_coding: "Code & Automatisierung", mission_coding_sub: "Coding · Agents · APIs · CLI",
    mission_research: "Recherche & Analyse", mission_research_sub: "PDFs · Daten · Suche · RAG",
    hosting_all: "Egal", hosting_all_desc: "Alle Tools anzeigen",
    hosting_eu: "EU / DSGVO", hosting_eu_desc: "Server in Europa, DSGVO-konform",
    hosting_local: "Nur lokal", hosting_local_desc: "Läuft auf deinem Gerät, keine Cloud",
    data_row: "☁️ Wo bleiben deine Daten?", reset: "✕ zurücksetzen",
    no_tools: "Keine passenden Tools gefunden.", filter_reset: "Filter zurücksetzen",
    glossary_btn: "📖 KI-Begriffe einfach erklärt",
    privacy_title: "🖥️ Wo läuft das KI-Modell — und was bedeutet das für deine Daten?",
    local_title: "Lokal", local_sub: "Eigener Computer", us_title: "US Cloud", us_sub: "Server in den USA", eu_title: "EU Cloud", eu_sub: "Server in Europa",
    privacy_note: "Das Modell selbst ist oft dasselbe — der Unterschied ist wo es läuft und wer Zugriff auf deine Eingaben hat.",
  },
  en: {
    title: "AI Guide 2026", sub: "What do you want to do — and where should your data stay?",
    mission_all: "All Tools", mission_bilder: "Images & Design", mission_bilder_sub: "Logo · Branding · Photos · UI",
    mission_text: "Text & Writing", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Code & Automation", mission_coding_sub: "Coding · Agents · APIs · CLI",
    mission_research: "Research & Analysis", mission_research_sub: "PDFs · Data · Search · RAG",
    hosting_all: "Any", hosting_all_desc: "Show all tools",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Servers in Europe, GDPR-compliant",
    hosting_local: "Local only", hosting_local_desc: "Runs on your device, no cloud",
    data_row: "☁️ Where does your data stay?", reset: "✕ reset",
    no_tools: "No matching tools found.", filter_reset: "Reset filters",
    glossary_btn: "📖 AI terms simply explained",
    privacy_title: "🖥️ Where does the AI model run — and what does that mean for your data?",
    local_title: "Local", local_sub: "Your own computer", us_title: "US Cloud", us_sub: "Servers in the US", eu_title: "EU Cloud", eu_sub: "Servers in Europe",
    privacy_note: "The model itself is often the same — the difference is where it runs and who has access to your inputs.",
  },
  fr: {
    title: "Guide IA 2026", sub: "Que voulez-vous faire — et où vos données doivent-elles rester ?",
    mission_all: "Tous les outils", mission_bilder: "Images & Design", mission_bilder_sub: "Logo · Marque · Photos · UI",
    mission_text: "Texte & Écriture", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Code & Automatisation", mission_coding_sub: "Coding · Agents · APIs · CLI",
    mission_research: "Recherche & Analyse", mission_research_sub: "PDFs · Données · Recherche · RAG",
    hosting_all: "Peu importe", hosting_all_desc: "Afficher tous les outils",
    hosting_eu: "UE / RGPD", hosting_eu_desc: "Serveurs en Europe, conformes au RGPD",
    hosting_local: "Local uniquement", hosting_local_desc: "Fonctionne sur votre appareil, pas de cloud",
    data_row: "☁️ Où restent vos données ?", reset: "✕ réinitialiser",
    no_tools: "Aucun outil correspondant trouvé.", filter_reset: "Réinitialiser les filtres",
    glossary_btn: "📖 Termes IA expliqués simplement",
    privacy_title: "🖥️ Où tourne le modèle IA — et qu'est-ce que cela signifie pour vos données ?",
    local_title: "Local", local_sub: "Votre propre ordinateur", us_title: "Cloud US", us_sub: "Serveurs aux États-Unis", eu_title: "Cloud UE", eu_sub: "Serveurs en Europe",
    privacy_note: "Le modèle lui-même est souvent le même — la différence est où il tourne et qui a accès à vos données.",
  },
  es: {
    title: "Guía IA 2026", sub: "¿Qué quieres hacer — y dónde deben quedarse tus datos?",
    mission_all: "Todas las herramientas", mission_bilder: "Imágenes & Diseño", mission_bilder_sub: "Logo · Marca · Fotos · UI",
    mission_text: "Texto & Escritura", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Código & Automatización", mission_coding_sub: "Coding · Agents · APIs · CLI",
    mission_research: "Investigación & Análisis", mission_research_sub: "PDFs · Datos · Búsqueda · RAG",
    hosting_all: "Da igual", hosting_all_desc: "Mostrar todas las herramientas",
    hosting_eu: "UE / RGPD", hosting_eu_desc: "Servidores en Europa, conformes con RGPD",
    hosting_local: "Solo local", hosting_local_desc: "Se ejecuta en tu dispositivo, sin nube",
    data_row: "☁️ ¿Dónde se quedan tus datos?", reset: "✕ restablecer",
    no_tools: "No se encontraron herramientas.", filter_reset: "Restablecer filtros",
    glossary_btn: "📖 Términos de IA explicados fácilmente",
    privacy_title: "🖥️ ¿Dónde se ejecuta el modelo IA — y qué significa eso para tus datos?",
    local_title: "Local", local_sub: "Tu propio ordenador", us_title: "Cloud EE.UU.", us_sub: "Servidores en EE.UU.", eu_title: "Cloud UE", eu_sub: "Servidores en Europa",
    privacy_note: "El modelo en sí suele ser el mismo — la diferencia es dónde se ejecuta y quién tiene acceso a tus datos.",
  },
  it: {
    title: "Guida IA 2026", sub: "Cosa vuoi fare — e dove devono restare i tuoi dati?",
    mission_all: "Tutti gli strumenti", mission_bilder: "Immagini & Design", mission_bilder_sub: "Logo · Brand · Foto · UI",
    mission_text: "Testo & Scrittura", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Codice & Automazione", mission_coding_sub: "Coding · Agenti · APIs · CLI",
    mission_research: "Ricerca & Analisi", mission_research_sub: "PDF · Dati · Ricerca · RAG",
    hosting_all: "Non importa", hosting_all_desc: "Mostra tutti gli strumenti",
    hosting_eu: "UE / GDPR", hosting_eu_desc: "Server in Europa, conformi al GDPR",
    hosting_local: "Solo locale", hosting_local_desc: "Gira sul tuo dispositivo, nessun cloud",
    data_row: "☁️ Dove restano i tuoi dati?", reset: "✕ ripristina",
    no_tools: "Nessuno strumento trovato.", filter_reset: "Ripristina filtri",
    glossary_btn: "📖 Termini IA spiegati semplicemente",
    privacy_title: "🖥️ Dove gira il modello IA — e cosa significa per i tuoi dati?",
    local_title: "Locale", local_sub: "Il tuo computer", us_title: "Cloud USA", us_sub: "Server negli USA", eu_title: "Cloud UE", eu_sub: "Server in Europa",
    privacy_note: "Il modello stesso è spesso lo stesso — la differenza è dove gira e chi ha accesso ai tuoi dati.",
  },
  pt: {
    title: "Guia IA 2026", sub: "O que queres fazer — e onde devem ficar os teus dados?",
    mission_all: "Todas as ferramentas", mission_bilder: "Imagens & Design", mission_bilder_sub: "Logo · Marca · Fotos · UI",
    mission_text: "Texto & Escrita", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Código & Automação", mission_coding_sub: "Coding · Agentes · APIs · CLI",
    mission_research: "Pesquisa & Análise", mission_research_sub: "PDFs · Dados · Pesquisa · RAG",
    hosting_all: "Tanto faz", hosting_all_desc: "Mostrar todas as ferramentas",
    hosting_eu: "UE / RGPD", hosting_eu_desc: "Servidores na Europa, conformes com o RGPD",
    hosting_local: "Apenas local", hosting_local_desc: "Corre no teu dispositivo, sem cloud",
    data_row: "☁️ Onde ficam os teus dados?", reset: "✕ repor",
    no_tools: "Nenhuma ferramenta encontrada.", filter_reset: "Repor filtros",
    glossary_btn: "📖 Termos de IA explicados simplesmente",
    privacy_title: "🖥️ Onde corre o modelo IA — e o que significa isso para os teus dados?",
    local_title: "Local", local_sub: "O teu computador", us_title: "Cloud EUA", us_sub: "Servidores nos EUA", eu_title: "Cloud UE", eu_sub: "Servidores na Europa",
    privacy_note: "O modelo em si é muitas vezes o mesmo — a diferença é onde corre e quem tem acesso aos teus dados.",
  },
  nl: {
    title: "AI Gids 2026", sub: "Wat wil je doen — en waar moeten je gegevens blijven?",
    mission_all: "Alle tools", mission_bilder: "Afbeeldingen & Design", mission_bilder_sub: "Logo · Merk · Foto's · UI",
    mission_text: "Tekst & Schrijven", mission_text_sub: "Blog · E-mail · Social · Copy",
    mission_coding: "Code & Automatisering", mission_coding_sub: "Coding · Agents · APIs · CLI",
    mission_research: "Onderzoek & Analyse", mission_research_sub: "PDFs · Data · Zoeken · RAG",
    hosting_all: "Maakt niet uit", hosting_all_desc: "Alle tools tonen",
    hosting_eu: "EU / AVG", hosting_eu_desc: "Servers in Europa, AVG-conform",
    hosting_local: "Alleen lokaal", hosting_local_desc: "Draait op jouw apparaat, geen cloud",
    data_row: "☁️ Waar blijven je gegevens?", reset: "✕ wissen",
    no_tools: "Geen passende tools gevonden.", filter_reset: "Filters wissen",
    glossary_btn: "📖 AI-begrippen eenvoudig uitgelegd",
    privacy_title: "🖥️ Waar draait het AI-model — en wat betekent dat voor je data?",
    local_title: "Lokaal", local_sub: "Eigen computer", us_title: "US Cloud", us_sub: "Servers in de VS", eu_title: "EU Cloud", eu_sub: "Servers in Europa",
    privacy_note: "Het model zelf is vaak hetzelfde — het verschil is waar het draait en wie toegang heeft tot je invoer.",
  },
  pl: {
    title: "Przewodnik AI 2026", sub: "Co chcesz robić — i gdzie mają pozostać Twoje dane?",
    mission_all: "Wszystkie narzędzia", mission_bilder: "Obrazy & Design", mission_bilder_sub: "Logo · Marka · Zdjęcia · UI",
    mission_text: "Tekst & Pisanie", mission_text_sub: "Blog · E-mail · Social · Copy",
    mission_coding: "Kod & Automatyzacja", mission_coding_sub: "Coding · Agenci · APIs · CLI",
    mission_research: "Badania & Analiza", mission_research_sub: "PDFs · Dane · Wyszukiwanie · RAG",
    hosting_all: "Obojętne", hosting_all_desc: "Pokaż wszystkie narzędzia",
    hosting_eu: "UE / RODO", hosting_eu_desc: "Serwery w Europie, zgodne z RODO",
    hosting_local: "Tylko lokalnie", hosting_local_desc: "Działa na Twoim urządzeniu, bez chmury",
    data_row: "☁️ Gdzie zostają Twoje dane?", reset: "✕ resetuj",
    no_tools: "Nie znaleziono pasujących narzędzi.", filter_reset: "Resetuj filtry",
    glossary_btn: "📖 Pojęcia AI wyjaśnione prosto",
    privacy_title: "🖥️ Gdzie działa model AI — i co to oznacza dla Twoich danych?",
    local_title: "Lokalnie", local_sub: "Twój komputer", us_title: "Chmura US", us_sub: "Serwery w USA", eu_title: "Chmura UE", eu_sub: "Serwery w Europie",
    privacy_note: "Sam model jest często taki sam — różnica polega na tym, gdzie działa i kto ma dostęp do Twoich danych.",
  },
  ro: {
    title: "Ghid AI 2026", sub: "Ce vrei să faci — și unde trebuie să rămână datele tale?",
    mission_all: "Toate instrumentele", mission_bilder: "Imagini & Design", mission_bilder_sub: "Logo · Brand · Foto · UI",
    mission_text: "Text & Scriere", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Cod & Automatizare", mission_coding_sub: "Coding · Agenți · APIs · CLI",
    mission_research: "Cercetare & Analiză", mission_research_sub: "PDFs · Date · Căutare · RAG",
    hosting_all: "Nu contează", hosting_all_desc: "Afișează toate instrumentele",
    hosting_eu: "UE / GDPR", hosting_eu_desc: "Servere în Europa, conforme GDPR",
    hosting_local: "Doar local", hosting_local_desc: "Rulează pe dispozitivul tău, fără cloud",
    data_row: "☁️ Unde rămân datele tale?", reset: "✕ resetează",
    no_tools: "Nu s-au găsit instrumente.", filter_reset: "Resetează filtrele",
    glossary_btn: "📖 Termeni AI explicați simplu",
    privacy_title: "🖥️ Unde rulează modelul AI — și ce înseamnă asta pentru datele tale?",
    local_title: "Local", local_sub: "Computerul tău", us_title: "Cloud SUA", us_sub: "Servere în SUA", eu_title: "Cloud UE", eu_sub: "Servere în Europa",
    privacy_note: "Modelul în sine este adesea același — diferența este unde rulează și cine are acces la datele tale.",
  },
  sv: {
    title: "AI Guide 2026", sub: "Vad vill du göra — och var ska din data stanna?",
    mission_all: "Alla verktyg", mission_bilder: "Bilder & Design", mission_bilder_sub: "Logo · Varumärke · Foton · UI",
    mission_text: "Text & Skrivande", mission_text_sub: "Blogg · E-post · Social · Copy",
    mission_coding: "Kod & Automatisering", mission_coding_sub: "Kodning · Agenter · APIs · CLI",
    mission_research: "Forskning & Analys", mission_research_sub: "PDFs · Data · Sökning · RAG",
    hosting_all: "Spelar ingen roll", hosting_all_desc: "Visa alla verktyg",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Servrar i Europa, GDPR-kompatibla",
    hosting_local: "Bara lokalt", hosting_local_desc: "Körs på din enhet, inget moln",
    data_row: "☁️ Var stannar din data?", reset: "✕ återställ",
    no_tools: "Inga matchande verktyg hittades.", filter_reset: "Återställ filter",
    glossary_btn: "📖 AI-termer enkelt förklarade",
    privacy_title: "🖥️ Var körs AI-modellen — och vad betyder det för din data?",
    local_title: "Lokalt", local_sub: "Din egen dator", us_title: "US Moln", us_sub: "Servrar i USA", eu_title: "EU Moln", eu_sub: "Servrar i Europa",
    privacy_note: "Modellen i sig är ofta densamma — skillnaden är var den körs och vem som har tillgång till dina indata.",
  },
  cs: {
    title: "AI Průvodce 2026", sub: "Co chcete dělat — a kde mají zůstat vaše data?",
    mission_all: "Všechny nástroje", mission_bilder: "Obrázky & Design", mission_bilder_sub: "Logo · Branding · Foto · UI",
    mission_text: "Text & Psaní", mission_text_sub: "Blog · E-mail · Social · Copy",
    mission_coding: "Kód & Automatizace", mission_coding_sub: "Coding · Agenti · APIs · CLI",
    mission_research: "Výzkum & Analýza", mission_research_sub: "PDFs · Data · Hledání · RAG",
    hosting_all: "Nezáleží", hosting_all_desc: "Zobrazit všechny nástroje",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Servery v Evropě, GDPR-konformní",
    hosting_local: "Pouze lokálně", hosting_local_desc: "Běží na vašem zařízení, bez cloudu",
    data_row: "☁️ Kde zůstanou vaše data?", reset: "✕ resetovat",
    no_tools: "Nenalezeny žádné nástroje.", filter_reset: "Resetovat filtry",
    glossary_btn: "📖 AI pojmy jednoduše vysvětleny",
    privacy_title: "🖥️ Kde běží AI model — a co to znamená pro vaše data?",
    local_title: "Lokálně", local_sub: "Váš vlastní počítač", us_title: "US Cloud", us_sub: "Servery v USA", eu_title: "EU Cloud", eu_sub: "Servery v Evropě",
    privacy_note: "Samotný model je často stejný — rozdíl je v tom, kde běží a kdo má přístup k vašim vstupům.",
  },
  hu: {
    title: "AI Útmutató 2026", sub: "Mit szeretnél csinálni — és hol kell maradniuk az adataidnak?",
    mission_all: "Minden eszköz", mission_bilder: "Képek & Design", mission_bilder_sub: "Logó · Márka · Fotók · UI",
    mission_text: "Szöveg & Írás", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Kód & Automatizálás", mission_coding_sub: "Kódolás · Ügynökök · APIs · CLI",
    mission_research: "Kutatás & Elemzés", mission_research_sub: "PDFs · Adatok · Keresés · RAG",
    hosting_all: "Mindegy", hosting_all_desc: "Minden eszköz megjelenítése",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Szerverek Európában, GDPR-kompatibilis",
    hosting_local: "Csak helyi", hosting_local_desc: "Az eszközödön fut, nincs felhő",
    data_row: "☁️ Hol maradnak az adataid?", reset: "✕ visszaállít",
    no_tools: "Nem találhatók megfelelő eszközök.", filter_reset: "Szűrők visszaállítása",
    glossary_btn: "📖 AI kifejezések egyszerűen magyarázva",
    privacy_title: "🖥️ Hol fut az AI modell — és mit jelent ez az adataid szempontjából?",
    local_title: "Helyi", local_sub: "Saját számítógép", us_title: "US Felhő", us_sub: "Szerverek az USA-ban", eu_title: "EU Felhő", eu_sub: "Szerverek Európában",
    privacy_note: "Maga a modell gyakran ugyanaz — a különbség az, hogy hol fut és ki fér hozzá az adataidhoz.",
  },
  sk: {
    title: "AI Sprievodca 2026", sub: "Čo chcete robiť — a kde majú zostať vaše údaje?",
    mission_all: "Všetky nástroje", mission_bilder: "Obrázky & Dizajn", mission_bilder_sub: "Logo · Branding · Foto · UI",
    mission_text: "Text & Písanie", mission_text_sub: "Blog · E-mail · Social · Copy",
    mission_coding: "Kód & Automatizácia", mission_coding_sub: "Coding · Agenti · APIs · CLI",
    mission_research: "Výskum & Analýza", mission_research_sub: "PDFs · Dáta · Hľadanie · RAG",
    hosting_all: "Nezáleží", hosting_all_desc: "Zobraziť všetky nástroje",
    hosting_eu: "EÚ / GDPR", hosting_eu_desc: "Servery v Európe, GDPR-konformné",
    hosting_local: "Iba lokálne", hosting_local_desc: "Beží na vašom zariadení, bez cloudu",
    data_row: "☁️ Kde zostanú vaše údaje?", reset: "✕ resetovať",
    no_tools: "Nenašli sa žiadne nástroje.", filter_reset: "Resetovať filtre",
    glossary_btn: "📖 AI pojmy jednoducho vysvetlené",
    privacy_title: "🖥️ Kde beží AI model — a čo to znamená pre vaše dáta?",
    local_title: "Lokálne", local_sub: "Váš vlastný počítač", us_title: "US Cloud", us_sub: "Servery v USA", eu_title: "EU Cloud", eu_sub: "Servery v Európe",
    privacy_note: "Samotný model je často rovnaký — rozdiel je v tom, kde beží a kto má prístup k vašim vstupom.",
  },
  bg: {
    title: "AI Ръководство 2026", sub: "Какво искате да правите — и къде трябва да останат данните ви?",
    mission_all: "Всички инструменти", mission_bilder: "Изображения & Дизайн", mission_bilder_sub: "Лого · Марка · Снимки · UI",
    mission_text: "Текст & Писане", mission_text_sub: "Блог · Имейл · Социални · Copy",
    mission_coding: "Код & Автоматизация", mission_coding_sub: "Кодиране · Агенти · APIs · CLI",
    mission_research: "Изследване & Анализ", mission_research_sub: "PDFs · Данни · Търсене · RAG",
    hosting_all: "Без значение", hosting_all_desc: "Показване на всички инструменти",
    hosting_eu: "ЕС / GDPR", hosting_eu_desc: "Сървъри в Европа, съответстващи на GDPR",
    hosting_local: "Само локално", hosting_local_desc: "Работи на вашето устройство, без облак",
    data_row: "☁️ Къде остават данните ви?", reset: "✕ нулиране",
    no_tools: "Не са намерени подходящи инструменти.", filter_reset: "Нулиране на филтрите",
    glossary_btn: "📖 AI термини просто обяснени",
    privacy_title: "🖥️ Къде работи AI моделът — и какво означава това за вашите данни?",
    local_title: "Локално", local_sub: "Собствен компютър", us_title: "US Облак", us_sub: "Сървъри в САЩ", eu_title: "ЕС Облак", eu_sub: "Сървъри в Европа",
    privacy_note: "Самият модел често е еднакъв — разликата е къде работи и кой има достъп до вашите данни.",
  },
  da: {
    title: "AI Guide 2026", sub: "Hvad vil du gøre — og hvor skal dine data blive?",
    mission_all: "Alle værktøjer", mission_bilder: "Billeder & Design", mission_bilder_sub: "Logo · Brand · Fotos · UI",
    mission_text: "Tekst & Skrivning", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Kode & Automatisering", mission_coding_sub: "Kodning · Agenter · APIs · CLI",
    mission_research: "Forskning & Analyse", mission_research_sub: "PDFs · Data · Søgning · RAG",
    hosting_all: "Lige meget", hosting_all_desc: "Vis alle værktøjer",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Servere i Europa, GDPR-konforme",
    hosting_local: "Kun lokalt", hosting_local_desc: "Kører på din enhed, intet cloud",
    data_row: "☁️ Hvor bliver dine data?", reset: "✕ nulstil",
    no_tools: "Ingen matchende værktøjer fundet.", filter_reset: "Nulstil filtre",
    glossary_btn: "📖 AI-begreber enkelt forklaret",
    privacy_title: "🖥️ Hvor kører AI-modellen — og hvad betyder det for dine data?",
    local_title: "Lokalt", local_sub: "Din egen computer", us_title: "US Cloud", us_sub: "Servere i USA", eu_title: "EU Cloud", eu_sub: "Servere i Europa",
    privacy_note: "Selve modellen er ofte den samme — forskellen er, hvor den kører, og hvem der har adgang til dine data.",
  },
  fi: {
    title: "AI Opas 2026", sub: "Mitä haluat tehdä — ja missä tietojesi pitää pysyä?",
    mission_all: "Kaikki työkalut", mission_bilder: "Kuvat & Design", mission_bilder_sub: "Logo · Brändi · Kuvat · UI",
    mission_text: "Teksti & Kirjoittaminen", mission_text_sub: "Blogi · Sähköposti · Some · Copy",
    mission_coding: "Koodi & Automaatio", mission_coding_sub: "Koodaus · Agentit · APIs · CLI",
    mission_research: "Tutkimus & Analyysi", mission_research_sub: "PDFs · Data · Haku · RAG",
    hosting_all: "Ei väliä", hosting_all_desc: "Näytä kaikki työkalut",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Palvelimet Euroopassa, GDPR-yhteensopiva",
    hosting_local: "Vain paikallinen", hosting_local_desc: "Toimii laitteellasi, ei pilveä",
    data_row: "☁️ Missä tietosi pysyvät?", reset: "✕ nollaa",
    no_tools: "Sopivia työkaluja ei löydy.", filter_reset: "Nollaa suodattimet",
    glossary_btn: "📖 AI-termit yksinkertaisesti selitetty",
    privacy_title: "🖥️ Missä AI-malli toimii — ja mitä se tarkoittaa tiedoillesi?",
    local_title: "Paikallinen", local_sub: "Oma tietokone", us_title: "US Pilvi", us_sub: "Palvelimet USA:ssa", eu_title: "EU Pilvi", eu_sub: "Palvelimet Euroopassa",
    privacy_note: "Malli itsessään on usein sama — ero on siinä, missä se toimii ja kenellä on pääsy syötteisiisi.",
  },
  hr: {
    title: "AI Vodič 2026", sub: "Što želite raditi — i gdje trebaju ostati vaši podaci?",
    mission_all: "Svi alati", mission_bilder: "Slike & Dizajn", mission_bilder_sub: "Logo · Brand · Fotografije · UI",
    mission_text: "Tekst & Pisanje", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Kod & Automatizacija", mission_coding_sub: "Kodiranje · Agenti · APIs · CLI",
    mission_research: "Istraživanje & Analiza", mission_research_sub: "PDFs · Podaci · Pretraga · RAG",
    hosting_all: "Svejedno", hosting_all_desc: "Prikaži sve alate",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Poslužitelji u Europi, GDPR-kompatibilni",
    hosting_local: "Samo lokalno", hosting_local_desc: "Radi na vašem uređaju, bez clouda",
    data_row: "☁️ Gdje ostaju vaši podaci?", reset: "✕ poništi",
    no_tools: "Nisu pronađeni odgovarajući alati.", filter_reset: "Poništi filtre",
    glossary_btn: "📖 AI pojmovi jednostavno objašnjeni",
    privacy_title: "🖥️ Gdje se pokreće AI model — i što to znači za vaše podatke?",
    local_title: "Lokalno", local_sub: "Vlastito računalo", us_title: "US Cloud", us_sub: "Poslužitelji u SAD-u", eu_title: "EU Cloud", eu_sub: "Poslužitelji u Europi",
    privacy_note: "Sam model je često isti — razlika je u tome gdje se pokreće i tko ima pristup vašim podacima.",
  },
  el: {
    title: "Οδηγός ΑΙ 2026", sub: "Τι θέλετε να κάνετε — και πού πρέπει να παραμείνουν τα δεδομένα σας;",
    mission_all: "Όλα τα εργαλεία", mission_bilder: "Εικόνες & Σχεδιασμός", mission_bilder_sub: "Λογότυπο · Μάρκα · Φωτογραφίες · UI",
    mission_text: "Κείμενο & Γραφή", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Κώδικας & Αυτοματισμός", mission_coding_sub: "Κωδικοποίηση · Πράκτορες · APIs · CLI",
    mission_research: "Έρευνα & Ανάλυση", mission_research_sub: "PDFs · Δεδομένα · Αναζήτηση · RAG",
    hosting_all: "Δεν έχει σημασία", hosting_all_desc: "Εμφάνιση όλων των εργαλείων",
    hosting_eu: "ΕΕ / GDPR", hosting_eu_desc: "Διακομιστές στην Ευρώπη, συμβατοί με GDPR",
    hosting_local: "Μόνο τοπικά", hosting_local_desc: "Τρέχει στη συσκευή σας, χωρίς cloud",
    data_row: "☁️ Πού παραμένουν τα δεδομένα σας;", reset: "✕ επαναφορά",
    no_tools: "Δεν βρέθηκαν κατάλληλα εργαλεία.", filter_reset: "Επαναφορά φίλτρων",
    glossary_btn: "📖 Όροι ΑΙ απλά εξηγημένοι",
    privacy_title: "🖥️ Πού τρέχει το μοντέλο ΑΙ — και τι σημαίνει για τα δεδομένα σας;",
    local_title: "Τοπικά", local_sub: "Δικός σας υπολογιστής", us_title: "US Cloud", us_sub: "Διακομιστές στις ΗΠΑ", eu_title: "EU Cloud", eu_sub: "Διακομιστές στην Ευρώπη",
    privacy_note: "Το ίδιο το μοντέλο είναι συχνά το ίδιο — η διαφορά είναι πού τρέχει και ποιος έχει πρόσβαση στα δεδομένα σας.",
  },
  lt: {
    title: "DI Vadovas 2026", sub: "Ką norite daryti — ir kur turi likti jūsų duomenys?",
    mission_all: "Visi įrankiai", mission_bilder: "Vaizdai & Dizainas", mission_bilder_sub: "Logotipas · Prekės ženklas · Nuotraukos · UI",
    mission_text: "Tekstas & Rašymas", mission_text_sub: "Tinklaraštis · El. paštas · Social · Copy",
    mission_coding: "Kodas & Automatizacija", mission_coding_sub: "Kodavimas · Agentai · APIs · CLI",
    mission_research: "Tyrimas & Analizė", mission_research_sub: "PDFs · Duomenys · Paieška · RAG",
    hosting_all: "Nesvarbu", hosting_all_desc: "Rodyti visus įrankius",
    hosting_eu: "ES / BDAR", hosting_eu_desc: "Serveriai Europoje, atitinka BDAR",
    hosting_local: "Tik vietiniai", hosting_local_desc: "Veikia jūsų įrenginyje, be debesijos",
    data_row: "☁️ Kur lieka jūsų duomenys?", reset: "✕ atstatyti",
    no_tools: "Nerasta tinkamų įrankių.", filter_reset: "Atstatyti filtrus",
    glossary_btn: "📖 DI sąvokos paprastai paaiškintos",
    privacy_title: "🖥️ Kur veikia DI modelis — ir ką tai reiškia jūsų duomenims?",
    local_title: "Vietinis", local_sub: "Jūsų kompiuteris", us_title: "JAV debesija", us_sub: "Serveriai JAV", eu_title: "ES debesija", eu_sub: "Serveriai Europoje",
    privacy_note: "Pats modelis dažnai yra tas pats — skirtumas yra kur jis veikia ir kas turi prieigą prie jūsų duomenų.",
  },
  lv: {
    title: "AI Ceļvedis 2026", sub: "Ko vēlaties darīt — un kur jāpaliek jūsu datiem?",
    mission_all: "Visi rīki", mission_bilder: "Attēli & Dizains", mission_bilder_sub: "Logo · Zīmols · Fotogrāfijas · UI",
    mission_text: "Teksts & Rakstīšana", mission_text_sub: "Blogs · E-pasts · Social · Copy",
    mission_coding: "Kods & Automatizācija", mission_coding_sub: "Kodēšana · Aģenti · APIs · CLI",
    mission_research: "Pētījumi & Analīze", mission_research_sub: "PDFs · Dati · Meklēšana · RAG",
    hosting_all: "Nav svarīgi", hosting_all_desc: "Rādīt visus rīkus",
    hosting_eu: "ES / GDPR", hosting_eu_desc: "Serveri Eiropā, GDPR-saderīgi",
    hosting_local: "Tikai lokāli", hosting_local_desc: "Darbojas jūsu ierīcē, bez mākoņa",
    data_row: "☁️ Kur paliek jūsu dati?", reset: "✕ atiestatīt",
    no_tools: "Nav atrasti atbilstoši rīki.", filter_reset: "Atiestatīt filtrus",
    glossary_btn: "📖 AI termini vienkārši izskaidroti",
    privacy_title: "🖥️ Kur darbojas AI modelis — un ko tas nozīmē jūsu datiem?",
    local_title: "Lokāli", local_sub: "Savs dators", us_title: "ASV mākonis", us_sub: "Serveri ASV", eu_title: "ES mākonis", eu_sub: "Serveri Eiropā",
    privacy_note: "Pats modelis bieži ir vienāds — atšķirība ir tajā, kur tas darbojas un kam ir piekļuve jūsu datiem.",
  },
  et: {
    title: "AI Juhend 2026", sub: "Mida soovite teha — ja kus peavad teie andmed jääma?",
    mission_all: "Kõik tööriistad", mission_bilder: "Pildid & Disain", mission_bilder_sub: "Logo · Bränd · Fotod · UI",
    mission_text: "Tekst & Kirjutamine", mission_text_sub: "Blogi · E-post · Sotsiaalmeedia · Copy",
    mission_coding: "Kood & Automatiseerimine", mission_coding_sub: "Kodeerimine · Agendid · APIs · CLI",
    mission_research: "Uurimine & Analüüs", mission_research_sub: "PDFs · Andmed · Otsing · RAG",
    hosting_all: "Pole oluline", hosting_all_desc: "Näita kõiki tööriistu",
    hosting_eu: "EL / GDPR", hosting_eu_desc: "Serverid Euroopas, GDPR-ühilduv",
    hosting_local: "Ainult kohalik", hosting_local_desc: "Töötab teie seadmel, pilv puudub",
    data_row: "☁️ Kus jäävad teie andmed?", reset: "✕ lähtesta",
    no_tools: "Sobivaid tööriistu ei leitud.", filter_reset: "Lähtesta filtrid",
    glossary_btn: "📖 AI mõisted lihtsalt selgitatud",
    privacy_title: "🖥️ Kus töötab AI mudel — ja mida see tähendab teie andmete jaoks?",
    local_title: "Kohalik", local_sub: "Oma arvuti", us_title: "USA pilv", us_sub: "Serverid USA-s", eu_title: "EL pilv", eu_sub: "Serverid Euroopas",
    privacy_note: "Mudel ise on sageli sama — erinevus on selles, kus see töötab ja kellel on juurdepääs teie andmetele.",
  },
  sl: {
    title: "AI Vodnik 2026", sub: "Kaj želite narediti — in kje morajo ostati vaši podatki?",
    mission_all: "Vsa orodja", mission_bilder: "Slike & Oblikovanje", mission_bilder_sub: "Logo · Znamka · Fotografije · UI",
    mission_text: "Besedilo & Pisanje", mission_text_sub: "Blog · E-pošta · Social · Copy",
    mission_coding: "Koda & Avtomatizacija", mission_coding_sub: "Kodiranje · Agenti · APIs · CLI",
    mission_research: "Raziskovanje & Analiza", mission_research_sub: "PDFs · Podatki · Iskanje · RAG",
    hosting_all: "Vseeno", hosting_all_desc: "Pokaži vsa orodja",
    hosting_eu: "EU / GDPR", hosting_eu_desc: "Strežniki v Evropi, skladni z GDPR",
    hosting_local: "Samo lokalno", hosting_local_desc: "Deluje na vaši napravi, brez oblaka",
    data_row: "☁️ Kje ostanejo vaši podatki?", reset: "✕ ponastavi",
    no_tools: "Ni ustreznih orodij.", filter_reset: "Ponastavi filtre",
    glossary_btn: "📖 AI izrazi preprosto pojasnjeni",
    privacy_title: "🖥️ Kje deluje AI model — in kaj to pomeni za vaše podatke?",
    local_title: "Lokalno", local_sub: "Lastno računalo", us_title: "US Oblak", us_sub: "Strežniki v ZDA", eu_title: "EU Oblak", eu_sub: "Strežniki v Evropi",
    privacy_note: "Model sam je pogosto enak — razlika je v tem, kje deluje in kdo ima dostop do vaših podatkov.",
  },
  mt: {
    title: "Gwida AI 2026", sub: "X'trid tagħmel — u fejn għandhom jibqgħu d-data tiegħek?",
    mission_all: "L-għodod kollha", mission_bilder: "Immaġini & Disinn", mission_bilder_sub: "Logo · Brand · Ritratti · UI",
    mission_text: "Test & Kitba", mission_text_sub: "Blog · Email · Social · Copy",
    mission_coding: "Kodiċi & Awtomazzjoni", mission_coding_sub: "Kodifikazzjoni · Aġenti · APIs · CLI",
    mission_research: "Riċerka & Analiżi", mission_research_sub: "PDFs · Data · Tfittxija · RAG",
    hosting_all: "Ma jimpurtax", hosting_all_desc: "Uri l-għodod kollha",
    hosting_eu: "UE / GDPR", hosting_eu_desc: "Servers fl-Ewropa, konformi mal-GDPR",
    hosting_local: "Lokali biss", hosting_local_desc: "Jaħdem fuq l-apparat tiegħek, ebda cloud",
    data_row: "☁️ Fejn tibqa' d-data tiegħek?", reset: "✕ irrisetta",
    no_tools: "Ma nstab l-ebda għodda.", filter_reset: "Irrisetta l-filtri",
    glossary_btn: "📖 Termini AI spjegati sempliċement",
    privacy_title: "🖥️ Fejn jaħdem il-mudell AI — u x'ifisser dan għad-data tiegħek?",
    local_title: "Lokali", local_sub: "Il-kompjuter tiegħek", us_title: "US Cloud", us_sub: "Servers fl-USA", eu_title: "EU Cloud", eu_sub: "Servers fl-Ewropa",
    privacy_note: "Il-mudell innifsu huwa spiss l-istess — id-differenza hija fejn jaħdem u min għandu aċċess għad-data tiegħek.",
  },
  ga: {
    title: "Treoir AI 2026", sub: "Cad is mian leat a dhéanamh — agus cá háit ar cheart do chuid sonraí a fhanacht?",
    mission_all: "Gach uirlis", mission_bilder: "Íomhánna & Dearadh", mission_bilder_sub: "Lógó · Branda · Grianghraif · UI",
    mission_text: "Téacs & Scríbhneoireacht", mission_text_sub: "Blag · Ríomhphost · Sóisialta · Copy",
    mission_coding: "Cód & Uathoibriú", mission_coding_sub: "Códú · Gníomhairí · APIs · CLI",
    mission_research: "Taighde & Anailís", mission_research_sub: "PDFanna · Sonraí · Cuardach · RAG",
    hosting_all: "Cuma", hosting_all_desc: "Taispeáin gach uirlis",
    hosting_eu: "AE / GDPR", hosting_eu_desc: "Freastalaithe san Eoraip, comhoiriúnach le GDPR",
    hosting_local: "Áitiúil amháin", hosting_local_desc: "Ritheann ar do ghléas, gan néal",
    data_row: "☁️ Cá bhfanann do chuid sonraí?", reset: "✕ athshocraigh",
    no_tools: "Níor aimsíodh uirlisí oiriúnacha.", filter_reset: "Athshocraigh scagairí",
    glossary_btn: "📖 Téarmaí AI mínithe go simplí",
    privacy_title: "🖥️ Cá ritheann an múnla AI — agus cad a chiallaíonn sin do do chuid sonraí?",
    local_title: "Áitiúil", local_sub: "Do ríomhaire féin", us_title: "Néal SAM", us_sub: "Freastalaithe sna SAM", eu_title: "Néal AE", eu_sub: "Freastalaithe san Eoraip",
    privacy_note: "Is minic an múnla féin mar a chéile — is é an difríocht ná cá ritheann sé agus cé a bhfuil rochtain aige ar do chuid sonraí.",
  },
};

// ─── Filter options ──────────────────────────────────────────────────────────
function getMissions(t: typeof KI_UI[string]) {
  return [
    { id: "all"      as MissionId, label: t.mission_all,      icon: "✨", sub: "" },
    { id: "bilder"   as MissionId, label: t.mission_bilder,   icon: "🎨", sub: t.mission_bilder_sub },
    { id: "text"     as MissionId, label: t.mission_text,     icon: "✍️", sub: t.mission_text_sub },
    { id: "coding"   as MissionId, label: t.mission_coding,   icon: "💻", sub: t.mission_coding_sub },
    { id: "research" as MissionId, label: t.mission_research, icon: "🔍", sub: t.mission_research_sub },
  ];
}

function getHosting(t: typeof KI_UI[string]) {
  return [
    { id: "all"      as HostingId, label: t.hosting_all,   icon: "🌍", desc: t.hosting_all_desc },
    { id: "cloud-eu" as HostingId, label: t.hosting_eu,    icon: "🛡️", desc: t.hosting_eu_desc },
    { id: "lokal"    as HostingId, label: t.hosting_local, icon: "💻", desc: t.hosting_local_desc },
  ];
}

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

  const lang = getLang();
  const t = KI_UI[lang] || KI_UI["de"];
  const MISSIONS = getMissions(t);
  const HOSTING = getHosting(t);

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
            {t.title}
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "#3D526A" }}>
            {t.sub}
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
              {t.data_row}
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
                {t.reset}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── CARDS ────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8 space-y-4">
        {visibleCategories.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#5A7A96" }}>
            <p className="text-lg mb-3">{t.no_tools}</p>
            <button
              onClick={() => { setMission("all"); setHosting("all"); }}
              className="text-sm underline hover:opacity-70 transition-opacity"
            >
              {t.filter_reset}
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
              {t.privacy_title}
            </h2>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: "💻",
                title: t.local_title,
                sub: t.local_sub,
                pros: lang === "de"
                  ? ["Daten verlassen nie dein Gerät", "Kein Abo, keine API-Kosten"]
                  : lang === "en"
                  ? ["Data never leaves your device", "No subscription, no API costs"]
                  : lang === "fr"
                  ? ["Les données ne quittent jamais votre appareil", "Pas d'abonnement, pas de coûts API"]
                  : lang === "es"
                  ? ["Los datos nunca salen de tu dispositivo", "Sin suscripción, sin costos de API"]
                  : ["Data never leaves your device", "No subscription, no API costs"],
                cons: lang === "de"
                  ? ["Braucht starke GPU & viel RAM", "Kleinere Modelle = weniger Präzision"]
                  : lang === "en"
                  ? ["Needs strong GPU & lots of RAM", "Smaller models = less precision"]
                  : lang === "fr"
                  ? ["Nécessite un GPU puissant et beaucoup de RAM", "Modèles plus petits = moins de précision"]
                  : lang === "es"
                  ? ["Necesita GPU potente y mucha RAM", "Modelos más pequeños = menos precisión"]
                  : ["Needs strong GPU & lots of RAM", "Smaller models = less precision"],
                examples: ["Llama 3", "DeepSeek", "Ollama"],
                borderColor: "rgba(100,116,139,0.45)",
                bg: "rgba(100,116,139,0.12)",
              },
              {
                icon: "🇺🇸",
                title: t.us_title,
                sub: t.us_sub,
                pros: lang === "de"
                  ? ["Stärkste Modelle (GPT-4o, Claude, Gemini)", "Sofort nutzbar, kein Setup"]
                  : lang === "en"
                  ? ["Strongest models (GPT-4o, Claude, Gemini)", "Ready instantly, no setup"]
                  : lang === "fr"
                  ? ["Modèles les plus puissants (GPT-4o, Claude, Gemini)", "Utilisable immédiatement, aucune config"]
                  : lang === "es"
                  ? ["Modelos más potentes (GPT-4o, Claude, Gemini)", "Disponible al instante, sin configuración"]
                  : ["Strongest models (GPT-4o, Claude, Gemini)", "Ready instantly, no setup"],
                cons: lang === "de"
                  ? ["Daten unterliegen US-Recht / Patriot Act", "DSGVO-Konformität schwierig"]
                  : lang === "en"
                  ? ["Data subject to US law / Patriot Act", "GDPR compliance difficult"]
                  : lang === "fr"
                  ? ["Données soumises au droit américain / Patriot Act", "Conformité RGPD difficile"]
                  : lang === "es"
                  ? ["Datos sujetos a ley estadounidense / Patriot Act", "Cumplimiento RGPD difícil"]
                  : ["Data subject to US law / Patriot Act", "GDPR compliance difficult"],
                examples: ["ChatGPT", "Claude.ai", "Gemini"],
                borderColor: "rgba(59,130,246,0.40)",
                bg: "rgba(59,130,246,0.10)",
              },
              {
                icon: "🇪🇺",
                title: t.eu_title,
                sub: t.eu_sub,
                pros: lang === "de"
                  ? ["DSGVO-konform", "Kein US-Recht / Patriot Act"]
                  : lang === "en"
                  ? ["GDPR-compliant", "No US law / Patriot Act"]
                  : lang === "fr"
                  ? ["Conforme au RGPD", "Pas de droit américain / Patriot Act"]
                  : lang === "es"
                  ? ["Conforme con RGPD", "Sin ley estadounidense / Patriot Act"]
                  : ["GDPR-compliant", "No US law / Patriot Act"],
                cons: lang === "de"
                  ? ["Modelle teils etwas schwächer", "Weniger Auswahl"]
                  : lang === "en"
                  ? ["Models sometimes slightly weaker", "Less choice"]
                  : lang === "fr"
                  ? ["Modèles parfois légèrement moins puissants", "Moins de choix"]
                  : lang === "es"
                  ? ["Modelos a veces algo menos potentes", "Menos opciones"]
                  : ["Models sometimes slightly weaker", "Less choice"],
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
              {t.privacy_note}
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
          <span className="font-semibold text-white/75 text-sm">{t.glossary_btn}</span>
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
