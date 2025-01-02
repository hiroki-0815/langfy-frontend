import { useGetChatUser, useGetMessages } from "@/api/UseChatApi";
import { ChatContainer } from "@/components/ChatContainer";
import NoChatSelected from "@/components/NoChatSelected";
import Sidebar from "@/components/Sidebar";

const ChatPage = () => {
  const { chatUser, isLoading: isUserLoading } = useGetChatUser();
  // const { userMessages, isLoading: isMessageLoading } = useGetMessages();
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!chatUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
