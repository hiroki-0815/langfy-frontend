import { useGetChatUser } from "@/api/UseChatApi";
import ChatContainer from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { User } from "@/model/types";

const ChatPage = () => {
  const { chatUser, isLoading: isUserLoading } = useGetChatUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (userId: string) => {
    const user = chatUser?.find((user) => user._id === userId) || null;
    setSelectedUser(user);
  };
  if (isUserLoading) {
    <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar users={chatUser} onUserSelect={handleUserSelect} />
            {selectedUser ? (
              <ChatContainer user={selectedUser} />
            ) : (
              <NoChatSelected />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
