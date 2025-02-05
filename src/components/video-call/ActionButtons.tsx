import { MutableRefObject, useRef } from "react";
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
        <HangupButton smallFeedEl={smallFeedEl} largeFeedEl={largeFeedEl} />
      </div>
    </div>
  );
};

export default ActionButtons;
