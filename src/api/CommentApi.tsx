import { Comment } from "../model/comments";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateComment = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const createCommentRequest = useCallback(
    async (postId: string, text: string): Promise<Comment> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const url = new URL(`${API_BASE_URL}/api/comments`);
        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, text }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }

        const newComment: Comment = await response.json();
        return newComment;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { createCommentRequest, loading };
};

export const useGetComments = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const getCommentsRequest = useCallback(
    async (postId: string): Promise<Comment[]> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        // Assuming the endpoint is GET /api/comments/:postId
        const url = new URL(`${API_BASE_URL}/api/comments/${postId}`);
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

        const data = await response.json();
        return data.comments;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { getCommentsRequest, loading };
};

export const useDeleteComment = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const deleteCommentRequest = useCallback(
    async (commentId: string): Promise<{ message: string }> => {
      setLoading(true);
      try {
        const accessToken = await getAccessTokenSilently();
        const url = new URL(`${API_BASE_URL}/api/comments/${commentId}`);
        const response = await fetch(url.toString(), {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } finally {
        setLoading(false);
      }
    },
    [getAccessTokenSilently]
  );

  return { deleteCommentRequest, loading };
};
