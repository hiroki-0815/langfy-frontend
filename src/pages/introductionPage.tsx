import ConnectingButtons from "@/components/video-call/ConnectingButtons";
import { setIsRoomHost } from "@/store/actions";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { connect } from "react-redux";

type Props = {
  setIsRoomHostAction: (isRoomHost: boolean) => void;
};

const introductionPage = ({ setIsRoomHostAction }: Props) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  });
  return (
    <div className="shadow-sm flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="rounded-md bg-white shadow py-20 px-40 mt-10">
        <div>
          <h1 className="text-blue-400 mb-5">Langfy</h1>
          <ConnectingButtons />
        </div>
      </div>
    </div>
  );
};

const mapStoreStateToProps = (dispatch: Dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost: boolean) =>
      dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapStoreStateToProps)(introductionPage);
