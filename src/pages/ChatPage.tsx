// src/pages/ChatPage.tsx
import React, { useState } from "react";
import { useGetMyUser } from "@/api/MyUserApi";
import { useGetChatUser } from "@/api/UseChatApi";
import Sidebar from "@/components/Sidebar";
import ChatContainer from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";
import { SocketProvider } from "@/context/SocketContext";
import { User } from "@/model/types";

const ChatPage = () => {
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
  const { chatUser, isLoading: isChatUserLoading } = useGetChatUser();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (userId: string) => {
    const user = chatUser?.find((u) => u._id === userId) || null;
    setSelectedUser(user);
  };

  if (isCurrentUserLoading || isChatUserLoading) {
    return <div>Loading chat...</div>;
  }

  return (
    <SocketProvider currentUser={currentUser ?? null}>
      <div className="h-screen">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="rounded-lg shadow w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <Sidebar users={chatUser} onUserSelect={handleUserSelect} />
              {selectedUser ? (
                <ChatContainer
                  user={selectedUser}
                  currentUserId={currentUser?._id}
                />
              ) : (
                <NoChatSelected />
              )}
            </div>
          </div>
        </div>
      </div>
    </SocketProvider>
  );
};

export default ChatPage;
