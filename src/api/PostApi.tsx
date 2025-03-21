import { Post } from "@/model/post";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllPosts = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const getAllPostsRequest = useCallback(
    async (page: number = 1, limit: number = 10): Promise<Post[]> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const url = new URL(`${API_BASE_URL}/api/posts`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }

        const posts: Post[] = await response.json();
        return posts;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { getAllPostsRequest, loading };
};

export const useCreatePost = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const createPostRequest = useCallback(
    async (content: string): Promise<Post> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const url = new URL(`${API_BASE_URL}/api/posts`);

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }

        const newPost: Post = await response.json();
        return newPost;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { createPostRequest, loading };
};

export const useLikePost = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const likePostRequest = useCallback(
    async (postId: string): Promise<Post> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        // Assuming the endpoint is: POST /api/posts/:postId/like
        const url = new URL(`${API_BASE_URL}/api/posts/${postId}/like`);

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }

        const updatedPost: Post = await response.json();
        return updatedPost;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { likePostRequest, loading };
};

export const useUnlikePost = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const unlikePostRequest = useCallback(
    async (postId: string): Promise<Post> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        // Assuming the endpoint is: POST /api/posts/:postId/unlike
        const url = new URL(`${API_BASE_URL}/api/posts/${postId}/unlike`);

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }

        const updatedPost: Post = await response.json();
        return updatedPost;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { unlikePostRequest, loading };
};
