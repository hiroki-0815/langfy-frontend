import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "@/api/UseChatApi";
import { useSocket } from "@/context/SocketContext";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatTime } from "@/utilities/timeFmt";
import { User } from "@/model/user";
import { Message } from "@/model/messsage";

type Props = {
  user: User;
  currentUserId?: string;
};

const ChatContainer = ({ user, currentUserId }: Props) => {
  const { messages, isLoading } = useGetMessages(user._id);
  const { socket } = useSocket();
  const [realTimeMessages, setRealTimeMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages) {
      setRealTimeMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: Message) => {
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

  useEffect(() => {
    if (messagesEndRef && messages)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [realTimeMessages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full w-full bg-white">
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

      <div className="flex-none bg-slate-50 shadow-md p-4">
        <MessageInput receiverId={user._id} />
      </div>
    </div>
  );
};

export default ChatContainer;
