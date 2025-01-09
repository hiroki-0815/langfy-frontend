import { useState } from "react";

type Player = {
  url: string | MediaStream;
  muted: boolean;
  playing: boolean;
};

type Players = Record<string, Player>;

const usePlayer = () => {
  const [players, setPlayers] = useState<Players>({});
  return { players, setPlayers };
};

export default usePlayer;
