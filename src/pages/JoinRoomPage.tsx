import JoinRoomContent from "@/components/JoinRoomContent";
import JoinRoomTitle from "@/components/video-call/JoinRoomTitle";
import { setIsRoomHost } from "@/store/actions";
import { RootState } from "@/store/store";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

type Props = {
  setIsRoomHostAction: (isRoomHost: boolean) => void;
  isRoomHost: boolean;
};

const JoinRoomPage = ({ setIsRoomHostAction, isRoomHost }: Props) => {
  const search = useLocation().search;

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      setIsRoomHostAction(true);
    }
  }, []);
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
};

const mapStoreStateToProps = (state: RootState) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch: Dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost: boolean) =>
      dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
