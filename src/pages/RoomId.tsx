import { useSocket } from "@/context/SocketContext";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import Player from "@/components/Player";
import { useEffect, useState } from "react";
import usePlayer from "@/hooks/usePlayer";

const RoomId = () => {
  const { socket } = useSocket();
  const { myId, peer } = usePeer();
  const { stream } = useMediaStream();
  const [currentStream, setCurrentStream] = useState<MediaStream | null>(null);
  const { players, setPlayers } = usePlayer();

  useEffect(() => {
    if (stream && !currentStream) {
      stream.getTracks().forEach((track) => {
        console.log(`Track ${track.kind} state: ${track.readyState}`);
        track.onended = () => console.log(`Track ${track.kind} ended`);
      });
      setCurrentStream(stream);
    }
  }, [stream, currentStream]);

  useEffect(() => {
    if (!socket || !peer || !stream) {
      console.log("RoomId Component - Socket or Peer not ready");
      return;
    }

    console.log("RoomId Component - Adding user-connected listener");

    const handleUserConnected = (newUser: string) => {
      console.log(`RoomId Component - User connected with ID: ${newUser}`);
      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        const callerId = call.peer;
        console.log(`incoming stream from ${callerId}`);
        setCurrentStream(incomingStream);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      console.log("RoomId Component - Removing user-connected listener");
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setCurrentStream(incomingStream);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
      });
    });
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [stream, myId, setPlayers]);

  return (
    <div>
      {Object.keys(players).map((playerId) => {
        const { url, muted, playing } = players[playerId];
        return (
          <Player key={playerId} url={url} muted={muted} playing={playing} />
        );
      })}
    </div>
  );
};

export default RoomId;
