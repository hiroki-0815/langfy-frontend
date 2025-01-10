import { useState } from "react";

type Player = {
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
};

type Players = Record<string, Player>;

const usePlayer = (myId: string) => {
  const [players, setPlayers] = useState<Players>({});

  const playersCopy = { ...players };
  const playerHighlighted = playersCopy[myId];

  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy;

  return { players, setPlayers, playerHighlighted, nonHighlightedPlayers };
};

export default usePlayer;
