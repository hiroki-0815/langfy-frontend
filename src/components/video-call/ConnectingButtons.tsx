import { Button } from "../ui/button";
import ConnectingButton from "./ConnectingButton";
import { useNavigate } from "react-router-dom";

const ConnectingButtons = () => {
  const navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate("/join-room");
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate("/join-room?host=true");
  };

  return (
    <div className="flex flex-col gap-3">
      <Button className="bg-blue-400 hover:bg-blue-500">
        <ConnectingButton
          buttonText="Join a meeting"
          onClickHandler={pushToJoinRoomPage}
        />
      </Button>
      <Button className="bg-white text-black hover:text-white">
        <ConnectingButton
          buttonText="Host a meeting"
          onClickHandler={pushToJoinRoomPageAsHost}
        />
      </Button>
    </div>
  );
};

export default ConnectingButtons;
