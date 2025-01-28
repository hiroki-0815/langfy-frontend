import ActionButtons from "@/components/video-call/ActionButtons";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "../redux-elements/hooks";
import addStream from "@/redux-elements/actions/addStream";
import createPeerConnection from "@/WebRTCUutilities/createPeerConnection";
import updateCallStatus from "@/redux-elements/actions/updateCallStatus";

const MainVideoPage = () => {
  const dispatch = useAppDispatch();
  const smallFeedEl = useRef(null);
  const largeFeedEl = useRef(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = {
        video: true,
        audio: true,
      };
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
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="">
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
