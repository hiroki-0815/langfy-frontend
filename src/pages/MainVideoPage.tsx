import ActionButtons from "@/components/video-call/ActionButtons";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux-elements/hooks";
import addStream from "@/redux-elements/actions/addStream";
import updateCallStatus, {
  setCallDescription,
} from "@/redux-elements/actions/updateCallStatus";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import { useSocket } from "@/context/SocketContext";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams, useLocation } from "react-router-dom";
import { useGetMyUser } from "@/api/MyUserApi";
import { useSelector } from "react-redux";
import { createPeerConnection } from "@/WebRTCUutilities/createPeerConnection";
import callerSocketListeners from "@/WebRTCUutilities/CallerSocketListeners";
import { StreamsType } from "@/redux-elements/type";
import TimerApp from "@/components/LanguageTimer";

const MainVideoPage = () => {
  const dispatch = useAppDispatch();
  const streams = useAppSelector((state: RootState) => state.stream);
  const smallFeedEl = useRef<HTMLVideoElement | null>(null);
  const largeFeedEl = useRef<HTMLVideoElement | null>(null);
  const { socket } = useSocket();
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("receiverId");
  const callStatus = useSelector((state: RootState) => state.callStatus);
  const { currentUser } = useGetMyUser();
  const location = useLocation();
  const videoCallUrl = `${window.location.origin}${location.pathname}${location.search}`;
  const offerIdRef = useRef<string | null>(null);
  const streamsRef = useRef<StreamsType | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const currentStreamsRef = useRef(streams);
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
    if (streams.remote1) {
      streamsRef.current = streams;
    }
  }, [streams]);

  useEffect(() => {
    const createOffer = async () => {
      try {
        const offerId = uuidv4();
        offerIdRef.current = offerId;
        const callerId = currentUser?._id;

        for (const key in streams) {
          if (key !== "localStream") {
            const peerConnection = streams[key]?.peerConnection;
            if (peerConnection) {
              try {
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);

                console.log(peerConnection.signalingState);

                const OfferInfo = {
                  offerId,
                  receiverId,
                  videoCallUrl,
                  callerId,
                };
                socket?.emit("newOffer", offer, OfferInfo);

                socket?.on("answerToClient", ({ answer, offerId }) => {
                  console.log("Received answer:", answer, "Offer ID:", offerId);
                  dispatch(setCallDescription(answer));
                  dispatch(updateCallStatus("offerId", offerId));
                });
              } catch (error) {
                console.error(
                  `Error creating offer for peerConnection: ${error}`
                );
              }
            }
          }
        }

        dispatch(updateCallStatus("haveCreatedOffer", true));
      } catch (error) {
        console.error(`Error in createOffer function: ${error}`);
      }
    };
    if (
      callStatus.audio === "enabled" &&
      callStatus.video === "enabled" &&
      !callStatus.haveCreatedOffer
    ) {
      createOffer();
    }
  }, [callStatus.audio, callStatus.video, callStatus.haveCreatedOffer]);

  useEffect(() => {
    const AddAnswer = async () => {
      for (const s in streams) {
        if (s !== "localStream") {
          const peerConnection = streams[s].peerConnection;

          if (callStatus.answer) {
            await peerConnection?.setRemoteDescription(callStatus.answer);
            console.log(peerConnection?.signalingState);
            console.log("Answer added!");
          } else {
            console.error(
              "callStatus.answer is null, skipping setRemoteDescription."
            );
          }
        }
      }
    };
    if (callStatus.answer) {
      AddAnswer();
    }
  }, [callStatus.answer]);

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
    callerSocketListeners(socket, addIceCandidateToPeerConnection);
  }, []);

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

  useEffect(() => {
    const handleToggleTimerVisibility = (data: { isTimerVisible: boolean }) => {
      setIsTimerVisible(data.isTimerVisible);
      console.log("Received toggleTimerVisibility event:", data);
    };
    socket?.on("toggleTimerVisibility", handleToggleTimerVisibility);
    return () => {
      socket?.off("toggleTimerVisibility", handleToggleTimerVisibility);
    };
  }, [socket]);

  const addIce = (iceC: RTCIceCandidate) => {
    const offerId = offerIdRef.current;
    if (!offerId) {
      console.error("Offer ID is not set yet!");
      return;
    }
    socket?.emit("iceServer", {
      iceC,
      offerId,
      who: "caller",
    });
  };

  return (
    <div className="relative">
      <video
        ref={largeFeedEl}
        className="h-[100vh] w-full object-cover scale-x-[-1] bg-black"
        autoPlay
        playsInline
      ></video>
      <video
        ref={smallFeedEl}
        className="
          absolute border border-blue-400 
          right-4 top-4 w-[160px] rounded-md scale-x-[-1]
          md:right-[50px] md:top-[80px] md:w-[320px]
        "
        autoPlay
        controls
        playsInline
      ></video>
      <ActionButtons
        smallFeedEl={smallFeedEl}
        largeFeedEl={largeFeedEl}
        isTimerVisible={isTimerVisible}
        setIsTimerVisible={setIsTimerVisible}
      />
      <div
        className={`absolute left-4 top-4 w-[160px] md:w-[320px] rounded-md 
        md:left-[50px] md:top-[80px] ${isTimerVisible ? "block" : "hidden"}`}
      >
        <TimerApp />
      </div>
    </div>
  );
};

export default MainVideoPage;
