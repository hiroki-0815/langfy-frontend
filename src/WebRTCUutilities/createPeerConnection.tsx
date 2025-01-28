const createPeerConnection = (): Promise<{
  peerConnection: RTCPeerConnection;
  remoteStream: MediaStream;
}> => {
  return new Promise(async (resolve) => {
    const peerConnection = new RTCPeerConnection();

    const remoteStream = new MediaStream();
    peerConnection.addEventListener("signalingstatechange", (e) => {
      console.log("Signaling state changed", e);
    });

    peerConnection.addEventListener("icecandidate", (e) => {
      if (e.candidate) {
        console.log("ICE Candidate", e.candidate);
      }
    });

    resolve({ peerConnection, remoteStream });
  });
};

export default createPeerConnection;
