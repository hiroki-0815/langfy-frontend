import { MutableRefObject } from "react";
import HangupButton from "./HangupButton";
import VideoButton from "./VideoButton";
import AudioButton from "./AudioButton";
import TimerToggleButton from "./TimerToggleButton";
import TopicPickerToggleButton from "./TopicPickerToggleButton";

type ActionButtonsProps = {
  smallFeedEl: MutableRefObject<HTMLVideoElement | null>;
  largeFeedEl: MutableRefObject<HTMLVideoElement | null>;
  isTimerVisible: boolean;
  isTopicPickerVisible: boolean;
  setIsTimerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTopicPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionButtons = ({
  smallFeedEl,
  largeFeedEl,
  isTimerVisible,
  isTopicPickerVisible,
  setIsTimerVisible,
  setIsTopicPickerVisible,
}: ActionButtonsProps) => {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 
        flex flex-col 
        items-center justify-between
        bg-gray-800 shadow-md 
        transition-all duration-300 
        px-4 md:px-10 py-2 md:py-4
      "
    >
      {/* Audio & Video Controls */}
      <div className="flex gap-2">
        <AudioButton smallFeedEl={smallFeedEl} />
        <VideoButton smallFeedEl={smallFeedEl} />
        <TimerToggleButton
          onToggle={(newVisibility) => setIsTimerVisible(newVisibility)}
          currentVisibility={isTimerVisible}
        />
        <TopicPickerToggleButton
          onToggle={(newVisibility) => setIsTopicPickerVisible(newVisibility)}
          currentVisibility={isTopicPickerVisible}
        />
        <HangupButton smallFeedEl={smallFeedEl} largeFeedEl={largeFeedEl} />
      </div>
    </div>
  );
};

export default ActionButtons;
