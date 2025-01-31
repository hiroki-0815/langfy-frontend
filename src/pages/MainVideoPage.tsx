import ActionButtons from "@/components/video-call/ActionButtons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-elements/hooks";
import addStream from "@/redux-elements/actions/addStream";
import createPeerConnection from "@/WebRTCUutilities/createPeerConnection";
import updateCallStatus from "@/redux-elements/actions/updateCallStatus";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import { useSocket } from "@/context/SocketContext";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams, useLocation } from "react-router-dom";
import { Clipboard, ClipboardCheck } from "lucide-react"; // Lucide icons for copy
import { useGetMyUser } from "@/api/MyUserApi";
import { useSelector } from "react-redux";

const MainVideoPage = () => {
  const dispatch = useAppDispatch();
  const streams = useAppSelector((state: RootState) => state.stream);
  const smallFeedEl = useRef(null);
  const largeFeedEl = useRef(null);
  const { socket } = useSocket();
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const callStatus = useSelector((state: RootState) => state.callStatus);

  const { currentUser } = useGetMyUser();
  const isCaller = currentUser?._id !== receiverId;

  const [copied, setCopied] = useState(false);
  const [callerIsReady, setCallerIsReady] = useState(false);
  const [calleeIsReady, setCalleeIsReady] = useState(false);
  const location = useLocation();
  const videoCallUrl = `${window.location.origin}${location.pathname}${location.search}`;

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = { video: true, audio: true };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(updateCallStatus("haveMedia", true));
        dispatch(addStream("localStream", stream));
        const { peerConnection, remoteStream } = await createPeerConnection();
        dispatch(addStream("remote1", remoteStream, peerConnection));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedia();
    console.log("Fetching media and creating peer connections.");
  }, []);

  useEffect(() => {
    const createOffer = async () => {
      const offerId = uuidv4();
      for (const key in streams) {
        if (key !== "localStream") {
          try {
            const peerConnection = streams[key].peerConnection;
            const offer = await peerConnection?.createOffer();
            peerConnection?.setLocalDescription(offer);
            console.log(peerConnection?.signalingState);
            const OfferInfo = { offerId, receiverId, videoCallUrl };
            socket?.emit("newOffer", offer, OfferInfo);
          } catch (error) {
            console.log(`Error creating offer for peerConnection ${error}:`);
          }
        }
      }
      dispatch(updateCallStatus("haveCreatedOffer", true));
    };
    if (
      callStatus.audio === "enabled" &&
      callStatus.video === "enabled" &&
      !callStatus.haveCreatedOffer
    ) {
      createOffer();
    }
  }, [callStatus.audio, callStatus.video, callStatus.haveCreatedOffer]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoCallUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        <ActionButtons smallFeedEl={smallFeedEl} />
      </div>
    </div>
  );
};

export default MainVideoPage;
