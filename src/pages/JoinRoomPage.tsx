import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

import JoinRoomTitle from "@/components/video-call/JoinRoomTitle";
import JoinRoomContent from "@/components/JoinRoomContent";

import { RootState } from "@/store/store";
import { setIsRoomHost } from "@/store/actions";

type StateProps = {
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
};

type DispatchProps = {
  setIsRoomHostAction: (isRoomHost: boolean) => void;
};

type JoinRoomPageProps = StateProps & DispatchProps;

function JoinRoomPage({ setIsRoomHostAction, isRoomHost }: JoinRoomPageProps) {
  const { search } = useLocation();

  useEffect(() => {
    const isRoomHostParam = new URLSearchParams(search).get("host");
    if (isRoomHostParam === "true") {
      setIsRoomHostAction(true);
    } else {
      setIsRoomHostAction(false);
    }
  }, [search, setIsRoomHostAction]);

  return (
    <div className="h-screen flex flex-col justify-start items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg mt-4">
        <div className="mb-2 font-bold">
          <JoinRoomTitle isRoomHost={isRoomHost} />
        </div>
        <JoinRoomContent />
      </div>
    </div>
  );
}

const mapStoreStateToProps = (state: RootState): StateProps => {
  return {
    isRoomHost: !!state.room.isRoomHost,
    connectOnlyWithAudio: !!state.room.connectOnlyWithAudio,
  };
};

const mapActionsToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    setIsRoomHostAction: (isRoomHost: boolean) =>
      dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
