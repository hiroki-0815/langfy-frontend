import { FluencyLevel, Gender, Language, Motivation, OriginCountry } from "./constants";

export type User = {
  _id:string;
  name: string;
  gender?: Gender;
  email?: string | undefined;
  city?: string;
  country?: string;
  originCountry?: OriginCountry;
  nativeLanguage: Language;
  age?: number; 
  learningLanguage: Language;
  fluencyLevel?: FluencyLevel;
  motivation: Motivation;
  selfIntroduction?: string;
  imageUrl: string;
};
