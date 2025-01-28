import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Video } from "lucide-react";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import updateCallStatus from "@/redux-elements/actions/updateCallStatus";
import { useAppDispatch, useAppSelector } from "@/redux-elements/hooks";
import startLocalVideoStream from "./startLocalVideoStream";

import addStream from "@/redux-elements/actions/addStream";
import ActionButtonCareDropDown from "../ActionButtonCareDropDown";
import getDevices from "./getDevices";

type VideoButtonProps = {
  smallFeedEl: React.MutableRefObject<HTMLVideoElement | null>;
};

const VideoButton = ({ smallFeedEl }: VideoButtonProps) => {
  const dispatch = useAppDispatch();
  const callStatus = useAppSelector((state: RootState) => state.callStatus);
  const streams = useAppSelector((state: RootState) => state.stream);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [careOpen, setCareOpen] = useState<boolean>(false);
  const [videoDeviceList, setvideoDeviceList] = useState<MediaDeviceInfo[]>([]);

  const changeVideoDevice = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = e.target.value;
    console.log("Selected Video Device ID:", deviceId);

    try {
      const newVideoStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });

      const existingAudioTracks =
        streams.localStream?.stream?.getAudioTracks() || [];
      const combinedStream = new MediaStream([
        ...existingAudioTracks,
        ...newVideoStream.getVideoTracks(),
      ]);

      dispatch(updateCallStatus("videoDevice", deviceId));
      dispatch(updateCallStatus("video", "enabled"));

      if (smallFeedEl.current) {
        smallFeedEl.current.srcObject = combinedStream;
        smallFeedEl.current.muted = true;
      }

      dispatch(addStream("localStream", combinedStream));

      startLocalVideoStream(
        {
          ...streams,
          localStream: {
            ...streams.localStream,
            stream: combinedStream,
          },
        },
        dispatch
      );
    } catch (error) {
      console.error("Error switching video device:", error);
    }
  };

  const handleVideoClick = () => {
    const localStream = streams.localStream?.stream;

    if (callStatus.video === "enabled") {
      console.log("Disabling video...");
      dispatch(updateCallStatus("video", "disabled"));
      localStream?.getVideoTracks().forEach((t) => {
        t.enabled = false;
        console.log(`Track ${t.label} disabled`);
      });
      console.log("Video disabled");
    } else if (callStatus.video === "disabled") {
      console.log("Enabling video...");
      dispatch(updateCallStatus("video", "enabled"));
      localStream?.getVideoTracks().forEach((t) => {
        t.enabled = true;
        console.log(`Track ${t.label} enabled`);
      });
      console.log("Video enabled");
    } else if (callStatus.haveMedia && smallFeedEl.current && localStream) {
      console.log("Setting up video stream for small feed...");
      smallFeedEl.current.srcObject = localStream;
      smallFeedEl.current.muted = true;
      console.log("Starting local video stream...");
      startLocalVideoStream(streams, dispatch);
      console.log("Local video stream started");
      dispatch(updateCallStatus("video", "enabled"));
    } else {
      console.log("No video track yet, will request new camera track...");
      setPendingUpdate(true);
      dispatch(updateCallStatus("video", "enabled"));
    }
  };

  useEffect(() => {
    if (pendingUpdate && callStatus.haveMedia && smallFeedEl.current) {
      console.log("Pending update succeeded, setting up small feed...");
      setPendingUpdate(false);
      const localStream = streams.localStream?.stream;
      if (localStream) {
        smallFeedEl.current.srcObject = localStream;
        smallFeedEl.current.muted = true;
        startLocalVideoStream(streams, dispatch);
      }
    }
  }, [pendingUpdate, callStatus.haveMedia, streams, smallFeedEl, dispatch]);

  useEffect(() => {
    if (careOpen) {
      const fetchDevices = async () => {
        const availableDevices = await getDevices();
        setvideoDeviceList(availableDevices.videoDevices);
      };
      fetchDevices();
    }
  }, [careOpen]);

  return (
    <div className="relative">
      <button
        onClick={handleVideoClick}
        className="flex flex-col items-center justify-center p-2 bg-inherit hover:bg-gray-600 text-white focus:outline-none rounded-md transition-colors"
      >
        <Video className="w-6 h-6 mb-1" />
        <span className="text-sm">
          {callStatus.video === "enabled" ? "Stop" : "Start"} Video
        </span>
      </button>

      <button
        className="absolute top-1 right-1 p-1 bg-gray-600 hover:bg-gray-500 rounded-full focus:outline-none transition-colors"
        aria-label="Toggle Options"
        onClick={() => setCareOpen(!careOpen)}
      >
        {careOpen ? (
          <ChevronDown className="w-4 h-4 text-white" />
        ) : (
          <ChevronUp className="w-4 h-4 text-white" />
        )}
      </button>
      {careOpen && (
        <ActionButtonCareDropDown
          deviceList={videoDeviceList}
          defaultValue={callStatus.videoDevice}
          onChangeDevice={changeVideoDevice}
          type="video"
        />
      )}
    </div>
  );
};

export default VideoButton;
