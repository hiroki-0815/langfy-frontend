import { Message, User } from "@/model/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetChatUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getChatUserRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/message/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Filed to get chat user");
    }
    return response.json();
  };

  const {
    data: chatUser,
    isLoading,
    error,
  } = useQuery<User[], Error>("fetchChatUser", getChatUserRequest);

  if (error) {
    toast.error(error.message);
  }

  return {
    chatUser,
    isLoading,
  };
};

export const useGetMessages = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getMessageRequest = async (userId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/message/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Filed to get messages");
    }
    return response.json();
  };

  const {
    data: userMessages,
    isLoading,
    error,
  } = useQuery<Message[], Error>(
    ["fetchUserChat", userId],
    () => getMessageRequest(userId),
    {
      enabled: !!userId,
    }
  );

  if (error) {
    toast.error(error.message);
  }

  return {
    userMessages,
    isLoading,
  };
};
