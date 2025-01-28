// streamsReducer.ts
import { StreamsType, AddStreamAction } from "../type";

const initialState: StreamsType = {
  localStream: {
    who: "local",
    stream: new MediaStream(),
    peerConnection: undefined,
  },
  // Possibly more streams or empty object after localStream
};

export default function streamsReducer(
  state = initialState,
  action: AddStreamAction
): StreamsType {
  switch (action.type) {
    case "ADD_STREAM":
      return {
        ...state,
        [action.payload.who]: {
          who: action.payload.who,
          stream: action.payload.stream,
          peerConnection: action.payload.peerConnection,
        },
      };
    default:
      return state;
  }
}
