import { MicIcon, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  muted: boolean;
  playing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
};

const VideoCallBottom = ({
  muted = true,
  playing,
  toggleAudio,
  toggleVideo,
}: Props) => {
  return (
    <div className="flex flex-row justify-between w-[220px] text-white">
      {muted ? (
        <Button onClick={toggleAudio} className="bg-slate-700 rounded-full p-2">
          <MicOff size={40} />
        </Button>
      ) : (
        <Button onClick={toggleAudio} className="bg-slate-700 rounded-full p-2">
          <MicIcon size={40} />
        </Button>
      )}
      {playing ? (
        <Button onClick={toggleVideo} className="bg-slate-700 rounded-full p-2">
          <VideoOff size={40} />
        </Button>
      ) : (
        <Button onClick={toggleVideo} className="bg-slate-700 rounded-full p-2">
          <Video size={40} />
        </Button>
      )}
      <button
        className="text-red-500 bg-slate-700 rounded-full p-2"
        aria-label="Leave Call"
      >
        <PhoneOff size={40} />
      </button>
    </div>
  );
};

export default VideoCallBottom;
