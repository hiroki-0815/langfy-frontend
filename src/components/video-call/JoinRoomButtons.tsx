import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {
  handleJoinRoom: () => void;
  isRoomHost: boolean;
};

const JoinRoomButtons = ({ handleJoinRoom, isRoomHost }: Props) => {
  const navigate = useNavigate();

  const pushToIntroductionPage = () => {
    navigate("/videocall-introduction");
  };

  return (
    <div className="flex flex-row gap-3">
      {isRoomHost ? (
        <Button className="bg-blue-400" onClick={handleJoinRoom}>
          Host
        </Button>
      ) : (
        <Button className="bg-blue-400" onClick={handleJoinRoom}>
          Join
        </Button>
      )}
      <Button onClick={pushToIntroductionPage}>Cancel</Button>
    </div>
  );
};

export default JoinRoomButtons;
