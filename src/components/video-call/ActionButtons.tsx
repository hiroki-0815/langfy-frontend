import { MutableRefObject, useRef } from "react";
import { MessageSquare } from "lucide-react";
import HangupButton from "./HangupButton";
import VideoButton from "./VideoButton";
import AudioButton from "./AudioButton";

type ActionButtonsProps = {
  smallFeedEl: MutableRefObject<HTMLVideoElement | null>;
  largeFeedEl: MutableRefObject<HTMLVideoElement | null>;
};

const ActionButtons = ({ smallFeedEl, largeFeedEl }: ActionButtonsProps) => {
  const menuButtons = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={menuButtons}
      className="
        fixed bottom-0 left-0 right-0 
        flex flex-col md:flex-row 
        items-center justify-between 
        bg-gray-800 shadow-md 
        transition-all duration-300 
        px-4 md:px-10 py-2 md:py-4
      "
    >
      {/* Audio & Video Controls */}
      <div className="flex space-x-2 md:space-x-4">
        <AudioButton smallFeedEl={smallFeedEl} />
        <VideoButton smallFeedEl={smallFeedEl} />
      </div>

      {/* Participants, Chat, and Screen Share */}
      <div className="flex items-center space-x-3 md:space-x-6 my-2 md:my-0">
        <button className="flex flex-col items-center text-white hover:text-blue-400 text-xs md:text-sm">
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          <span>Chat</span>
        </button>
      </div>

      {/* Hangup Button */}
      <div className="text-end">
        <HangupButton smallFeedEl={smallFeedEl} largeFeedEl={largeFeedEl} />
      </div>
    </div>
  );
};

export default ActionButtons;
