export type Comment = {
  id: string;
  postId: string;
  text: string;
  user: {
    _id: string;
    name: string;
    imageUrl?: string;
  };
  createdAt: string;
  commentsCount?: number; 
};
