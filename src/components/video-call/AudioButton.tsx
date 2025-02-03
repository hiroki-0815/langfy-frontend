import { RootState } from "@/redux-elements/reducers/rootReducers";
import { ChevronUp, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionButtonCareDropDown from "../ActionButtonCareDropDown";
import updateCallStatus from "@/redux-elements/actions/updateCallStatus";
import { useAppDispatch, useAppSelector } from "@/redux-elements/hooks";
import addStream from "@/redux-elements/actions/addStream";

import getDevices from "./getDevices";
import startAudioStream from "./startAudioStream";

type AudioButtonProps = {
  smallFeedEl: React.MutableRefObject<HTMLAudioElement | null>;
};

const AudioButton = ({ smallFeedEl }: AudioButtonProps) => {
  const dispatch = useAppDispatch();
  const streams = useAppSelector((state: RootState) => state.stream);
  const callStatus = useSelector((state: RootState) => state.callStatus);
  const [careOpen, setCareOpen] = useState<boolean>(false);
  const [audioDeviceList, setAudioDeviceList] = useState<MediaDeviceInfo[]>([]);

  let micText;
  if (callStatus.audio === "off") {
    micText = "Join Audio";
  } else if (callStatus.audio === "enabled") {
    micText = "Mute";
  } else {
    micText = "Unmute";
  }

  const changeAudioDevice = async (e: any) => {
    const deviceId = e.target.value.slice(5);
    const audioType = e.target.value.slice(0, 5);

    if (audioType === "ouput") {
      if (smallFeedEl.current?.setSinkId) {
        smallFeedEl.current.setSinkId(deviceId);
      }
    } else if (audioType === "input") {
      try {
        const newAudioStream = await navigator.mediaDevices.getUserMedia({
          audio: { deviceId: { exact: deviceId } },
        });

        const [newAudioTrack] = newAudioStream.getAudioTracks();

        const existingVideoTracks =
          streams.localStream?.stream?.getVideoTracks() || [];
        const combinedStream = new MediaStream([
          ...existingVideoTracks,
          ...newAudioStream.getAudioTracks(),
        ]);

        dispatch(updateCallStatus("audioDevice", deviceId));
        dispatch(updateCallStatus("audio", "enabled"));
        dispatch(addStream("localStream", combinedStream));

        for (const key in streams) {
          if (key !== "localStream") {
            const peerConnection = streams[key].peerConnection;
            const senders = peerConnection?.getSenders();
            const audioSender = senders?.find(
              (sender) =>
                sender.track && sender.track.kind === newAudioTrack.kind
            );
            if (audioSender) {
              audioSender.replaceTrack(newAudioTrack);
            }
          }
        }
        startAudioStream({
          ...streams,
          localStream: {
            ...streams.localStream,
            stream: combinedStream,
          },
        });
      } catch (error) {
        console.error("Error switching audio device:", error);
      }
    }
  };

  useEffect(() => {
    const fetchDevices = async () => {
      if (careOpen) {
        const availableDevices = await getDevices();
        setAudioDeviceList(
          availableDevices.audioOutputDevices.concat(
            availableDevices.audioInputDevices
          )
        );
      }
    };
    fetchDevices();
  }, [careOpen]);

  const handleAudioClick = () => {
    if (!streams.localStream?.stream) {
      console.log("No local audio yet. Requesting default audio...");
      changeAudioDevice({ target: { value: "inputdefault" } });
      return;
    }

    if (callStatus.audio === "enabled") {
      console.log("Disabling audio...");
      dispatch(updateCallStatus("audio", "disabled"));
      const tracks = streams.localStream.stream.getAudioTracks();
      tracks.forEach((t) => {
        t.enabled = false;
        console.log(`Track ${t.label} disabled`);
      });
      console.log("Audio disabled");
    } else if (callStatus.audio === "disabled") {
      console.log("Enabling audio...");
      dispatch(updateCallStatus("audio", "enabled"));
      const tracks = streams.localStream.stream.getAudioTracks();
      tracks.forEach((t) => {
        t.enabled = true;
        console.log(`Track ${t.label} enabled`);
      });
      console.log("Audio enabled");
    } else {
      console.log("Joining audio with default device...");
      changeAudioDevice({ target: { value: "inputdefault" } });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleAudioClick}
        className="flex flex-col items-center justify-center p-2 bg-inherit hover:bg-gray-600 text-white"
      >
        <Mic className="w-6 h-6 mb-1" />
        <span className="text-sm">{micText}</span>
      </button>
      <button
        className="absolute top-[1px] right-[1px] p-1 bg-gray-600 hover:bg-gray-500 rounded-full"
        onClick={() => setCareOpen(!careOpen)}
      >
        <ChevronUp className="w-4 h-4 text-white" />
      </button>
      {careOpen && (
        <ActionButtonCareDropDown
          deviceList={audioDeviceList}
          defaultValue={callStatus.audioDevice}
          onChangeDevice={changeAudioDevice}
          type="audio"
        />
      )}
    </div>
  );
};

export default AudioButton;
