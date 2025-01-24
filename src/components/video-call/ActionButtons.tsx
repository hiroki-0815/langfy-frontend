import { useEffect, useRef } from "react";
import { Mic, Video, Users, MessageSquare, Monitor } from "lucide-react";
import HangupButton from "./HangupButton";

const ActionButtons = () => {
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
      id="menu-buttons"
      ref={menuButtons}
      className="flex flex-row items-center justify-between bg-gray-800 p-4 shadow-md transition-all duration-300 px-10"
    >
      {/* Left Section */}
      <div className="flex space-x-4">
        <button className="flex items-center justify-center p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
          <Mic className="w-6 h-6" /> {/* Microphone Icon */}
        </button>
        <button className="flex items-center justify-center p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white">
          <Video className="w-6 h-6" /> {/* Video Icon */}
        </button>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-6 ">
        <button className="flex flex-col items-center text-white hover:text-blue-500">
          <Users className="w-6 h-6" /> {/* Participants Icon */}
          <span className="text-sm">Participants</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-blue-500">
          <MessageSquare className="w-6 h-6" /> {/* Chat Icon */}
          <span className="text-sm">Chat</span>
        </button>
        <button className="flex flex-col items-center text-white hover:text-blue-500">
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
