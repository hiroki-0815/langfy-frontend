import { useState } from "react";
import JoinRoomInputs from "./video-call/JoinRoomInputs";
import { RootState } from "@/store/store";
import { connect } from "react-redux";
import OnlyWithAudioCheckbox from "./video-call/OnlyWithAudioCheckbox";
import { Dispatch } from "@reduxjs/toolkit";
import { setConnectOnlyWithAudio, setIsRoomHost } from "@/store/actions";
import JoinRoomButtons from "./video-call/JoinRoomButtons";
// import ErrorMessage from "./video-call/ErrorMessage";

type Props = {
  isRoomHost: boolean;
  setConnectOnlyWithAudio: (onlyWithAudio: boolean) => void;
  connectOnlyWithAudio: boolean;
};

const JoinRoomContent = ({
  isRoomHost,
  setConnectOnlyWithAudio,
  connectOnlyWithAudio,
}: Props) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  // const [errorMessage, setErrorMessage] = useState(null)
  const handleJoinRoom = () => {
    console.log("joining");
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="mb-2">
        <JoinRoomInputs
          roomIdValue={roomIdValue}
          setRoomIdValue={setRoomIdValue}
          nameValue={nameValue}
          setNameValue={setNameValue}
          isRoomHost={isRoomHost}
        />
      </div>
      <div className="mb-5">
        <OnlyWithAudioCheckbox
          connectOnlyWithAudio={connectOnlyWithAudio}
          setConnectOnlyWithAudio={setConnectOnlyWithAudio}
        />
      </div>
      <div>
        <JoinRoomButtons
          handleJoinRoom={handleJoinRoom}
          isRoomHost={isRoomHost}
        />
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state: RootState) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch: Dispatch) => {
  return {
    setIsRoomHost: (isRoomHost: boolean) => dispatch(setIsRoomHost(isRoomHost)),
    setConnectOnlyWithAudio: (onlyWithAudio: boolean) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinRoomContent);
