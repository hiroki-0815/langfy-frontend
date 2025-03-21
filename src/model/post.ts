export type Post = {
  id: string;
  content: string;
  authorId: string;
  // These properties are populated when fetching posts:
  nativeLanguage: string;
  learningLanguage: string;
  likesCount: number;
  createdAt: string;
}