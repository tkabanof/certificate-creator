const levels = ["A1", "A2", "B1", "B2", "C1"] as const;
export type Level = (typeof levels)[number];

const rankings = [
  "Beginner",
  "Elementary",
  "Pre-Intermediate",
  "Intermediate",
  "Upper-Intermediate",
  "Advanced",
] as const;
export type Rank = (typeof rankings)[number];

export type EngLevel = { id: number; level: Level; rank: Rank };

export const engLevels: Array<{ id: number; level: Level; rank: Rank }> = [
  {
    id: 1,
    level: "A1",
    rank: "Beginner",
  },
  {
    id: 2,
    level: "A2",
    rank: "Elementary",
  },
  {
    id: 3,
    level: "A2",
    rank: "Pre-Intermediate",
  },
  {
    id: 4,
    level: "B1",
    rank: "Intermediate",
  },
  {
    id: 5,
    level: "B2",
    rank: "Upper-Intermediate",
  },
  {
    id: 6,
    level: "C1",
    rank: "Advanced",
  },
];

export const articles: Record<Rank, string> = {
  Beginner: "a",
  Elementary: "an",
  "Pre-Intermediate": "a",
  Intermediate: "an",
  "Upper-Intermediate": "an",
  Advanced: "an",
};
