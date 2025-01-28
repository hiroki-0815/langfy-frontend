import updateCallStatus from "@/redux-elements/actions/updateCallStatus";
import { CallStatusAction, StreamsType } from "@/redux-elements/type";
import { Dispatch } from "redux";

function startLocalVideoStream(
  streams: StreamsType,
  dispatch: Dispatch<CallStatusAction>
) {
  const localStream = streams.localStream;

  for (const key in streams) {
    if (key !== "localStream") {
      const curStream = streams[key];
      localStream.stream.getVideoTracks().forEach((track) => {
        curStream.peerConnection?.addTrack(track, streams.localStream.stream);
      });
      dispatch(updateCallStatus("video", "enabled"));
    }
  }
}

export default startLocalVideoStream;
