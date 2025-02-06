import { Timer } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-elements/reducers/rootReducers";

type TimerToggleButtonProps = {
  onToggle: (newVisibility: boolean) => void;
  currentVisibility: boolean;
};

export default function TimerToggleButton({
  onToggle,
  currentVisibility,
}: TimerToggleButtonProps) {
  const { socket } = useSocket();
  const callerId = useSelector((state: RootState) => state.callStatus.callerId);
  const receiverId = useSelector(
    (state: RootState) => state.callStatus.receiverId
  );

  const handleClick = () => {
    const newVisibility = !currentVisibility;
    onToggle(newVisibility);
    socket?.emit("toggleTimerVisibility", {
      isTimerVisible: newVisibility,
      callerId,
      receiverId,
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 transition-all duration-300 ${
        currentVisibility ? "bg-green-500" : "bg-gray-700"
      } rounded-full`}
    >
      <Timer className={currentVisibility ? "text-black" : "text-white"} />
    </button>
  );
}
