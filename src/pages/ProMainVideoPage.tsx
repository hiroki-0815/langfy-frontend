import ActionButtons from "@/components/video-call/ActionButtons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-elements/hooks";
import addStream from "@/redux-elements/actions/addStream";
import updateCallStatus, {
  setCallDescription,
} from "@/redux-elements/actions/updateCallStatus";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import { useSelector } from "react-redux";
import { useSocket } from "@/context/SocketContext";
import { createPeerConnection } from "@/WebRTCUutilities/createPeerConnection";
import calleeSocketListeners from "@/WebRTCUutilities/CalleeSocketListeners";
import { StreamsType } from "@/redux-elements/type";
import TimerApp from "@/components/LanguageTimer";
import { useTranslation } from "react-i18next";
import TopicPicker from "@/components/TopicPicker";

const ProMainVideoPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const streams = useAppSelector((state: RootState) => state.stream);
  const smallFeedEl = useRef(null);
  const largeFeedEl = useRef<HTMLVideoElement | null>(null);
  const callStatus = useSelector((state: RootState) => state.callStatus);
  const { socket } = useSocket();
  const offerIdRef = useRef<string | null>(null);
  const [haveGottenIce, setHaveGottenIce] = useState<boolean>(false);
  const streamsRef = useRef<StreamsType | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const [showMessage, setShowMessage] = useState(true);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const currentStreamsRef = useRef(streams);
  const [isTopicPickerVisible, setIsTopicPickerVisible] = useState(false);

  useEffect(() => {
    currentStreamsRef.current = streams;
  }, [streams]);

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = { video: true, audio: true };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        dispatch(updateCallStatus("haveMedia", true));
        dispatch(addStream("localStream", stream));
        localStreamRef.current = stream;

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
              setShowMessage(false);
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

  const addIce = (iceC: RTCIceCandidate) => {
    const offerId = offerIdRef.current;
    if (!offerId) {
      console.warn("Offer ID is not available yet.");
      return;
    }
    socket?.emit("iceServer", { iceC, offerId, who: "callee" });
  };

  useEffect(() => {
    const cleanupMedia = () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          console.log("Stopping track from localStreamRef:", track.kind);
          track.stop();
        });
        localStreamRef.current = null;
      }
      if (currentStreamsRef.current.localStream?.stream) {
        currentStreamsRef.current.localStream.stream
          .getTracks()
          .forEach((track) => {
            console.log("Stopping track from Redux localStream:", track.kind);
            track.stop();
          });
      }
      Object.values(currentStreamsRef.current).forEach((streamData) => {
        if (streamData.peerConnection) {
          streamData.peerConnection.close();
        }
      });
    };

    window.addEventListener("beforeunload", cleanupMedia);

    return () => {
      cleanupMedia();
      window.removeEventListener("beforeunload", cleanupMedia);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          console.log(
            "Route change: Stopping track from localStreamRef:",
            track.kind
          );
          track.stop();
        });
        localStreamRef.current = null;
      }
      if (currentStreamsRef.current.localStream?.stream) {
        currentStreamsRef.current.localStream.stream
          .getTracks()
          .forEach((track) => {
            console.log(
              "Route change: Stopping track from Redux localStream:",
              track.kind
            );
            track.stop();
          });
      }
      Object.values(currentStreamsRef.current).forEach((streamData) => {
        if (streamData.peerConnection) {
          streamData.peerConnection.close();
        }
      });
    };
  }, [location.pathname]);

  return (
    <div className="relative">
      <div className="relative">
        <video
          ref={largeFeedEl}
          className="h-[100vh] w-full object-cover scale-x-[-1] bg-black"
          autoPlay
          playsInline
        ></video>

        {showMessage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg">
            <p>{t("videoCallMessage")}</p>
          </div>
        )}
      </div>
      <video
        ref={smallFeedEl}
        className="
          absolute border border-blue-400 
          right-4 top-4 w-[160px] rounded-md scale-x-[-1]
          md:right-[50px] md:top-[100px] md:w-[320px]
        "
        autoPlay
        controls
        playsInline
      ></video>
      <ActionButtons
        smallFeedEl={smallFeedEl}
        largeFeedEl={largeFeedEl}
        isTimerVisible={isTimerVisible}
        isTopicPickerVisible={isTopicPickerVisible}
        setIsTimerVisible={setIsTimerVisible}
        setIsTopicPickerVisible={setIsTopicPickerVisible}
      />
      <div
        className={`absolute right-4 top-[150px] w-[300px] md:w-[320px] rounded-md  p-4 
        md:left-[50px] md:top-[80px] ${isTimerVisible ? "block" : "hidden"}`}
      >
        <TimerApp />
      </div>
      <div
        className={`absolute right-4 top-[300px] w-[300px] md:w-[320px] rounded-md  p-4 
        md:left-[50px] md:top-[350px] ${
          isTopicPickerVisible ? "block" : "hidden"
        }`}
      >
        <TopicPicker />
      </div>
    </div>
  );
};

export default ProMainVideoPage;
