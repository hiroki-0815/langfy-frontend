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
  const { setPlayers, playerHighlighted, nonHighlightedPlayers } =
    usePlayer(myId);

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
        console.log(`Incoming stream from ${callerId}`);
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

    const handleCall = (call: any) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`Incoming stream from ${callerId}`);
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
    };

    peer.on("call", handleCall);

    return () => {
      peer.off("call", handleCall);
    };
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`Setting my stream with ID: ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [stream, myId, setPlayers]);

  const getGridClass = (playerCount: number) => {
    if (playerCount === 1) return "grid-cols-1";
    if (playerCount >= 2) return "grid-cols-2";
    return "";
  };

  const gridClass = `grid ${getGridClass(
    Object.keys(nonHighlightedPlayers).length
  )} items-center justify-center`;

  return (
    <div className="h-[800px] md:h-screen bg-gray-900 relative flex items-center justify-center">
      <div
        className={`${
          Object.keys(nonHighlightedPlayers).length === 1
            ? "w-full h-full"
            : gridClass
        }`}
      >
        {Object.keys(nonHighlightedPlayers).length > 0 ? (
          Object.keys(nonHighlightedPlayers).map((playerId) => {
            const { url, muted, playing } = nonHighlightedPlayers[playerId];
            return (
              <div
                className={`${
                  Object.keys(nonHighlightedPlayers).length === 1
                    ? "w-full h-full"
                    : "max-w-[600px]"
                }`}
              >
                <Player
                  key={playerId}
                  url={url}
                  muted={muted}
                  playing={playing}
                />
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">No other players connected.</p>
          </div>
        )}
      </div>
      {playerHighlighted && (
        <div className="absolute bottom-[5%] right-[5%] z-50 w-20 md:w-[250px]">
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
          />
        </div>
      )}
    </div>
  );
};

export default RoomId;
