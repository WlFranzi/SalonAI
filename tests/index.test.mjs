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
  it("buildSkills renders items with .open class by default", () => {
    assert.ok(html.includes('"skill-item open"') || html.includes("'skill-item open'") || html.includes("skill-item open"),
      "First skill item must default to open");
  });
  it("skill-body is visible by default (not display:none)", () => {
    // The rule '.skill-body { display: block }' must come before any override
    const bodyRule = html.match(/\.skill-body\s*\{[^}]*display\s*:\s*(\w+)/);
    assert.ok(bodyRule, "Could not find .skill-body CSS rule");
    assert.equal(bodyRule[1], "block", ".skill-body default must be display:block");
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
