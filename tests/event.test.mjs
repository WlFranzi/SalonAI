/**
 * TDD — event.html integrity (HNWI pass)
 * Run: node --test tests/event.test.mjs
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dir = path.dirname(fileURLToPath(import.meta.url));
const html  = readFileSync(path.join(__dir, "../event.html"), "utf8");

describe("event.html — hero", () => {
  it("uses German possessive (no English 's apostrophe in title)", () => {
    // Reject the previous "<host>'s<br>KI Dinner" structure.
    assert.ok(!/host-name[^>]*><\/span>'s/i.test(html) && !/'s<br>KI Dinner/.test(html),
      "English possessive 's still present in hero title");
  });
  it("title reads 'Salon AI bei <host>'", () => {
    assert.ok(/Salon AI bei\s*<span[^>]*id="hero-host"/.test(html),
      "Hero title must follow 'Salon AI bei <host>' pattern");
  });
});

describe("event.html — date chip wording", () => {
  it("uses 'Ankommen ab' instead of club-style 'Einlass'", () => {
    assert.ok(!/\bEinlass\b/.test(html), "'Einlass' (club vocabulary) still present");
    assert.ok(/Ankommen ab 18:00/.test(html), "'Ankommen ab 18:00' missing");
  });
});

describe("event.html — ticket card cleanup", () => {
  it("does not show the include-chip ticket-stub list", () => {
    // Reject the *element usage* (CSS class definition is harmless if dead).
    assert.ok(!/<div class="include-chip"/.test(html),
      "<div class=\"include-chip\"> elements should be removed (ruhige Zeile statt Stub-Look)");
    assert.ok(!/Hands-on Workshop/.test(html),
      "'Hands-on Workshop' chip text still present");
  });
  it("ticket-note no longer says 'Bewusst kleiner Kreis' (redundant)", () => {
    assert.ok(!/Bewusst kleiner Kreis/.test(html), "Redundant 'Bewusst kleiner Kreis' phrasing still present");
  });
});

describe("event.html — survey card (HNWI register)", () => {
  it("question asks for 'Hebel', not lifestyle phrasing", () => {
    assert.ok(!/dein Leben einfacher macht/.test(html),
      "Lifestyle phrasing 'dein Leben einfacher macht' still present");
    assert.ok(/größten Hebel/.test(html), "HNWI 'größten Hebel' phrasing missing");
  });
  it("submit button drops loud price '78€'", () => {
    const m = html.match(/<button class="survey-btn"[^>]*>([^<]+)<\/button>/);
    assert.ok(m, "survey-btn not found");
    assert.ok(!/78€/.test(m[1]), `Survey button still shows price: "${m[1]}"`);
  });
  it("card label says 'Vor dem Abend', not 'Für Franziska'", () => {
    assert.ok(/<div class="card-label">Vor dem Abend<\/div>/.test(html),
      "Card label should be 'Vor dem Abend'");
  });
});

describe("event.html — about card", () => {
  it("drops the 'Teil 1 / Teil 2' seminar numbering", () => {
    assert.ok(!/Teil\s*1\s*—/.test(html), "'Teil 1 —' numbering still present");
    assert.ok(!/Teil\s*2\s*—/.test(html), "'Teil 2 —' numbering still present");
  });
});

describe("event.html — share buttons", () => {
  it("has LinkedIn share button", () => {
    assert.ok(/onclick="shareLinkedIn/.test(html), "shareLinkedIn handler missing");
  });
  it("has WhatsApp share button", () => {
    assert.ok(/onclick="shareWhatsApp/.test(html), "shareWhatsApp handler missing");
  });
  it("has native-share fallback (for Instagram via mobile share sheet)", () => {
    assert.ok(/id="share-native-btn"/.test(html), "Native share button missing");
    assert.ok(/navigator\.share/.test(html), "navigator.share usage missing");
  });
  it("retains a copy-link affordance", () => {
    assert.ok(/onclick="copyShareLink/.test(html), "copyShareLink handler missing");
  });
});

describe("event.html — share link card text", () => {
  it("does not say 'wer zuerst kauft, ist dabei' (Eventbrite tone)", () => {
    assert.ok(!/wer zuerst kauft/.test(html), "Eventbrite-style first-come-first-served phrase still present");
  });
});

describe("event.html — footer", () => {
  it("uses 'Ein Salon für Europa' (not 'Ein Abend der sich lohnt')", () => {
    assert.ok(!/Ein Abend der sich lohnt/.test(html), "Old Groupon-y tagline still present");
    assert.ok(/Ein Salon für Europa/.test(html), "New tagline missing");
  });
});

describe("event.html — bio register", () => {
  it("franzi bio leads with '15+ Jahre KI bei'", () => {
    assert.ok(/15\+\s*Jahre\s*KI\s*bei\s*Amazon, Writer, SoundCloud/.test(html),
      "Franziska bio should lead with the AI-experience signal");
  });
});
