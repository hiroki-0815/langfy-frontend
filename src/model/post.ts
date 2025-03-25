export type Post = {
  id: string;
  content: string;
  authorId: string;
  name: string;
  nativeLanguage: string;
  learningLanguage: string;
  imageUrl?: string;
  likesCount: number;
  createdAt: string;
  isLikedByCurrentUser?: boolean;
  commentsCount?: number; 
};
