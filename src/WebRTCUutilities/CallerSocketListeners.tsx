import { Socket } from "socket.io-client";

type AddIceCandidateFunc = (candidate: RTCIceCandidate) => void;

const callerSocketListeners = (
  socket: Socket | null,
  addIceCandidatePeerConnection: AddIceCandidateFunc
) => {
  socket?.on("iceToClient", (iceC) => {
    addIceCandidatePeerConnection(iceC);
  });
};

export default callerSocketListeners;
