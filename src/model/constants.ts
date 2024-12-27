export const GENDERS = ["male", "female"] as const;

export const NATIONALITIES = [
  "Japan",
  "The United States",
  "Canada",
  "United Kingdom",
  "India",
  "Germany",
  "France",
  "Australia",
  "China",
  "Brazil",
] as const;

export const LANGUAGES = ["English", "Japanese", "Chinese", "Spanish", "French"] as const;

export const FLUENCY_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const MOTIVATIONS = ["wanna chat", "wanna call"] as const;

// Type Definitions
export type Nationality = typeof NATIONALITIES[number];
export type Language = typeof LANGUAGES[number];
export type Gender = typeof GENDERS[number];
export type FluencyLevel = typeof FLUENCY_LEVELS[number];
export type Motivation = typeof MOTIVATIONS[number];
