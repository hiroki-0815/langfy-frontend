import ActionButtons from "@/components/video-call/ActionButtons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-elements/hooks";
import addStream from "@/redux-elements/actions/addStream";
import updateCallStatus, {
  setCallDescription,
} from "@/redux-elements/actions/updateCallStatus";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import { useSearchParams, useLocation } from "react-router-dom";
import { Clipboard, ClipboardCheck } from "lucide-react"; // Lucide icons for copy
import { useGetMyUser } from "@/api/MyUserApi";
import { useSelector } from "react-redux";
import { useSocket } from "@/context/SocketContext";
import { createPeerConnection } from "@/WebRTCUutilities/createPeerConnection";
import calleeSocketListeners from "@/WebRTCUutilities/CalleeSocketListeners";
import { StreamsType } from "@/redux-elements/type";

const ProMainVideoPage = () => {
  const dispatch = useAppDispatch();
  const streams = useAppSelector((state: RootState) => state.stream);
  const smallFeedEl = useRef(null);
  const largeFeedEl = useRef<HTMLVideoElement | null>(null);
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const callStatus = useSelector((state: RootState) => state.callStatus);
  const { socket } = useSocket();

  const { currentUser } = useGetMyUser();
  const isCaller = currentUser?._id !== receiverId;

  const [copied, setCopied] = useState<boolean>(false);
  const [callerIsReady, setCallerIsReady] = useState<boolean>(false);
  const [calleeIsReady, setCalleeIsReady] = useState<boolean>(false);
  const location = useLocation();
  const videoCallUrl = `${window.location.origin}${location.pathname}${location.search}`;

  const offerIdRef = useRef<string | null>(null);

  const [haveGottenIce, setHaveGottenIce] = useState<boolean>(false);
  const streamsRef = useRef<StreamsType | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = { video: true, audio: true };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(updateCallStatus("haveMedia", true));
        dispatch(addStream("localStream", stream));
        const { peerConnection, remoteStream } = await createPeerConnection(
          addIce
        );
        dispatch(addStream("remote1", remoteStream, peerConnection));
        if (largeFeedEl.current) {
          largeFeedEl.current.srcObject = remoteStream;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedia();
    console.log("Fetching media and creating peer connections.");
  }, []);

  useEffect(() => {
    const fetchIceCandidates = async () => {
      const offerId = offerIdRef.current;
      if (!offerId) {
        console.warn("⚠️ No offerId available to fetch ICE candidates.");
        return;
      }
      if (!socket) {
        console.warn("⚠️ Socket is not initialized.");
        return;
      }

      try {
        const iceCandidates = await socket.emitWithAck(
          "getIce",
          offerId,
          "caller"
        );
        iceCandidates.forEach((iceC: RTCIceCandidate) => {
          for (const s in streams) {
            if (s !== "localStream") {
              const peerConnection = streams[s].peerConnection;
              peerConnection?.addIceCandidate(iceC);
              console.log("=====Added Ice Candidate!!!");
            }
          }
        });
        console.log("✅ Received ICE candidates:", iceCandidates);
      } catch (error) {
        console.error("❌ Error fetching ICE candidates:", error);
      }
    };
    if (streams.remote1 && !haveGottenIce) {
      setHaveGottenIce(true);
      fetchIceCandidates();
      streamsRef.current = streams;
    }
  }, [streams, haveGottenIce]);

  useEffect(() => {
    const setOffer = async () => {
      console.log(callStatus.offer);
      for (const s in streams) {
        if (s !== "localStream") {
          const peerConnection = streams[s]?.peerConnection;
          if (peerConnection) {
            try {
              await peerConnection.setRemoteDescription(
                callStatus.offer as RTCSessionDescriptionInit
              );
              console.log(peerConnection.signalingState);
            } catch (error) {
              console.error("❌ Error setting remote description:", error);
            }
          }
        }
      }
    };

    if (callStatus.offer && streams.remote1 && streams.remote1.peerConnection)
      setOffer();
  }, [callStatus.offer, streams.remote1]);

  useEffect(() => {
    const createAnswer = async () => {
      for (const s in streams) {
        if (s !== "localStream") {
          const peerConnection = streams[s].peerConnection;
          const callerId = callStatus.callerId;
          const offerId = callStatus.offerId;

          if (peerConnection) {
            try {
              const answer = await peerConnection.createAnswer({});
              console.log(answer);

              await peerConnection.setLocalDescription(answer);
              console.log(
                "Answer created and set. New signaling state:",
                peerConnection.signalingState
              );
              dispatch(updateCallStatus("haveCreatedAnswer", true));
              dispatch(setCallDescription(answer));
              console.log("Emitting newAnswer with offerId:", offerId);
              console.log("Emitting newAnswer with callerId:", callerId);
              socket?.emit("newAnswer", { answer, callerId, offerId });
            } catch (error) {
              console.error("Error creating or setting answer:", error);
            }
          }
        }
      }
    };
    if (
      callStatus.audio === "enabled" &&
      callStatus.video === "enabled" &&
      !callStatus.haveCreatedAnswer
    ) {
      createAnswer();
    }
  }, [callStatus.audio, callStatus.video, callStatus.haveCreatedAnswer]);

  useEffect(() => {
    offerIdRef.current = callStatus.offerId;
  }, [callStatus.offerId]);

  useEffect(() => {
    const addIceCandidateToPeerConnection = (iceC: RTCIceCandidate) => {
      for (const s in streamsRef.current) {
        if (s !== "localStream") {
          const peerConnection = streamsRef.current[s].peerConnection;
          peerConnection?.addIceCandidate(iceC);
          console.log("add an icecandidate to existing page presence");
        }
      }
    };
    calleeSocketListeners(socket, addIceCandidateToPeerConnection);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoCallUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addIce = (iceC: RTCIceCandidate) => {
    const offerId = offerIdRef.current;
    if (!offerId) {
      console.warn("Offer ID is not available yet.");
      return;
    }
    socket?.emit("iceServer", { iceC, offerId, who: "callee" });
  };

  return (
    <div className="flex flex-col items-start justify-center p-4">
      {/* Video Call Controls */}
      <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md mb-4">
        {/* Ready? Button */}
        {isCaller && (
          <button
            onClick={() => setCallerIsReady(true)}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              callerIsReady ? "bg-green-500" : "bg-blue-500"
            } hover:opacity-80 transition`}
          >
            {callerIsReady ? "Ready! ✅" : "Ready?"}
          </button>
        )}

        {!isCaller && (
          <button
            onClick={() => setCalleeIsReady(true)}
            className={`px-4 py-2 rounded-md text-white font-semibold ${
              calleeIsReady ? "bg-green-500" : "bg-purple-500"
            } hover:opacity-80 transition`}
          >
            {calleeIsReady ? "Ready! ✅" : "Ready?"}
          </button>
        )}

        {/* Video Call URL */}
        <span className="mx-3 text-sm font-medium truncate max-w-[200px] md:max-w-full">
          {videoCallUrl}
        </span>

        {/* Copy Button */}
        <button
          onClick={handleCopyLink}
          className="ml-2 p-2 rounded-md hover:bg-gray-200"
        >
          {copied ? (
            <ClipboardCheck size={20} className="text-green-500" />
          ) : (
            <Clipboard size={20} />
          )}
        </button>
      </div>

      {/* Video Feeds */}
      <div className="relative">
        <video
          ref={largeFeedEl}
          className="bg-black h-[100vh] w-full scale-x-[-1]"
          autoPlay
          controls
          playsInline
        ></video>
        <video
          ref={smallFeedEl}
          className="absolute border border-blue-400 right-[50px] top-[100px] rounded-[10px] w-[320px] scale-x-[-1]"
          autoPlay
          controls
          playsInline
        ></video>

        <ActionButtons smallFeedEl={smallFeedEl} largeFeedEl={largeFeedEl} />
      </div>
    </div>
  );
};

export default ProMainVideoPage;
