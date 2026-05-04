import { describe, it, expect } from "vitest";
import { CATEGORIES } from "../data/monsters";

const allCards = CATEGORIES.flatMap((cat) => cat.cards);

describe("Monster data — required fields", () => {
  it("every card has a non-empty citizenLabel", () => {
    const missing = allCards.filter((c) => !c.citizenLabel?.trim());
    expect(missing.map((c) => c.id)).toEqual([]);
  });

  it("every card has a non-empty nickname", () => {
    const missing = allCards.filter((c) => !c.nickname?.trim());
    expect(missing.map((c) => c.id)).toEqual([]);
  });

  it("every card has a non-empty bestFor", () => {
    const missing = allCards.filter((c) => !c.bestFor?.trim());
    expect(missing.map((c) => c.id)).toEqual([]);
  });

  it("every card has a non-empty notFor", () => {
    const missing = allCards.filter((c) => !c.notFor?.trim());
    expect(missing.map((c) => c.id)).toEqual([]);
  });

  it("sugarRating is between 1 and 5 for all cards", () => {
    const invalid = allCards.filter((c) => c.sugarRating < 1 || c.sugarRating > 5);
    expect(invalid.map((c) => c.id)).toEqual([]);
  });

  it("no duplicate card IDs", () => {
    const ids = allCards.map((c) => c.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it("citizenLabel is short enough to fit on card (max 40 chars)", () => {
    const tooLong = allCards.filter((c) => (c.citizenLabel?.length ?? 0) > 40);
    expect(tooLong.map((c) => `${c.id}: "${c.citizenLabel}"`)).toEqual([]);
  });
});
