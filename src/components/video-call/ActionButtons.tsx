import { MutableRefObject } from "react";
import HangupButton from "./HangupButton";
import VideoButton from "./VideoButton";
import AudioButton from "./AudioButton";
import TimerToggleButton from "./TimerToggleButton";

type ActionButtonsProps = {
  smallFeedEl: MutableRefObject<HTMLVideoElement | null>;
  largeFeedEl: MutableRefObject<HTMLVideoElement | null>;
  isTimerVisible: boolean;
  setIsTimerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionButtons = ({
  smallFeedEl,
  largeFeedEl,
  isTimerVisible,
  setIsTimerVisible,
}: ActionButtonsProps) => {
  return (
    <div
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
        <TimerToggleButton
          onToggle={(newVisibility) => setIsTimerVisible(newVisibility)}
          currentVisibility={isTimerVisible}
        />
      </div>
    </div>
  );
};

export default ActionButtons;
