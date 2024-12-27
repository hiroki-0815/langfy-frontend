import { FluencyLevel, Gender, Language, Motivation, Nationality } from "./constants";

export type User = {
  name: string;
  gender: Gender;
  email?: string | undefined;
  city: string;
  country: string;
  nationality: Nationality;
  nativeLanguage: Language;
  age: number; 
  learningLanguage: Language;
  fluencyLevel: FluencyLevel;
  motivation: Motivation;
  selfIntroduction: string;
  imageUrl: string;
};
