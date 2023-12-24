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

export const engLevels: Array<{
  id: number;
  level: Level;
  rank: Rank;
  maxScore: number;
}> = [
  {
    id: 0,
    level: "A1",
    rank: "Beginner",
    maxScore: 56,
  },
  {
    id: 1,
    level: "A2",
    rank: "Elementary",
    maxScore: 51,
  },
  {
    id: 2,
    level: "A2",
    rank: "Pre-Intermediate",
    maxScore: 55,
  },
  {
    id: 3,
    level: "B1",
    rank: "Intermediate",
    maxScore: 53,
  },
  {
    id: 4,
    level: "B2",
    rank: "Upper-Intermediate",
    maxScore: 61,
  },
  {
    id: 5,
    level: "C1",
    rank: "Advanced",
    maxScore: 65,
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
