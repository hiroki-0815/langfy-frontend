import { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import JoinRoomInputs from "@/components/video-call/JoinRoomInputs";
import OnlyWithAudioCheckbox from "@/components/video-call/OnlyWithAudioCheckbox";
import ErrorMessage from "@/components/video-call/ErrorMessage";
import JoinRoomButtons from "@/components/video-call/JoinRoomButtons";

import { useRoom } from "@/api/video-call/RoomApi";
import { RootState } from "@/store/store";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "@/store/actions";

type StateProps = {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
};

type DispatchProps = {
  setConnectOnlyWithAudio: (onlyWithAudio: boolean) => void;
  setIdentityAction: (identity: string) => void;
  setRoomIdAction: (roomId: string) => void;
};

type JoinRoomContentProps = StateProps & DispatchProps;

function JoinRoomContent({
  isRoomHost,
  connectOnlyWithAudio,
  setConnectOnlyWithAudio,
  setIdentityAction,
  setRoomIdAction,
}: JoinRoomContentProps) {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { fetchRoom, isLoading } = useRoom();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    setIdentityAction(nameValue);
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    try {
      const data = await fetchRoom(roomIdValue);
      const { roomExists, full } = data;
      if (roomExists) {
        if (full) {
          setErrorMessage("Meeting is full. Please try again later");
        } else {
          setRoomIdAction(roomIdValue);
          navigate("/room");
        }
      } else {
        setErrorMessage("Meeting not found. Check your meeting ID");
      }
    } catch (error) {
      setErrorMessage("Error connecting to the meeting");
    }
  };

  const createRoom = () => {
    navigate("/room");
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
        <ErrorMessage errorMessage={errorMessage} />
      </div>
      <div>
        <JoinRoomButtons
          handleJoinRoom={handleJoinRoom}
          isRoomHost={isRoomHost}
        />
      </div>
    </div>
  );
}
const mapStoreStateToProps = (state: RootState): StateProps => {
  return {
    isRoomHost: state.room.isRoomHost,
    connectOnlyWithAudio: state.room.connectOnlyWithAudio,
  };
};

const mapActionsToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setConnectOnlyWithAudio: (onlyWithAudio: boolean) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity: string) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId: string) => dispatch(setRoomId(roomId)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinRoomContent);
