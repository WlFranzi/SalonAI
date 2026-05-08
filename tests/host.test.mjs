/**
 * TDD — host.html integrity (HNWI pass)
 * Run: node --test tests/host.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const html  = readFileSync(path.join(__dir, "../host.html"), "utf8");

describe("host.html — hero copy", () => {
  it("subtext is variable-day (no hardcoded 'Dienstagabend')", () => {
    assert.ok(!/Ein Dienstagabend/i.test(html),
      "'Ein Dienstagabend' hardcoded — date is variable, must be 'Ein Abend'");
  });
});

describe("host.html — venue options", () => {
  it("'Location' (Eventbrite vocab) is replaced with 'Raum'", () => {
    assert.ok(!/Privatwohnung, Büro, eigene Location/.test(html),
      "Eventbrite-style 'eigene Location' still present");
    assert.ok(/Privatwohnung, Büro, eigener Raum/.test(html), "'eigener Raum' phrasing missing");
  });
  it("Luitpoldblock price is muted, not in option title", () => {
    // Old form put '+280€ einmalig.' in a sibling <span> right after the strong.
    // New form keeps the price but visually muted (color in inline style).
    const optMatch = html.match(/Ich habe keinen Raum[\s\S]{0,400}/);
    assert.ok(optMatch, "Luitpold venue option not found");
    assert.ok(/rgba\(0,0,0,0\.35\)|color:\s*rgba/.test(optMatch[0]),
      "Luitpold price should be styled muted, not the same weight as the title");
  });
});

describe("host.html — step headings", () => {
  it("step 4 reads 'Wie deine Einladung aussieht', not 'Was du deiner Runde schickst'", () => {
    assert.ok(!/Was du deiner Runde schickst/.test(html), "Old colloquial 'Runde' heading still present");
    assert.ok(/Wie deine Einladung aussieht/.test(html), "New step-4 heading missing");
  });
});

describe("host.html — generate button", () => {
  it("CTA reads 'Salon-Einladung erstellen →'", () => {
    assert.ok(/Salon-Einladung erstellen\s*→/.test(html),
      "Generate button text not updated to 'Salon-Einladung erstellen →'");
  });
});

describe("host.html — share row in result block", () => {
  it("has share-row scaffolded in HTML", () => {
    assert.ok(/id="share-row"/.test(html), "share-row container missing");
  });
  it("has LinkedIn / WhatsApp share buttons", () => {
    assert.ok(/onclick="shareLinkedIn/.test(html), "shareLinkedIn handler missing");
    assert.ok(/onclick="shareWhatsApp/.test(html), "shareWhatsApp handler missing");
  });
  it("has navigator.share fallback for mobile (Instagram)", () => {
    assert.ok(/navigator\.share/.test(html), "navigator.share usage missing");
    assert.ok(/id="share-native-btn"/.test(html), "Native share button missing");
  });
  it("share-row is hidden until generate() succeeds", () => {
    // Markup default — allow optional semicolons / extra whitespace
    assert.ok(/id="share-row"[^>]*style="[^"]*display:\s*none/.test(html),
      "share-row should default to display:none");
    // generate() must reveal it on the success branches
    assert.ok(/share-row['"]\)\.style\.display\s*=\s*['"]flex['"]/.test(html),
      "generate() must set share-row to display:flex on success");
  });
});

describe("host.html — result note (no Eventbrite tone)", () => {
  it("does not say 'Wer bucht, ist dabei.'", () => {
    assert.ok(!/Wer bucht, ist dabei/.test(html), "Old first-come Eventbrite line still present");
  });
  it("uses 'sichert seinen Platz' framing", () => {
    assert.ok(/sichert seinen Platz/.test(html), "New result-note phrasing missing");
  });
});

describe("host.html — footer", () => {
  it("uses 'Ein Salon für Europa', not 'Ein Abend der sich lohnt'", () => {
    assert.ok(!/Ein Abend der sich lohnt/.test(html), "Old Groupon-y tagline still present");
    assert.ok(/Ein Salon für Europa/.test(html), "New tagline missing");
  });
});

describe("host.html — message template", () => {
  it("template leads bio with '15+ Jahre KI bei'", () => {
    assert.ok(/15\+\s*Jahre\s*KI\s*bei\s*Amazon, Writer, SoundCloud/.test(html),
      "TPL bio should lead with AI-experience signal");
  });
  it("template no longer mentions 'Scale-ups und Big Tech' (length-cut)", () => {
    assert.ok(!/Scale-ups und Big Tech/.test(html),
      "Verbose 'Scale-ups und Big Tech' chain still in TPL");
  });
});

describe("host.html — result-title formatting", () => {
  it("uses 'Salon AI bei <name>' (not English possessive)", () => {
    assert.ok(/Salon AI bei\s*['"]\s*\+\s*name/.test(html),
      "result-title should be set to 'Salon AI bei ' + name");
    assert.ok(!/['"]’s KI Dinner /.test(html),
      "Old possessive '’s KI Dinner' construction still present");
  });
});
