import { PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LeaveRoomButton = () => {
  const navigate = useNavigate();

  const handleRoomDisconnection = () => {
    navigate("/videocall-introduction");
  };

  return (
    <button onClick={handleRoomDisconnection}>
      <PhoneCall />
    </button>
  );
};

export default LeaveRoomButton;
