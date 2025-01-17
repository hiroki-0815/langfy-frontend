import ChatSection from "@/components/video-call/ChatSection";
import ParticipantsSection from "@/components/video-call/ParticipantsSection";
import RoomLabel from "@/components/video-call/RoomLabel";
import VideoSection from "@/components/video-call/VideoSection";

const RoomPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="grid flex-1 grid-cols-[250px_1fr_250px]">
        <div>
          <ParticipantsSection />
        </div>

        <div>
          <VideoSection />
          <RoomLabel roomId="1234" />
        </div>

        <div>
          <ChatSection />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default RoomPage;
