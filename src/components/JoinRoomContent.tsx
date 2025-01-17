import { useState } from "react";
import JoinRoomInputs from "./video-call/JoinRoomInputs";
import { RootState } from "@/store/store";
import { connect } from "react-redux";
import OnlyWithAudioCheckbox from "./video-call/OnlyWithAudioCheckbox";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setRoomId,
} from "@/store/actions";
import JoinRoomButtons from "./video-call/JoinRoomButtons";
import ErrorMessage from "./video-call/ErrorMessage";
import { useRoom } from "@/api/video-call/RoomApi";
import { useNavigate } from "react-router-dom";

type Props = {
  isRoomHost: boolean;
  setConnectOnlyWithAudio: (onlyWithAudio: boolean) => void;
  connectOnlyWithAudio: boolean;
  setIdentityAction: (identity: string) => void;
  setRoomIdAction: (roomId: string) => void;
};

const JoinRoomContent = ({
  isRoomHost,
  setConnectOnlyWithAudio,
  connectOnlyWithAudio,
  setIdentityAction,
  setRoomIdAction,
}: Props) => {
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
        setErrorMessage("Meeting not found. Check your meeting id");
      }
    } catch (error) {
      setErrorMessage("Error connecting to the meeting");
    }
  };

  const createRoom = () => {
    navigate("/room");
  };

  if (isLoading) {
    <div>...Loading</div>;
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
    setIdentityAction: (identity: string) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId: string) => dispatch(setRoomId(roomId)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinRoomContent);
