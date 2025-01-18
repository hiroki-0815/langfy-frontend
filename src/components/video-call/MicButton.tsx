import { MicIcon, MicOff } from "lucide-react";
import { useState } from "react";

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const handleMicButton = () => {
    setIsMicMuted(!isMicMuted);
  };
  return (
    <button onClick={handleMicButton}>
      {isMicMuted ? <MicOff /> : <MicIcon />}
    </button>
  );
};

export default MicButton;
