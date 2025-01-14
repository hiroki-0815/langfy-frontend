import { useState } from "react";
import JoinRoomInputs from "./video-call/JoinRoomInputs";
import { RootState } from "@/store/store";
import { connect } from "react-redux";
import OnlyWithAudioCheckbox from "./video-call/OnlyWithAudioCheckbox";

type Props = {
  isRoomHost: boolean;
};

const JoinRoomContent = ({ isRoomHost }: Props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox />
    </>
  );
};

const mapStoreStateToProps = (state: RootState) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(JoinRoomContent);
