/**
 * TDD — Mai-stepbystepguide/index-vision.html
 * System-Map (Capstone-Recap): alle Agent-Komponenten in einem Bild.
 * Run: node --test tests/mai-vision-diagram.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const html  = readFileSync(path.join(__dir, "../Mai-stepbystepguide/index-vision.html"), "utf8");
const cheat = readFileSync(path.join(__dir, "../Mai-stepbystepguide/cheatsheet.html"), "utf8");

// Isolate the system-map section so the assertions can't be satisfied by
// stray matches elsewhere on the (large) page. Bound it to the next comment
// block (COMMITMENT-MOMENT …) rather than a fixed length.
const start = html.indexOf("SYSTEM-MAP");
const after = start === -1 ? -1 : html.indexOf("COMMITMENT-MOMENT", start);
const section = start === -1 ? "" : html.slice(start, after === -1 ? start + 12000 : after);

describe("index-vision.html — System-Map (alle Komponenten in einem Bild)", () => {
  it("the capstone system-map section exists", () => {
    assert.ok(start !== -1, "SYSTEM-MAP section marker not found");
    assert.ok(/Das ganze System · ein Bild/.test(section), "eyebrow headline missing");
  });

  it("shows all six components as labels", () => {
    for (const label of ["Sprachmodell", "Agent", "Memory", "Ablage", "Skill", "MCP"]) {
      assert.ok(
        new RegExp(`>${label}<`).test(section),
        `component label "${label}" missing from the diagram`
      );
    }
  });

  it("names the key roles (Kontext-Sauger · Anthropic-Cloud · Context-Synonym)", () => {
    assert.ok(/Kontext-Sauger/.test(section), "Agent role 'Kontext-Sauger' missing");
    assert.ok(/BEI ANTHROPIC GEHOSTET/.test(section), "Sprachmodell cloud-hosting note missing");
    assert.ok(/manchmal: Context/.test(section), "Ablage = Context synonym missing");
  });

  it("renders as an SVG line-art figure (not a raster image)", () => {
    assert.ok(/<svg[^>]*viewBox="0 0 880 600"/.test(section), "diagram SVG missing");
    assert.ok(/pencil-stroke/.test(section), "line-art (pencil-stroke) styling missing");
  });
});

describe("Workshop-Seiten — Google Analytics (gtag.js, G-L2RZV4QPFD)", () => {
  for (const [name, doc] of [["index-vision.html", html], ["cheatsheet.html", cheat]]) {
    it(`${name} loads gtag.js async`, () => {
      assert.ok(
        /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-L2RZV4QPFD"><\/script>/.test(doc),
        `${name}: async gtag.js script tag missing`
      );
    });
    it(`${name} configures the property ID`, () => {
      assert.ok(
        /gtag\(\s*['"]config['"]\s*,\s*['"]G-L2RZV4QPFD['"]\s*\)/.test(doc),
        `${name}: gtag('config', 'G-L2RZV4QPFD') call missing`
      );
    });
  }
});

describe("index-vision.html — I.2 interaktiver Prompt (Kontext live einfüllen)", () => {
  it("has the three context input fields", () => {
    for (const id of ["i2-fokus", "i2-entsch", "i2-engpass"]) {
      assert.ok(new RegExp(`id="${id}"`).test(html), `input field #${id} missing`);
    }
  });
  it("has the live-fill prompt card + render script", () => {
    assert.ok(/id="i2-prompt"/.test(html), "prompt card #i2-prompt missing");
    assert.ok(/getElementById\('i2-prompt'\)/.test(html), "live-fill render script missing");
  });
});

describe("index-vision.html — Use-Case-Karten (Akt II.4) entfernt", () => {
  for (const label of [
    "Use Case 1 · Task-Tracking",
    "Use Case 2 · Competitive Analysis",
    "Use Case 3 · People-Briefings",
  ]) {
    it(`removed: ${label}`, () => {
      assert.ok(!html.includes(label),
        `"${label}" should no longer appear in index-vision.html`);
    });
  }
});
