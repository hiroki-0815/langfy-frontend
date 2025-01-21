
import { useSocket } from "./context/SocketContext";

export const signalPeerData = (data: { signal: any; connUserSocketId: string }) => {
  const { socket } = useSocket();

  if (!socket) {
    console.error("Socket is not initialized");
    return;
  }
  socket.emit("conn-signal", data);
};