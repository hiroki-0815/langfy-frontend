import { MutableRefObject, useEffect, useRef } from "react";
import { Users, MessageSquare, Monitor } from "lucide-react";
import HangupButton from "./HangupButton";
import VideoButton from "./VideoButton";
import AudioButton from "./AudioButton";

type ActionButtonsProps = {
  smallFeedEl: MutableRefObject<HTMLVideoElement | null>;
};

const ActionButtons = ({ smallFeedEl }: ActionButtonsProps) => {
  const menuButtons = useRef<HTMLDivElement | null>(null);
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const setTimer = () => {
      timer = setTimeout(() => {
        menuButtons.current?.classList.add("hidden");
      }, 4000);
    };

    window.addEventListener("mousemove", () => {
      if (menuButtons.current?.classList.contains("hidden")) {
        menuButtons.current.classList.remove("hidden");
        setTimer();
      } else {
        clearTimeout(timer);
        setTimer();
      }
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <div
      ref={menuButtons}
      className="flex flex-row items-center justify-between bg-gray-800 shadow-md transition-all duration-300 px-10"
    >
      <div className="flex space-x-1">
        <AudioButton smallFeedEl={smallFeedEl} />
        <VideoButton smallFeedEl={smallFeedEl} />
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-6 ">
        <button className="flex flex-col items-center text-white hover:text-blue-400">
          <Users className="w-6 h-6" /> {/* Participants Icon */}
          <span className="text-sm">Participants</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-blue-400">
          <MessageSquare className="w-6 h-6" /> {/* Chat Icon */}
          <span className="text-sm">Chat</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-blue-400">
          <Monitor className="w-6 h-6" /> {/* Share Screen Icon */}
          <span className="text-sm">Share Screen</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="text-end">
        <HangupButton />
      </div>
    </div>
  );
};

export default ActionButtons;
