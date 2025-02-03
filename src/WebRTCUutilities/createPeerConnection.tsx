import peerConfiguration from "./stunServers";

export const createPeerConnection = (
  addIce: (iceCandidate: RTCIceCandidate) => void
): Promise<{
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
      console.log("FOUND ICE Candidate", e.candidate);
      if (e.candidate) {
        addIce(e.candidate);
      }
    });

    peerConnection.addEventListener("track", (e) => {
      console.log("Got a track from the remote");
      e.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        console.log("Fingers crossed ...");
      });
    });

    resolve({ peerConnection, remoteStream });
  });
};
