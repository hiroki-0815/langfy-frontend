import { ADD_STREAM } from "../type";

export default function addStream(who: string, stream: MediaStream, peerConnection?:RTCPeerConnection) {
  return {
    type: ADD_STREAM,
    payload: { who, stream,peerConnection },
  };
}
