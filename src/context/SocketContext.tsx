// import React, { createContext, useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import { User } from "@/model/types";

// type SocketContextType = {
//   socket: Socket | null;
// };

// const SocketContext = createContext<SocketContextType>({
//   socket: null,
// });

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

// type SocketProviderProps = {
//   children: React.ReactNode;
//   currentUser: User | null;
//   feature?: "chat" | "video" | null;
// };

// export const SocketProvider = ({
//   children,
//   currentUser,
//   feature = null,
// }: SocketProviderProps) => {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     if (currentUser?._id && feature) {
//       const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
//         transports: ["websocket"],
//       });

//       newSocket.on("connect", () => {
//         console.log("Socket connected:", newSocket.id);
//         newSocket.emit("setup", {
//           userId: currentUser._id,
//           appType: feature,
//         });
//       });

//       newSocket.on("disconnect", (reason) => {
//         console.log("Socket disconnected:", reason);
//       });

//       newSocket.on("connect_error", (error) => {
//         console.error("Socket connection error:", error);
//       });

//       setSocket(newSocket);

//       return () => {
//         newSocket.disconnect();
//         setSocket(null);
//       };
//     }
//   }, [currentUser?._id, , feature]);

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "@/model/types";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

type SocketProviderProps = {
  children: React.ReactNode;
  currentUser: User | null;
};

export const SocketProvider = ({
  children,
  currentUser,
}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (currentUser?._id) {
      const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["websocket"],
      });

      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
        newSocket.emit("setup", currentUser._id);
      });

      newSocket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
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
