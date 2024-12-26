export type User = {
  name: string;
  gender: "male" | "female";
  email?: string | undefined;
  city: string;
  country: string;
  nationality: string;
  age: number; 
  learningLanguage: string;
  fluencyLevel: "beginner" | "intermediate" | "advanced";
  motivation: "wanna chat" | "wanna call";
  selfIntroduction: string;
  imageUrl: string;
};
