// usePlayer.ts
import { useSocket } from "@/context/SocketContext";
import { useState, useCallback } from "react";

type Player = {
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
};

type Players = Record<string, Player>;

const usePlayer = (
  myId: string,
  roomId: string | undefined,
  stream: MediaStream | null
) => {
  const { socket } = useSocket();
  const [players, setPlayers] = useState<Players>({});

  const playerHighlighted = players[myId];
  const nonHighlightedPlayers = Object.fromEntries(
    Object.entries(players).filter(([id]) => id !== myId)
  );

  const toggleAudio = useCallback(() => {
    if (!stream) return;

    // Toggle each audio track's enabled state
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    // Update the local state
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        ...prev[myId],
        muted: !prev[myId]?.muted,
      },
    }));

    // Emit the toggle event to the server
    socket?.emit("user-toggle-audio", { userId: myId, roomId });
  }, [stream, myId, socket, roomId]);

  const toggleVideo = useCallback(() => {
    if (!stream) return;

    // Toggle each video track's enabled state
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    // Update the local state
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        ...prev[myId],
        playing: !prev[myId]?.playing,
      },
    }));

    // Emit the toggle event to the server
    socket?.emit("user-toggle-video", { userId: myId, roomId });
  }, [stream, myId, socket, roomId]);

  return {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
  };
};

export default usePlayer;
