// import { useEffect, useRef } from "react";
// import { connect } from "react-redux";
// import { useSocket } from "@/context/SocketContext";
// import ChatSection from "@/components/video-call/ChatSection";
// import ParticipantsSection from "@/components/video-call/ParticipantsSection";
// import RoomLabel from "@/components/video-call/RoomLabel";
// import VideoSection from "@/components/video-call/VideoSection";
// import {
//   getLocalPreviewAndInitRoomConnection,
//   handleSignalingData,
//   prepareNewPeerConnection,
// } from "@/hooks/useWebRTCHandler";
// import { RootState } from "@/store/store";
// import Loading from "@/skeletons/Loading";
// import store from "@/store/store";
// import { setParticipants, setRoomId } from "@/store/actions";

// type RoomPageProps = {
//   roomId: string;
//   identity: string;
//   isRoomHost: boolean;
//   showOverlay: boolean;
// };

// const RoomPage = ({
//   roomId,
//   identity,
//   isRoomHost,
//   showOverlay,
// }: RoomPageProps) => {
//   const { socket } = useSocket();
//   const hasJoinedRef = useRef(false);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideosContainerRef = useRef<HTMLDivElement>(null);

//   const createNewRoom = (identity: string) => {
//     const data = {
//       identity,
//     };
//     socket?.emit("create-new-room", data);
//   };

//   const joinRoom = (roomId: string, identity: string) => {
//     const data = {
//       roomId,
//       identity,
//     };
//     socket?.emit("join-room", data);
//   };

//   socket?.on("room-id", (data) => {
//     const { roomId } = data;
//     store.dispatch(setRoomId(roomId));
//   });

//   socket?.on("room-update", (data) => {
//     const { connectedUsers } = data;
//     store.dispatch(setParticipants(connectedUsers));
//   });

//   socket?.on("conn-prepare", (data) => {
//     console.log("conn-prepare data =>", data);

//     const { connUserSocketId } = data;
//     console.log(
//       "Going to emit conn-init to server with ",
//       data.connUserSocketId
//     );

//     console.log("socket is", socket);
//     socket?.emit("conn-init", { connUserSocketId: data.connUserSocketId });
//     console.log("Just emitted conn-init");

//     prepareNewPeerConnection({
//       connUserSocketId,
//       isInitiator: false,
//       remoteVideosContainerRef,
//     });
//   });

//   socket?.on("conn-signal", (data) => {
//     handleSignalingData(data);
//   });

//   socket?.on("conn-init", (data) => {
//     console.log("conn-init data =>", data);
//     const { connUserSocketId } = data;
//     prepareNewPeerConnection({
//       connUserSocketId,
//       isInitiator: true,
//       remoteVideosContainerRef,
//     });
//   });

//   useEffect(() => {
//     if (hasJoinedRef.current) return;
//     hasJoinedRef.current = true;

//     getLocalPreviewAndInitRoomConnection({
//       isRoomHost,
//       identity,
//       roomId,
//       createNewRoom,
//       joinRoom,
//       localVideoRef,
//     });

//   }, []);

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="grid flex-1 grid-cols-[250px_1fr_250px]">
//         <ParticipantsSection />
//         <div>
//           <RoomLabel roomId={roomId} />
//           <video
//             ref={localVideoRef}
//             muted
//             autoPlay
//             playsInline
//             className="max-w-[600px] max-h-[600px] bg-black"
//           />
//           <div
//             ref={remoteVideosContainerRef}
//             className="remote-videos-container grid gap-4 mt-4"
//           ></div>
//         </div>
//         <ChatSection />
//       </div>
//       <VideoSection />
//       {showOverlay && <Loading />}
//     </div>
//   );
// };

// const mapStoreStateToProps = (state: RootState) => ({
//   roomId: state.room.roomId,
//   identity: state.room.identity,
//   isRoomHost: state.room.isRoomHost,
//   showOverlay: state.room.showOverlay,
// });

// export default connect(mapStoreStateToProps)(RoomPage);

// RoomPage.tsx

import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useSocket } from "@/context/SocketContext";
import ChatSection from "@/components/video-call/ChatSection";
import ParticipantsSection from "@/components/video-call/ParticipantsSection";
import RoomLabel from "@/components/video-call/RoomLabel";
import VideoSection from "@/components/video-call/VideoSection";
import {
  getLocalPreviewAndInitRoomConnection,
  handleSignalingData,
  prepareNewPeerConnection,
} from "@/hooks/useWebRTCHandler";
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
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideosContainerRef = useRef<HTMLDivElement>(null);

  const createNewRoom = (identity: string) => {
    socket?.emit("create-new-room", { identity });
  };

  const joinRoom = (roomId: string, identity: string) => {
    socket?.emit("join-room", { roomId, identity });
  };

  useEffect(() => {
    // If SSR or if we already joined, do nothing
    if (typeof window === "undefined" || hasJoinedRef.current) return;
    hasJoinedRef.current = true;

    getLocalPreviewAndInitRoomConnection({
      isRoomHost,
      identity,
      roomId,
      createNewRoom,
      joinRoom,
      localVideoRef,
    });
  }, [isRoomHost, identity, roomId]);

  // Register socket events *after* we are sure we are in the browser
  useEffect(() => {
    if (!socket) return;

    socket.on("room-id", (data) => {
      const { roomId } = data;
      store.dispatch(setRoomId(roomId));
    });

    socket.on("room-update", (data) => {
      const { connectedUsers } = data;
      store.dispatch(setParticipants(connectedUsers));
    });

    socket.on("conn-prepare", (data) => {
      console.log("conn-prepare data =>", data);
      const { connUserSocketId } = data;

      socket.emit("conn-init", { connUserSocketId });
      console.log("Just emitted conn-init to server");

      prepareNewPeerConnection({
        connUserSocketId,
        isInitiator: false,
        remoteVideosContainerRef,
      });
    });

    socket.on("conn-init", (data) => {
      console.log("conn-init data =>", data);
      const { connUserSocketId } = data;

      prepareNewPeerConnection({
        connUserSocketId,
        isInitiator: true,
        remoteVideosContainerRef,
      });
    });

    socket.on("conn-signal", (data) => {
      handleSignalingData(data);
    });

    return () => {
      // Clean up listeners if the component unmounts
      socket.off("room-id");
      socket.off("room-update");
      socket.off("conn-prepare");
      socket.off("conn-init");
      socket.off("conn-signal");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen">
      <div className="grid flex-1 grid-cols-[250px_1fr_250px]">
        <ParticipantsSection />
        <div>
          <RoomLabel roomId={roomId} />
          <video
            ref={localVideoRef}
            muted
            autoPlay
            playsInline
            className="max-w-[600px] max-h-[600px] bg-black"
          />
          <div
            ref={remoteVideosContainerRef}
            className="remote-videos-container grid gap-4 mt-4"
          />
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
