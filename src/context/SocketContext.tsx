// src/context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "@/model/types";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

type SocketProviderProps = {
  children: React.ReactNode;
  currentUser: User | null;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  currentUser,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (currentUser?._id) {
      // Connect to your server
      const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["websocket"], // optional
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        // Let the server know which user is connected
        newSocket.emit("setup", currentUser._id);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [currentUser?._id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
