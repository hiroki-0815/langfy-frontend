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
    if (!stream || !myId) return;

    setPlayers((prev) => {
      const currentLocal = prev[myId];
      if (!currentLocal) return prev;

      const newMuted = !currentLocal.muted;

      stream.getAudioTracks().forEach((track) => {
        track.enabled = !newMuted;
      });

      return {
        ...prev,
        [myId]: {
          ...currentLocal,
          muted: newMuted,
        },
      };
    });

    socket?.emit("user-toggle-audio", { userId: myId, roomId });
  }, [stream, myId, socket, roomId]);

  const toggleVideo = useCallback(() => {
    if (!stream || !myId) return;

    setPlayers((prev) => {
      const currentLocal = prev[myId];
      if (!currentLocal) return prev;

      const newPlaying = !currentLocal.playing;

      stream.getVideoTracks().forEach((track) => {
        track.enabled = newPlaying;
      });

      return {
        ...prev,
        [myId]: {
          ...currentLocal,
          playing: newPlaying,
        },
      };
    });

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
