import { useSocket } from "@/context/SocketContext";

export const useRoomActions = () => {
  const { socket } = useSocket();

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

  return { createNewRoom, joinRoom };
};
