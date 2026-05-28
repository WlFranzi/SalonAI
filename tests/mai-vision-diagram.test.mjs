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
