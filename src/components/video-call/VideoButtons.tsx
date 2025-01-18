import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import MicButton from "./MicButton";
import SwichToScreenSharingButton from "./SwichToScreenSharingButton";

const VideoButtons = () => {
  return (
    <div>
      <MicButton />
      <CameraButton />
      <LeaveRoomButton />
      <SwichToScreenSharingButton />
    </div>
  );
};

export default VideoButtons;
