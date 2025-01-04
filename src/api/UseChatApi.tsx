import { Message, User } from "@/model/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetChatUser = (clickedUserId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getChatUserRequest = async (): Promise<User[]> => {
    const accessToken = await getAccessTokenSilently();
    const url = new URL(`${API_BASE_URL}/api/message/users`);

    if (clickedUserId) {
      console.log("Appended clickedUserId to URL:", clickedUserId);
      url.searchParams.append("clickedUserId", clickedUserId);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get chat user");
    }
    return response.json();
  };

  const {
    data: chatUser,
    isLoading,
    error,
  } = useQuery<User[], Error>(
    ["fetchChatUser", clickedUserId],
    getChatUserRequest
  );

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

  const getMessageRequest = async (userId: string): Promise<Message[]> => {
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
    data: messages,
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
    messages,
    isLoading,
  };
};

type SendMessageInput = {
  receiverId: string;
  text?: string;
  image?: string;
};

export const useSendMessages = () => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  const sendMessageRequest = async (
    input: SendMessageInput
  ): Promise<Message> => {
    const accessToken = await getAccessTokenSilently();
    const { receiverId, text, image } = input;
    const response = await fetch(
      `${API_BASE_URL}/api/message/send/${receiverId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, image }),
      }
    );
    if (!response.ok) {
      throw new Error("Filed to send messages");
    }
    return response.json();
  };

  const {
    mutateAsync: sendMessage,
    isLoading,
    isError,
    isSuccess,
  } = useMutation<Message, Error, SendMessageInput>(sendMessageRequest, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["fetchUserChat", variables.receiverId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendMessage, isLoading, isError, isSuccess };
};
