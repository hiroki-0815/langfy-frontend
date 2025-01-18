import { VideoIcon, VideoOff } from "lucide-react";
import { useState } from "react";

const CameraButton = () => {
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const handleMicButton = () => {
    setIsCameraOff(!isCameraOff);
  };
  return (
    <button onClick={handleMicButton}>
      {isCameraOff ? <VideoOff /> : <VideoIcon />}
    </button>
  );
};

export default CameraButton;
