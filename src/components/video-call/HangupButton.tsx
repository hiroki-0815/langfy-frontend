import { PhoneOff } from "lucide-react"; // Import the Lucide icon
import updateCallStatus from "@/redux-elements/actions/updateCallStatus";
import { useAppDispatch, useAppSelector } from "@/redux-elements/hooks";

const HangupButton = () => {
  const dispatch = useAppDispatch();
  const callStatus = useAppSelector((state) => state.callStatus);

  const handleHangup = () => {
    dispatch(updateCallStatus("current", "complete"));
  };

  if (callStatus.current === "complete") {
    return null;
  }

  return (
    <button
      onClick={handleHangup}
      className="flex items-center justify-center p-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300"
      aria-label="Hang up"
    >
      <PhoneOff className="w-6 h-6" /> {/* Lucide-React PhoneOff Icon */}
    </button>
  );
};

export default HangupButton;
