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

export const scores: Record<Rank, number> = {
  Beginner: 56,
  Elementary: 51,
  "Pre-Intermediate": 55,
  Intermediate: 53,
  "Upper-Intermediate": 61,
  Advanced: 65,
};

export const articles: Record<Rank, string> = {
  Beginner: "a",
  Elementary: "an",
  "Pre-Intermediate": "a",
  Intermediate: "an",
  "Upper-Intermediate": "an",
  Advanced: "an",
};
