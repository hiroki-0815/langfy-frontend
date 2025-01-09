import { useSocket } from "@/context/SocketContext";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
import { useEffect, useState } from "react";

const RoomId = () => {
  const { socket } = useSocket();
  const { peer } = usePeer();
  const { stream } = useMediaStream();
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (stream && !currentStream) {
      console.log("Stream is live:", stream);
      stream.getTracks().forEach((track) => {
        console.log(`Track ${track.kind} state: ${track.readyState}`);
        track.onended = () => console.log(`Track ${track.kind} ended`);
      });
      setCurrentStream(stream);
    }
  }, [stream, currentStream]);

  useEffect(() => {
    if (!socket || !peer) {
      console.log("RoomId Component - Socket or Peer not ready");
      return;
    }

    console.log("RoomId Component - Adding user-connected listener");

    const handleUserConnected = (newUser: string) => {
      console.log(`RoomId Component - User connected with ID: ${newUser}`);
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      console.log("RoomId Component - Removing user-connected listener");
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer]);

  return (
    <div>
      {currentStream ? (
        <Player url={currentStream} muted={false} playing={true} />
      ) : (
        <div>No stream available</div>
      )}
    </div>
  );
};

export default RoomId;
