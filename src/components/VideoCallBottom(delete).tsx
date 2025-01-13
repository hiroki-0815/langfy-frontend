import { MicIcon, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";

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
    <div className="flex flex-row gap-3 w-[220px] text-white">
      {muted ? (
        <button onClick={toggleAudio} className="bg-slate-700 rounded-full p-2">
          <MicOff size={30} />
        </button>
      ) : (
        <button onClick={toggleAudio} className="bg-slate-700 rounded-full p-2">
          <MicIcon size={30} />
        </button>
      )}
      {playing ? (
        <button onClick={toggleVideo} className="bg-slate-700 rounded-full p-2">
          <Video size={30} />
        </button>
      ) : (
        <button onClick={toggleVideo} className="bg-slate-700 rounded-full p-2">
          <VideoOff size={30} />
        </button>
      )}
      <button
        className="text-red-500 bg-slate-700 rounded-full p-2"
        aria-label="Leave Call"
      >
        <PhoneOff size={30} />
      </button>
    </div>
  );
};

export default VideoCallBottom;
