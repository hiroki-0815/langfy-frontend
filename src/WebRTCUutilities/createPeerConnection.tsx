import peerConfiguration from "./stunServers";

const createPeerConnection = (): Promise<{
  peerConnection: RTCPeerConnection;
  remoteStream: MediaStream;
}> => {
  return new Promise(async (resolve) => {
    const peerConnection = new RTCPeerConnection(peerConfiguration);

    const remoteStream = new MediaStream();
    peerConnection.addEventListener("signalingstatechange", (e) => {
      console.log("Signaling state changed", e);
    });

    peerConnection.addEventListener("icecandidate", (e) => {
      if (e.candidate) {
        console.log("FOUND ICE Candidate", e.candidate);
      }
    });

    resolve({ peerConnection, remoteStream });
  });
};

export default createPeerConnection;
