// apiClient.ts

import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Post {
  id: string;
  content: string;
  authorId: string;
  // These properties are populated when fetching posts:
  nativeLanguage: string;
  learningLanguage: string;
  likesCount: number;
  createdAt: string;
}

// Response type for a newly created post (without language details)
export interface NewPostResponse {
  id: string;
  content: string;
  authorId: string;
  likesCount: number;
  createdAt: string;
}

export const useGetAllPosts = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAllPostsRequest = useCallback(
    async (page: number = 1, limit: number = 10): Promise<Post[]> => {
      // Retrieve the access token
      const accessToken = await getAccessTokenSilently();

      // Build the URL with query parameters
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

      // Parse and return the JSON data as an array of Post objects
      const posts: Post[] = await response.json();
      return posts;
    },
    [getAccessTokenSilently]
  );

  return { getAllPostsRequest };
};
