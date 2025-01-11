import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSocket } from "@/context/SocketContext";
import { useParams } from "react-router-dom";

const usePeer = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const { socket } = useSocket();

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;

    (async function initPeer() {
      const myPeer = new Peer();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        console.log(`your peer id is ${id}`);
        setMyId(id);
        socket.emit("join-room", roomId, id);
      });
    })();
  }, [roomId, socket]);

  return { peer, myId, roomId };
};

export default usePeer;
