// src/components/ChatContainer.tsx
import React, { useEffect, useRef, useState } from "react";
import { useGetMessages } from "@/api/UseChatApi";
import { useSocket } from "@/context/SocketContext";
import { Message, User } from "@/model/types";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatTime } from "@/lib/utils";

type Props = {
  user: User; // The user we’re chatting with
  currentUserId?: string; // The logged-in user's ID
};

const ChatContainer: React.FC<Props> = ({ user, currentUserId }) => {
  const { messages, isLoading } = useGetMessages(user._id);
  const { socket } = useSocket();
  const [realTimeMessages, setRealTimeMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // On initial load or user change, set the realTimeMessages from fetched messages
  useEffect(() => {
    if (messages) {
      setRealTimeMessages(messages);
    }
  }, [messages]);

  // Socket.io "newMessage" listener
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
      // Only add it if it’s relevant to this chat
      const isRelevant =
        (newMessage.senderId === user._id &&
          newMessage.receiverId === currentUserId) ||
        (newMessage.senderId === currentUserId &&
          newMessage.receiverId === user._id);
      if (isRelevant) {
        setRealTimeMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, user._id, currentUserId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [realTimeMessages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <ChatHeader userName={user.name} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {realTimeMessages.map((msg) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div className="flex flex-col space-y-1">
                <div
                  className={`px-3 py-2 max-w-xs rounded-lg ${
                    isMine ? "bg-blue-700 text-white" : "bg-blue-400 text-white"
                  }`}
                >
                  <div>{msg.text}</div>
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Message attachment"
                      className="mt-2 rounded-lg"
                    />
                  )}
                </div>
                <div
                  className={`text-[10px] text-gray-500 ${
                    isMine ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex-none bg-white p-4">
        <MessageInput receiverId={user._id} />
      </div>
    </div>
  );
};

export default ChatContainer;
