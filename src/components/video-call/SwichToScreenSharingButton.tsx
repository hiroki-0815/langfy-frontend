import { useState } from "react";
import { Monitor, MonitorOff } from "lucide-react"; // Import screen sharing icons

const SwitchToScreenSharingButton = () => {
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);

  const handleScreenSharingToggle = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <button
      onClick={handleScreenSharingToggle}
      className="p-2 rounded bg-gray-100 hover:bg-gray-200 focus:outline-none"
      aria-label={
        isScreenSharing ? "Stop Screen Sharing" : "Start Screen Sharing"
      }
    >
      {isScreenSharing ? (
        <MonitorOff className="w-6 h-6 text-red-500" />
      ) : (
        <Monitor className="w-6 h-6 text-green-500" />
      )}
    </button>
  );
};

export default SwitchToScreenSharingButton;
