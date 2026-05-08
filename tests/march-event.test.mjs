/**
 * TDD — march-event/index.html integrity (editorial rewrite)
 * Run: node --test tests/march-event.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const html  = readFileSync(path.join(__dir, "../march-event/index.html"), "utf8");

describe("march-event — editorial rewrite (no card grid)", () => {
  it("dropped the old card-icon emoji blocks", () => {
    assert.ok(!/class="card-icon"/.test(html),
      "Old .card-icon emoji blocks still present");
  });
  it("dropped the old colorful card variants (card-navy / card-gold)", () => {
    assert.ok(!/class="card[^"]*card-navy"/.test(html),
      "card-navy variant still present");
    assert.ok(!/class="card[^"]*card-gold"/.test(html),
      "card-gold variant still present");
  });
  it("uses the editorial paper / ink palette", () => {
    assert.ok(/--paper:\s*#F8F5EE/.test(html), "Cream paper background missing");
    assert.ok(/--ink-deep:\s*#0F1E33/.test(html), "Ink-deep token missing");
  });
  it("dropped the Outfit font (now uses DM Sans + Playfair like the main site)", () => {
    assert.ok(!/family=Outfit/.test(html), "Outfit font still loaded");
    assert.ok(/family=Playfair\+Display/.test(html), "Playfair Display missing");
    assert.ok(/family=DM\+Sans/.test(html) || /DM\+Sans/.test(html), "DM Sans missing");
  });
});

describe("march-event — editorial structure", () => {
  it("has a single-column article body (max-width 680px)", () => {
    assert.ok(/article\.body[\s\S]*?max-width:\s*680px/.test(html),
      "Single-column article.body width missing");
  });
  it("has numbered idea entries (1.–13.) — Liquid Democracy moved out", () => {
    const ideaNums = Array.from(html.matchAll(/<span class="idea-num">(\d+)\.<\/span>/g))
      .map((m) => Number(m[1]));
    assert.ok(ideaNums.length >= 13, `Expected at least 13 numbered ideas, got ${ideaNums.length}`);
    assert.ok(ideaNums.includes(1) && ideaNums.includes(13),
      "Idea numbering should span 1–13");
  });
  it("does NOT contain Liquid Democracy / EU–INC chapter (moved to workshop-references.md)", () => {
    assert.ok(!/id="liquid"/.test(html), "Chapter V (Liquid Democracy) should be removed");
    assert.ok(!/EU–INC: Wie ein Bürger/.test(html),
      "EU-INC case study should be removed (moved to workshop-references.md)");
  });
});

describe("march-event — language switcher disabled (DE-only)", () => {
  it("language switcher is hidden via display:none", () => {
    assert.ok(/#lang-switcher-m\s*\{\s*display:\s*none/.test(html) || !/#lang-switcher-m/.test(html),
      "march-event language switcher should be hidden in DE-only mode");
  });
});

describe("march-event — footer wording", () => {
  it("uses 'Entstanden am Salon AI Dinner' (not 'Entwickelt')", () => {
    assert.ok(!/Entwickelt beim Salon AI Dinner/.test(html), "Old 'Entwickelt' wording still present");
    assert.ok(/Entstanden am Salon AI Dinner/.test(html), "New 'Entstanden' wording missing");
  });
  it("host credit reads '15+ Jahre KI bei Amazon, Writer, SoundCloud'", () => {
    assert.ok(/15\+\s*Jahre\s*KI\s*bei\s*Amazon, Writer, SoundCloud/.test(html),
      "Host bio should lead with the AI-experience signal");
  });
});

describe("march-event — no leftover emojis in headings", () => {
  it("does not contain decorative emojis like 🎯 / 🔑 / 📍", () => {
    assert.ok(!/🎯|🔑|📍/.test(html), "Decorative summary-box emojis still present");
  });
});

describe(`${import.meta.url.split('/').pop()} — Google Analytics`, () => {
  it("loads gtag.js asynchronously", () => {
    assert.ok(
      /src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-L2RZV4QPFD"/.test(html),
      "Google Analytics gtag.js script tag missing"
    );
    assert.ok(/<script async/.test(html), "GA script tag should be loaded async");
  });
  it("calls gtag('config', ...) with the property ID", () => {
    assert.ok(
      /gtag\(\s*['"]config['"]\s*,\s*['"]G-L2RZV4QPFD['"]\s*\)/.test(html),
      "gtag('config', 'G-L2RZV4QPFD') call missing"
    );
  });
});
