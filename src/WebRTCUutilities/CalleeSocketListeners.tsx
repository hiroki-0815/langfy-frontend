import { Socket } from "socket.io-client";

type AddIceCandidateFunc = (candidate: RTCIceCandidate) => void;

const calleeSocketListeners = (
  socket: Socket | null,
  addIceCandidatePeerConnection: AddIceCandidateFunc
) => {
  socket?.on("iceToClient", (iceC) => {
    addIceCandidatePeerConnection(iceC);
  });
};

export default calleeSocketListeners;
