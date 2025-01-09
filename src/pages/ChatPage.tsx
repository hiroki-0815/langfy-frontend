import { useState, useEffect } from "react";
import { useGetMyUser } from "@/api/MyUserApi";
import { useGetChatUser } from "@/api/UseChatApi";
import Sidebar from "@/components/Sidebar";
import ChatContainer from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";
import { User } from "@/model/types";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
  const { chatUser, isLoading: isChatUserLoading } = useGetChatUser(userId);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId && chatUser) {
      const user = chatUser.find((u) => u._id === userId) || null;
      setSelectedUser(user);
    }
  }, [userId, chatUser]);

  const handleUserSelect = (userId: string) => {
    const user = chatUser?.find((u) => u._id === userId) || null;
    setSelectedUser(user);
  };

  if (isCurrentUserLoading || isChatUserLoading) {
    return <div>Loading chat...</div>;
  }

  return (
    <div className="h-screen bg-slate-50">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar
              users={chatUser}
              onUserSelect={handleUserSelect}
              selectedUserId={selectedUser?._id}
            />
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
  );
};

export default ChatPage;
