import { useGetMessages } from "@/api/UseChatApi";
import ChatHeader from "./ChatHeader";
import { User } from "@/model/types";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import { formatTime } from "@/lib/utils";

type Props = {
  user: User;
};

const ChatContainer = ({ user }: Props) => {
  const { messages, isLoading } = useGetMessages(user._id);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none">
        <ChatHeader userName={user.name} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === user._id ? "justify-start" : "justify-end"
              }`}
            >
              <div className="flex flex-col space-y-1">
                <div
                  className={`px-3 py-2 max-w-xs rounded-lg ${
                    message.senderId === user._id
                      ? "bg-blue-400 text-white"
                      : "bg-blue-700 text-white"
                  }`}
                >
                  <div>{message.text}</div>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message attachment"
                      className="mt-2 rounded-lg"
                    />
                  )}
                </div>
                <div
                  className={`text-[10px] text-gray-500 ${
                    message.senderId === user._id ? "text-left" : "text-right"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No messages found.</div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex-none bg-white p-4">
        <MessageInput receiverId={user._id} />
      </div>
    </div>
  );
};

export default ChatContainer;
