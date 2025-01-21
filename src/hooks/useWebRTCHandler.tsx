// import { setShowOverlay } from "@/store/actions";
// import store from "../store/store";
// import Peer, { SignalData } from "simple-peer";
// import { signalPeerData } from "@/socket";

// let localStream: MediaStream | null = null;

// type ConnectionProps = {
//   isRoomHost: boolean;
//   identity: string;
//   roomId: string | null;
//   createNewRoom: (identity: string) => void;
//   joinRoom: (roomId: string, identity: string) => void;
// };

// export const getLocalPreviewAndInitRoomConnection = async ({
//   isRoomHost,
//   identity,
//   roomId = null,
//   createNewRoom,
//   joinRoom,
//   localVideoRef,
// }: ConnectionProps & {
//   localVideoRef: React.RefObject<HTMLVideoElement>;
// }): Promise<void> => {
//   console.log("getLocalPreviewAndInitRoomConnection called");
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });

//     if (!localVideoRef.current) {
//       console.warn("localVideoRef is not ready. Retrying...");
//       return;
//     }

//     localStream = stream;
//     showLocalVideoPreview(localStream, localVideoRef);

//     store.dispatch(setShowOverlay(false));

//     if (isRoomHost) {
//       createNewRoom(identity);
//     } else if (roomId) {
//       joinRoom(roomId, identity);
//     } else {
//       console.error("Error: roomId is required for joining a room.");
//     }
//   } catch (err) {
//     console.error("Error occurred when trying to access local stream:", err);
//   }
// };

// type PeerConnectionProps = {
//   connUserSocketId: string;
//   isInitiator: boolean;
// };

// type SignalingData = {
//   signal: SignalData;
//   connUserSocketId: string;
// };

// let peers: Record<string, InstanceType<typeof Peer>> = {};
// let streams: MediaStream[] = [];

// const getConfiguration = () => {
//   return {
//     iceServers: [
//       {
//         urls: "stun:stun.l.google.com:19302",
//       },
//     ],
//   };
// };

// export const prepareNewPeerConnection = ({
//   connUserSocketId,
//   isInitiator,
//   remoteVideosContainerRef,
// }: PeerConnectionProps & {
//   remoteVideosContainerRef: React.RefObject<HTMLDivElement>;
// }) => {
//   const configuration = getConfiguration();

//   if (peers[connUserSocketId]) {
//     console.log("Already have a peer for this socketId. Skipping...");
//     return;
//   }
//   console.log("Creating Peer instance for", connUserSocketId);
//   try {
//     console.log("localStream:", localStream);
//     if (localStream) {
//       console.log("Tracks:", localStream.getTracks());
//     }
//     if (!localStream) {
//       console.error("localStream is missing, cannot create Peer.");
//       return;
//     }
//     peers[connUserSocketId] = new Peer({
//       initiator: isInitiator,
//       config: configuration,
//       stream: localStream,
//     });
//   } catch (err) {
//     console.error("Error creating Peer instance:", err);
//     return;
//   }
//   console.log("Peer instance created:", peers[connUserSocketId]);

//   peers[connUserSocketId].on("signal", (data) => {
//     console.log("Peer signal for", connUserSocketId, data);
//     const signalData: SignalingData = {
//       signal: data,
//       connUserSocketId: connUserSocketId,
//     };
//     signalPeerData(signalData);
//   });

//   peers[connUserSocketId].on("stream", (stream) => {
//     console.log("Peer stream for", connUserSocketId);
//     console.log("New stream received");
//     addStream(stream, connUserSocketId, remoteVideosContainerRef);
//     streams = [...streams, stream];
//   });
// };

// export const handleSignalingData = (data: SignalingData) => {
//   const peer = peers[data.connUserSocketId];
//   if (peer) {
//     peer.signal(data.signal);
//   } else {
//     console.error(`Peer with socket ID ${data.connUserSocketId} not found.`);
//   }
// };

// const showLocalVideoPreview = (
//   stream: MediaStream,
//   videoRef: React.RefObject<HTMLVideoElement>
// ): void => {
//   if (videoRef.current) {
//     try {
//       videoRef.current.srcObject = stream;
//       videoRef.current.play().catch((err) => {
//         console.error("Error playing local video within play() call:", err);
//       });
//     } catch (err) {
//       console.error("Error setting up local video preview:", err);
//     }
//   } else {
//     console.warn("Video element is not available");
//   }
// };

// const addStream = (
//   stream: MediaStream,
//   connUserSocketId: string,
//   remoteVideosContainerRef: React.RefObject<HTMLDivElement>
// ): void => {
//   if (!remoteVideosContainerRef.current) {
//     console.warn("Remote videos container is not available");
//     return;
//   }

//   const videoElement = document.createElement("video");
//   videoElement.srcObject = stream;
//   videoElement.autoplay = true;
//   videoElement.muted = true;
//   videoElement.className = "remote-video";
//   videoElement.dataset.socketId = connUserSocketId;

//   remoteVideosContainerRef.current.appendChild(videoElement);

//   console.log(`Added stream for user ${connUserSocketId}`);
// };

// useWebRTCHandler.ts

import { setShowOverlay } from "@/store/actions";
import store from "../store/store";
import Peer, { SignalData } from "simple-peer";
import { signalPeerData } from "@/socket";

let localStream: MediaStream | null = null;

type ConnectionProps = {
  isRoomHost: boolean;
  identity: string;
  roomId: string | null;
  createNewRoom: (identity: string) => void;
  joinRoom: (roomId: string, identity: string) => void;
};

export const getLocalPreviewAndInitRoomConnection = async ({
  isRoomHost,
  identity,
  roomId = null,
  createNewRoom,
  joinRoom,
  localVideoRef,
}: ConnectionProps & {
  localVideoRef: React.RefObject<HTMLVideoElement>;
}): Promise<void> => {
  // If you're in an SSR environment, exit early.
  if (typeof window === "undefined") return;

  console.log("getLocalPreviewAndInitRoomConnection called");
  try {
    // Access camera and microphone
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    if (!localVideoRef.current) {
      console.warn("localVideoRef is not ready. Retrying...");
      return;
    }

    localStream = stream;
    showLocalVideoPreview(localStream, localVideoRef);

    store.dispatch(setShowOverlay(false));

    if (isRoomHost) {
      createNewRoom(identity);
    } else if (roomId) {
      joinRoom(roomId, identity);
    } else {
      console.error("Error: roomId is required for joining a room.");
    }
  } catch (err) {
    console.error("Error occurred when trying to access local stream:", err);
  }
};

type PeerConnectionProps = {
  connUserSocketId: string;
  isInitiator: boolean;
};

type SignalingData = {
  signal: SignalData;
  connUserSocketId: string;
};

let peers: Record<string, InstanceType<typeof Peer>> = {};
let streams: MediaStream[] = [];

const getConfiguration = () => {
  return {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // If you have TURN servers, add them here too
    ],
  };
};

export const prepareNewPeerConnection = ({
  connUserSocketId,
  isInitiator,
  remoteVideosContainerRef,
}: PeerConnectionProps & {
  remoteVideosContainerRef: React.RefObject<HTMLDivElement>;
}) => {
  // Also guard here for SSR safety
  if (typeof window === "undefined") return;

  const configuration = getConfiguration();

  if (peers[connUserSocketId]) {
    console.log("Already have a peer for this socketId. Skipping...");
    return;
  }
  console.log("Creating Peer instance for", connUserSocketId);

  try {
    if (!localStream) {
      console.error("localStream is missing, cannot create Peer.");
      return;
    }

    peers[connUserSocketId] = new Peer({
      initiator: isInitiator,
      config: configuration,
      stream: localStream,
    });
  } catch (err) {
    console.error("Error creating Peer instance:", err);
    return;
  }

  console.log("Peer instance created:", peers[connUserSocketId]);

  peers[connUserSocketId].on("signal", (data) => {
    console.log("Peer signal for", connUserSocketId, data);
    const signalData: SignalingData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("Peer stream for", connUserSocketId);
    addStream(stream, connUserSocketId, remoteVideosContainerRef);
    streams.push(stream);
  });
};

export const handleSignalingData = (data: SignalingData) => {
  const peer = peers[data.connUserSocketId];
  if (peer) {
    peer.signal(data.signal);
  } else {
    console.error(`Peer with socket ID ${data.connUserSocketId} not found.`);
  }
};

const showLocalVideoPreview = (
  stream: MediaStream,
  videoRef: React.RefObject<HTMLVideoElement>
): void => {
  if (videoRef.current) {
    try {
      videoRef.current.srcObject = stream;
      videoRef.current
        .play()
        .catch((err) =>
          console.error("Error playing local video within play() call:", err)
        );
    } catch (err) {
      console.error("Error setting up local video preview:", err);
    }
  } else {
    console.warn("Video element is not available");
  }
};

const addStream = (
  stream: MediaStream,
  connUserSocketId: string,
  remoteVideosContainerRef: React.RefObject<HTMLDivElement>
): void => {
  if (!remoteVideosContainerRef.current) {
    console.warn("Remote videos container is not available");
    return;
  }

  const videoElement = document.createElement("video");
  videoElement.srcObject = stream;
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.className = "remote-video";
  videoElement.dataset.socketId = connUserSocketId;

  remoteVideosContainerRef.current.appendChild(videoElement);
  console.log(`Added stream for user ${connUserSocketId}`);
};
