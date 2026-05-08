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
  it("all skill items render closed by default (no .open class on first paint)", () => {
    // No conditional that pre-opens the first skill; all closed until user clicks.
    assert.ok(
      !/i\s*===\s*0\s*\?\s*['"`]\s*open\s*['"`]/.test(html),
      "Skill items should NOT auto-open the first card"
    );
    assert.ok(
      !/skill-item\s+open/.test(html),
      "No .skill-item should have .open as a literal default class"
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

// ── Mobile-first layout patterns ─────────────────────────────────────────────
describe("index.html — mobile-first responsive patterns", () => {
  // Each layout block should default to a single-column / stacked layout
  // and use min-width media queries to enhance for larger viewports.
  // .manifesto ol is no longer a multi-col grid (editorial single-column with
  // numbered Roman-numeral anchors); it's not part of this responsive check.
  const containers = [
    { selector: ".stats-inner",   minBreakpoint: 768 },
    { selector: ".two-col",       minBreakpoint: 800 },
    { selector: ".testimonials",  minBreakpoint: 720 },
    { selector: ".skill-cols",    minBreakpoint: 620 },
  ];

  for (const { selector, minBreakpoint } of containers) {
    it(`${selector} defaults to grid-template-columns: 1fr (mobile-first)`, () => {
      // Find the rule and verify default grid-template-columns is 1fr (or single column)
      const escaped = selector.replace(/\./g, "\\.").replace(/\s+/g, "\\s+");
      const re = new RegExp(`${escaped}\\s*\\{[^}]*grid-template-columns:\\s*1fr`);
      assert.ok(re.test(html), `${selector} default must be grid-template-columns: 1fr`);
    });
    it(`${selector} enhances at min-width: ${minBreakpoint}px`, () => {
      const re = new RegExp(`@media\\s*\\(min-width:\\s*${minBreakpoint}px\\)`);
      assert.ok(re.test(html), `Missing min-width: ${minBreakpoint}px enhancement for ${selector}`);
    });
  }

  it("hero uses min-height-friendly mobile padding (≤56px top default)", () => {
    // The base .hero rule should not start with the desktop 88px padding.
    const heroRule = html.match(/\.hero\s*\{[^}]*padding:\s*([^;]+);/);
    assert.ok(heroRule, ".hero rule with padding not found");
    assert.ok(!/^88px/.test(heroRule[1].trim()),
      "Hero must not default to desktop 88px top padding");
  });

  it("hero CTA tap target is ≥44px tall on mobile (Apple HIG)", () => {
    const m = html.match(/\.hero-cta\s*\{[^}]*min-height:\s*(\d+)px/);
    assert.ok(m, ".hero-cta should declare min-height for mobile tap targets");
    assert.ok(Number(m[1]) >= 44, `min-height ${m[1]}px is below 44px tap-target minimum`);
  });

  it("layout containers don't pair with max-width fallback to 1fr", () => {
    // Catch the legacy desktop-first idiom for the *base* rules of these selectors.
    // The base rule is the first occurrence — must not declare repeat(N, 1fr).
    for (const sel of [".stats-inner", ".two-col", ".testimonials", ".skill-cols"]) {
      const escaped = sel.replace(/\./g, "\\.").replace(/\s+/g, "\\s+");
      const baseRuleRe = new RegExp(`(^|[^@\\)])\\s*${escaped}\\s*\\{[^}]+\\}`, "m");
      const m = html.match(baseRuleRe);
      assert.ok(m, `Base rule for ${sel} not found`);
      assert.ok(!/grid-template-columns:\s*repeat\(/.test(m[0]),
        `Base rule for ${sel} should not declare multi-column grid (mobile-first)`);
    }
  });
});

// ── Hero (HNWI pass) ─────────────────────────────────────────────────────────
describe("index.html — hero", () => {
  it("hero CTA points to #events (not directly to Stripe)", () => {
    const m = html.match(/<a[^>]*class="[^"]*hero-cta[^"]*"[^>]*>/);
    assert.ok(m, "hero-cta link not found");
    assert.ok(/href="#events"/.test(m[0]), `Expected hero CTA href="#events", got: ${m[0]}`);
  });
  it("hero is decluttered — no eyebrow-sub line", () => {
    const hero = html.match(/<section class="hero">[\s\S]*?<\/section>/);
    assert.ok(hero, "hero section not found");
    assert.ok(!/class="eyebrow-sub"/.test(hero[0]),
      "Hero must not contain eyebrow-sub line (declutter)");
  });
  it("alumni line is woven into the manifesto coda (no free-floating caption)", () => {
    const manifesto = html.match(/<section class="manifesto"[^>]*>[\s\S]*?<\/section>/);
    assert.ok(manifesto, "manifesto section not found");
    assert.ok(/Entscheidungsträger:innen/.test(manifesto[0]),
      "Alumni sentence should live as part of the manifesto-coda");
    assert.ok(!/class="alumni-caption"/.test(html),
      "Standalone .alumni-caption should be removed");
  });

  it("hero contains italic strapline below H1 (HNWI signal)", () => {
    assert.ok(/class="hero-strapline"/.test(html), ".hero-strapline element missing");
    assert.ok(/data-i18n="hero_strapline"/.test(html), "hero_strapline must be data-i18n tagged");
  });
  it("manifesto items are calm — no inline <strong> in lede/list (coda allowed for audience attestation)", () => {
    const manifesto = html.match(/<section class="manifesto"[^>]*>([\s\S]*?)<\/section>/);
    assert.ok(manifesto, "manifesto section not found");
    // Items + lede must stay clean
    const items = manifesto[1].match(/<ol[\s\S]*?<\/ol>/);
    assert.ok(items, "manifesto ol not found");
    assert.ok(!/<strong>/.test(items[0]), "Manifesto list items must not contain <strong>");
    const lede = manifesto[1].match(/class="manifesto-lede"[\s\S]*?<\/p>/);
    if (lede) {
      assert.ok(!/<strong>/.test(lede[0]), "Manifesto lede must not contain <strong>");
    }
  });
});

// ── FAQ order (trust first) ──────────────────────────────────────────────────
describe("index.html — FAQ order", () => {
  const summaries = Array.from(html.matchAll(/<details class="faq-item">\s*<summary[^>]*>([^<]+)<\/summary>/g))
    .map((m) => m[1].trim());

  it("first FAQ asks who hosts the salon (trust first)", () => {
    assert.ok(summaries.length > 0, "No FAQ items found");
    assert.match(summaries[0], /Wer (veranstaltet|steht hinter)/i,
      `Expected trust/host question first; got: "${summaries[0]}"`);
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
