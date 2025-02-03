import { PhoneIcon } from "lucide-react";
import updateCallStatus from "@/redux-elements/actions/updateCallStatus";
import { useAppDispatch, useAppSelector } from "@/redux-elements/hooks";
import { RootState } from "@/redux-elements/reducers/rootReducers";
import { MutableRefObject } from "react";
import { useNavigate } from "react-router-dom";

type HangButtonsProps = {
  smallFeedEl: MutableRefObject<HTMLVideoElement | null>;
  largeFeedEl: MutableRefObject<HTMLVideoElement | null>;
};

const HangupButton = ({ smallFeedEl, largeFeedEl }: HangButtonsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const callStatus = useAppSelector((state) => state.callStatus);
  const streams = useAppSelector((state: RootState) => state.stream);

  const handleHangup = () => {
    dispatch(updateCallStatus("current", "complete"));

    for (const s in streams) {
      if (streams[s].peerConnection) {
        streams[s].peerConnection.close();
        streams[s].peerConnection.onicecandidate = null;
        streams[s].peerConnection.ontrack = null;
        streams[s].peerConnection = null;
      }
    }

    if (smallFeedEl.current) {
      smallFeedEl.current.srcObject = null;
    }
    if (largeFeedEl.current) {
      largeFeedEl.current.srcObject = null;
    }

    navigate("/chat");
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
      <PhoneIcon className="w-6 h-6" />
    </button>
  );
};

export default HangupButton;
