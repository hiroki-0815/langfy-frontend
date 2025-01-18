import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useSocket } from "@/context/SocketContext";
import ChatSection from "@/components/video-call/ChatSection";
import ParticipantsSection from "@/components/video-call/ParticipantsSection";
import RoomLabel from "@/components/video-call/RoomLabel";
import VideoSection from "@/components/video-call/VideoSection";
import { getLocalPreviewAndInitRoomConnection } from "@/hooks/useWebRTCHandler";
import { RootState } from "@/store/store";
import Loading from "@/skeletons/Loading";
import store from "@/store/store";
import { setParticipants, setRoomId } from "@/store/actions";

type RoomPageProps = {
  roomId: string;
  identity: string;
  isRoomHost: boolean;
  showOverlay: boolean;
};

const RoomPage = ({
  roomId,
  identity,
  isRoomHost,
  showOverlay,
}: RoomPageProps) => {
  const { socket } = useSocket();
  const hasJoinedRef = useRef(false);

  const createNewRoom = (identity: string) => {
    const data = {
      identity,
    };
    socket?.emit("create-new-room", data);
  };

  const joinRoom = (roomId: string, identity: string) => {
    const data = {
      roomId,
      identity,
    };
    socket?.emit("join-room", data);
  };

  socket?.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket?.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  useEffect(() => {
    if (hasJoinedRef.current) return;
    hasJoinedRef.current = true;

    getLocalPreviewAndInitRoomConnection({
      isRoomHost,
      identity,
      roomId,
      createNewRoom,
      joinRoom,
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="grid flex-1 grid-cols-[250px_1fr_250px]">
        <ParticipantsSection />
        <div>
          <RoomLabel roomId={roomId} />
        </div>
        <ChatSection />
      </div>
      <VideoSection />
      {showOverlay && <Loading />}
    </div>
  );
};

const mapStoreStateToProps = (state: RootState) => ({
  roomId: state.room.roomId,
  identity: state.room.identity,
  isRoomHost: state.room.isRoomHost,
  showOverlay: state.room.showOverlay,
});

export default connect(mapStoreStateToProps)(RoomPage);
