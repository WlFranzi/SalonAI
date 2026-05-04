import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MonsterFlipCard from "../components/MonsterFlipCard";
import { MonsterCard } from "../data/monsters";

const mockCard: MonsterCard = {
  id: "chatgpt",
  name: "ChatGPT",
  nickname: "Das Schweizer Taschenmesser der KI",
  tagline: "Bester Allrounder mit Voice, Bild & Video.",
  citizenLabel: "Für Texte, Ideen & Alltag",
  monster: "/test-monster.webp",
  bestFor: "Alltag und Brainstorming",
  notFor: "Hochvertrauliche Daten",
  flag: "🇺🇸",
  sourceType: "closed",
  sugarRating: 5,
  tags: ["LLM", "multimodal", "US"],
  company: "openai",
};

describe("MonsterFlipCard — front face", () => {
  it("shows the tool name", () => {
    const { container } = render(<MonsterFlipCard card={mockCard} />);
    const front = container.querySelector(".flip-card-front") as HTMLElement;
    expect(front).toHaveTextContent("ChatGPT");
  });

  it("shows the citizenLabel badge", () => {
    render(<MonsterFlipCard card={mockCard} />);
    expect(screen.getByText("Für Texte, Ideen & Alltag")).toBeInTheDocument();
  });

  it("shows the flip hint with 'umdrehen' text", () => {
    render(<MonsterFlipCard card={mockCard} />);
    expect(screen.getByText(/umdrehen/i)).toBeInTheDocument();
  });

  it("OPEN/CLOSED badge is NOT in the header row — it lives next to the name", () => {
    const { container } = render(<MonsterFlipCard card={mockCard} />);
    const front = container.querySelector(".flip-card-front") as HTMLElement;
    const badge = front.querySelector("span.rounded-full") as HTMLElement;
    expect(badge).toHaveTextContent("CLOSED");
    const h3 = front.querySelector("h3.font-bold") as HTMLElement;
    expect(h3.parentElement).toContainElement(badge);
  });

  it("shows company name", () => {
    render(<MonsterFlipCard card={mockCard} />);
    expect(screen.getByText("OpenAI")).toBeInTheDocument();
  });

  it("shows flag", () => {
    const { container } = render(<MonsterFlipCard card={mockCard} />);
    const front = container.querySelector(".flip-card-front") as HTMLElement;
    expect(front).toHaveTextContent("🇺🇸");
  });

  it("shows muffin privacy rating", () => {
    render(<MonsterFlipCard card={mockCard} />);
    // 5 muffins should be present
    const muffins = screen.getAllByText("🧁");
    expect(muffins).toHaveLength(5);
  });
});

describe("MonsterFlipCard — flip behaviour", () => {
  it("clicking the card flips it (adds flipped class)", async () => {
    const { container } = render(<MonsterFlipCard card={mockCard} />);
    const inner = container.querySelector(".flip-card-inner");
    expect(inner).not.toHaveClass("flipped");
    await userEvent.click(container.firstChild as Element);
    expect(inner).toHaveClass("flipped");
  });

  it("shows bestFor on the back", async () => {
    render(<MonsterFlipCard card={mockCard} />);
    // Back content is rendered but hidden via CSS; it's still in the DOM
    expect(screen.getByText("Alltag und Brainstorming")).toBeInTheDocument();
  });

  it("shows notFor on the back", async () => {
    render(<MonsterFlipCard card={mockCard} />);
    expect(screen.getByText("Hochvertrauliche Daten")).toBeInTheDocument();
  });
});

describe("MonsterFlipCard — OPEN source card", () => {
  const openCard: MonsterCard = { ...mockCard, sourceType: "open", id: "llama", name: "Llama" };

  it("shows OPEN badge for open source models", () => {
    render(<MonsterFlipCard card={openCard} />);
    expect(screen.getByText("OPEN")).toBeInTheDocument();
  });
});
