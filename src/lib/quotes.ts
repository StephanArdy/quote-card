export type Quote = {
  id: string;
  quote: string;
  author: string;
  tags: string[];
};

export const QUOTES: Quote[] = [
  {
    id: "ship-fast",
    quote:
      "Ship the smallest thing that proves the idea. Then iterate in public.",
    author: "QuoteCard Studio",
    tags: ["product", "speed", "iteration"],
  },
  {
    id: "deterministic-ui",
    quote: "Determinism is a feature. Your screenshots should be reproducible.",
    author: "QuoteCard Studio",
    tags: ["testing", "design", "automation"],
  },
  {
    id: "make-it-obvious",
    quote: "If it’s not obvious, it’s not done.",
    author: "Martin Fowler",
    tags: ["craft", "clarity", "software"],
  },
  {
    id: "simple-scales",
    quote:
      "A simple system that works can be expanded. A complex system that doesn’t can’t.",
    author: "Gall’s Law (paraphrased)",
    tags: ["architecture", "simplicity", "systems"],
  },
  {
    id: "measure-twice",
    quote: "Measure twice. Cut once. Automate the measurement.",
    author: "QuoteCard Studio",
    tags: ["quality", "automation", "engineering"],
  },
  {
    id: "constraints-create",
    quote: "Constraints are what make the work interesting.",
    author: "Design maxim",
    tags: ["design", "constraints", "focus"],
  },
  {
    id: "reliable-over-clever",
    quote: "Reliable beats clever when you have to run it twice.",
    author: "QuoteCard Studio",
    tags: ["reliability", "ops", "pragmatism"],
  },
  {
    id: "defaults-win",
    quote: "Strong defaults reduce choices and increase velocity.",
    author: "Product maxim",
    tags: ["product", "defaults", "velocity"],
  },
  {
    id: "make-it-testable",
    quote: "Make it testable, and it becomes understandable.",
    author: "QuoteCard Studio",
    tags: ["testing", "clarity", "code"],
  },
  {
    id: "good-enough",
    quote:
      "Good enough, shipped, teaches you more than perfect, postponed.",
    author: "Maker maxim",
    tags: ["shipping", "learning", "momentum"],
  },
];

export function getQuoteById(id: string): Quote | null {
  return QUOTES.find((q) => q.id === id) ?? null;
}
