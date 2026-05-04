/**
 * TDD — locales.js integrity
 * Run: node --test tests/locales.test.mjs
 *
 * RED: catches syntax errors, missing keys, forbidden phrases
 * GREEN: all constraints pass → safe to deploy
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const root  = path.resolve(__dir, "..");

// ── 0. Polyfill window for Node.js ──────────────────────────────────────────
// locales.js writes to window.LOCALES / window.applyLocale — Node has no window.
if (typeof globalThis.window === "undefined") {
  globalThis.window = globalThis;
}

// ── 1. Syntax check ─────────────────────────────────────────────────────────
describe("locales.js — syntax", () => {
  it("parses without errors", () => {
    // If this throws, the file has a JS syntax error (e.g. orphan comma)
    const require = createRequire(import.meta.url);
    assert.doesNotThrow(() => require(path.join(root, "locales.js")));
  });
});

// ── 2. Load LOCALES ──────────────────────────────────────────────────────────
const require = createRequire(import.meta.url);
require(path.join(root, "locales.js"));
const LOCALES = globalThis.LOCALES;

const EU_LANGS = [
  "en","de","fr","es","it","pt","nl","pl","ro","sv",
  "cs","hu","sk","bg","da","fi","hr","el","lt","lv",
  "et","sl","mt","ga",
];

const REQUIRED_KEYS = [
  "nav_cta","hero_eyebrow","hero_h1","skills_h2","skills_desc",
  "feature_desc","feature_cta","feature_eyebrow",
  "past_events","col_old","col_now","col_eu",
  "footer_tagline",
];

// ── 3. All 24 languages present ──────────────────────────────────────────────
describe("locales.js — all 24 EU languages present", () => {
  for (const lang of EU_LANGS) {
    it(`has "${lang}" block`, () => {
      assert.ok(LOCALES[lang], `Missing language block: ${lang}`);
    });
  }
});

// ── 4. Required keys in every language ──────────────────────────────────────
describe("locales.js — required keys in every language", () => {
  for (const lang of EU_LANGS) {
    for (const key of REQUIRED_KEYS) {
      it(`${lang}.${key} exists and is non-empty`, () => {
        const val = LOCALES[lang]?.[key];
        assert.ok(val && val.trim().length > 0, `${lang}.${key} is missing or empty`);
      });
    }
  }
});

// ── 5. Forbidden phrases — factual accuracy ──────────────────────────────────
describe("locales.js — no forbidden phrases", () => {
  const FORBIDDEN = [
    /pilot project/i,
    /pilotprojekt/i,
    /already running/i,
    /bereits.*pilot/i,
    /running as pilot/i,
  ];

  for (const lang of EU_LANGS) {
    it(`"${lang}" contains no pilot-project claims`, () => {
      const block = JSON.stringify(LOCALES[lang] ?? {});
      for (const pattern of FORBIDDEN) {
        assert.ok(!pattern.test(block), `${lang} contains forbidden phrase: ${pattern}`);
      }
    });
  }
});
