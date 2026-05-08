/**
 * TDD — index.html integrity
 * Run: node --test tests/index.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const html  = readFileSync(path.join(__dir, "../index.html"), "utf8");

// ── Forbidden phrases ────────────────────────────────────────────────────────
describe("index.html — no forbidden phrases", () => {
  it("contains no 'pilot project' claims", () => {
    assert.ok(!/pilot project/i.test(html), "Found 'pilot project' in index.html");
  });
  it("contains no 'already running' claims", () => {
    assert.ok(!/already running/i.test(html), "Found 'already running' in index.html");
  });
  it("contains no 'Pilotprojekte' claims", () => {
    assert.ok(!/Pilotprojekte/i.test(html), "Found 'Pilotprojekte' in index.html");
  });
});

// ── Skills section ───────────────────────────────────────────────────────────
describe("index.html — skills section", () => {
  it("has a #skills-list container", () => {
    assert.ok(html.includes('id="skills-list"'), "Missing #skills-list");
  });
  it("buildSkills opens the first skill by default (i === 0)", () => {
    // The buildSkills template appends ' open' to the className when i === 0.
    // Look for the conditional rather than the concatenated literal.
    assert.ok(
      /i\s*===\s*0\s*\?\s*['"`]\s*open\s*['"`]/.test(html),
      "First skill item must conditionally receive the 'open' class on i===0"
    );
  });
  it(".skill-item.open .skill-body is display:block", () => {
    const openBody = html.match(/\.skill-item\.open\s+\.skill-body\s*\{[^}]*display\s*:\s*(\w+)/);
    assert.ok(openBody, "Could not find .skill-item.open .skill-body CSS rule");
    assert.equal(openBody[1], "block", ".skill-item.open .skill-body must be display:block");
  });
});

// ── Past events ──────────────────────────────────────────────────────────────
describe("index.html — past event card", () => {
  it("links to /march-event/", () => {
    assert.ok(html.includes('href="/march-event/"'), "Missing link to /march-event/");
  });
  it("shows Europa 2041 title in past events", () => {
    assert.ok(html.includes("Europa 2041"), "Missing Europa 2041 in past events");
  });
  it("date is in DE format, not US format", () => {
    assert.ok(!/Mar 25, 2026/.test(html), "US date format still present");
    assert.ok(/25\.\s*März\s*2026/.test(html), "DE date format missing");
  });
  it("location reads 'München', not 'Munich, Germany'", () => {
    assert.ok(!/Munich,\s*Germany/.test(html), "English location string still present");
  });
});

// ── locales.js loaded ────────────────────────────────────────────────────────
describe("index.html — script loading", () => {
  it("loads locales.js", () => {
    assert.ok(html.includes('src="/locales.js"'), "locales.js not loaded");
  });
  it("calls applyLocale on init", () => {
    assert.ok(html.includes("applyLocale"), "applyLocale not called");
  });
  it("standalone europa-feature banner is removed", () => {
    assert.ok(!html.includes('class="europa-feature"'), "europa-feature banner still present — should be deleted");
  });
});

// ── Hero (HNWI pass) ─────────────────────────────────────────────────────────
describe("index.html — hero", () => {
  it("hero CTA points to #events (not directly to Stripe)", () => {
    const m = html.match(/<a[^>]*class="[^"]*hero-cta[^"]*"[^>]*>/);
    assert.ok(m, "hero-cta link not found");
    assert.ok(/href="#events"/.test(m[0]), `Expected hero CTA href="#events", got: ${m[0]}`);
  });
  it("hero contains alumni signal under CTA", () => {
    assert.ok(/class="hero-alumni"/.test(html), ".hero-alumni element missing");
    assert.ok(/Unsere bisherigen Runden vereinten Entscheidungsträger:innen/.test(html),
      "Hero alumni line text missing or not the new sector framing");
  });
  it("alumni line uses sector framing (Wirtschaft/Agenturen/Medien/Wissenschaft/Politik)", () => {
    const m = html.match(/<p class="hero-alumni"[^>]*>([^<]+)<\/p>/);
    assert.ok(m, "hero-alumni paragraph not found");
    const sectors = ["Wirtschaft", "Agenturen", "Medien", "Wissenschaft", "Politik"];
    for (const s of sectors) {
      assert.ok(m[1].includes(s), `Alumni line missing sector: ${s}`);
    }
    assert.ok(/Entscheidungsträger:innen/.test(m[1]),
      "Alumni line should frame audience as 'Entscheidungsträger:innen'");
  });
  it("alumni line is data-i18n tagged (so it switches with locale)", () => {
    const m = html.match(/<p class="hero-alumni"[^>]*>/);
    assert.ok(m, "hero-alumni element missing");
    assert.ok(/data-i18n="hero_alumni"/.test(m[0]),
      "hero-alumni must carry data-i18n=\"hero_alumni\"");
  });

  it("hero contains italic strapline below H1 (HNWI signal)", () => {
    assert.ok(/class="hero-strapline"/.test(html), ".hero-strapline element missing");
    assert.ok(/data-i18n="hero_strapline"/.test(html), "hero_strapline must be data-i18n tagged");
  });
  it("manifesto items use <strong> for scannability (≥1 bold per list item)", () => {
    // Extract ol block in the manifesto and count <strong> occurrences per <li>
    const ol = html.match(/<section class="manifesto"[^>]*>[\s\S]*?<\/section>/);
    assert.ok(ol, "manifesto section not found");
    const lis = Array.from(ol[0].matchAll(/<li>([\s\S]*?)<\/li>/g));
    assert.ok(lis.length >= 3, `Expected at least 3 manifesto list items, got ${lis.length}`);
    for (const [i, li] of lis.entries()) {
      const strongs = (li[1].match(/<strong>/g) || []).length;
      assert.ok(strongs >= 1, `Manifesto item ${i + 1} has no <strong> emphasis`);
    }
  });
});

// ── FAQ order (trust first) ──────────────────────────────────────────────────
describe("index.html — FAQ order", () => {
  const summaries = Array.from(html.matchAll(/<details class="faq-item">\s*<summary>([^<]+)<\/summary>/g))
    .map((m) => m[1].trim());

  it("first FAQ asks who is behind the salon (trust first)", () => {
    assert.ok(summaries.length > 0, "No FAQ items found");
    assert.match(summaries[0], /Wer steht hinter/i,
      `Expected trust question first; got: "${summaries[0]}"`);
  });
  it("second FAQ asks what differentiates the salon", () => {
    assert.match(summaries[1], /unterscheidet/i,
      `Expected differentiation question second; got: "${summaries[1]}"`);
  });
  it("third FAQ surfaces the March-Salon outcome", () => {
    assert.match(summaries[2], /März-Salon/i,
      `Expected März-Salon proof third; got: "${summaries[2]}"`);
  });
});

// ── Default language hardening ───────────────────────────────────────────────
describe("index.html — language init", () => {
  it("language switcher is visible (users can change language)", () => {
    assert.ok(!/#lang-switcher\s*\{\s*display:\s*none/.test(html),
      "#lang-switcher should NOT be display:none — users must be able to switch languages");
    assert.ok(/<div id="lang-switcher">/.test(html),
      "Language switcher container missing from HTML");
  });
  it("init script reads localStorage first, then browser language, then DE fallback", () => {
    assert.ok(/localStorage\.getItem\(['"]salonai_lang['"]\)/.test(html),
      "Init must read salonai_lang from localStorage");
    assert.ok(/navigator\.languages\s*&&\s*navigator\.languages\[0\]/.test(html),
      "Init must auto-detect from navigator.languages");
    // Final fallback must end at 'de', not 'en'
    assert.ok(/['"]de['"]/.test(html.split("LANGUAGE INIT")[1] || ""),
      "DE fallback must be present in init script");
    assert.ok(!/applyLocale\(\s*['"]en['"]\s*\)/.test(html),
      "Should not hardcode applyLocale('en')");
  });
});
