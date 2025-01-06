import { useGetMyUser } from "@/api/MyUserApi";
import { SocketProvider } from "@/context/SocketContext";

const VideoCallPage = () => {
  const { currentUser, isLoading: isCurrentUserLoading } = useGetMyUser();
  return (
    <SocketProvider currentUser={currentUser || null}>
      <div className=""></div>
    </SocketProvider>
  );
};

export default VideoCallPage;
