import {
  SET_IS_ROOM_HOST,
  SET_CONNECT_ONLY_WITH_AUDIO,
  SET_ROOM_ID,
  SET_IDENTITY,
  SET_SHOW_OVERLAY,
} from "./actionTypes";

interface RoomState {
  identity: string;
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  roomId: string;
  showOverlay: boolean;
}

const initialState: RoomState = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: "",
  showOverlay: true,
};

interface RoomAction<T, P> {
  type: T;
  payload: P;
}

type RoomActions =
  | RoomAction<typeof SET_IS_ROOM_HOST, boolean>
  | RoomAction<typeof SET_CONNECT_ONLY_WITH_AUDIO, boolean>
  | RoomAction<typeof SET_ROOM_ID, string>
  | RoomAction<typeof SET_IDENTITY, string>
  | RoomAction<typeof SET_SHOW_OVERLAY, boolean>;

export default function roomReducer(
  state = initialState,
  action: RoomActions
): RoomState {
  switch (action.type) {
    case SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.payload,
      };

    case SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        connectOnlyWithAudio: action.payload,
      };

    case SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };

    case SET_IDENTITY:
      return {
        ...state,
        identity: action.payload,
      };

    case SET_SHOW_OVERLAY:
      return {
        ...state,
        showOverlay: action.payload,
      };

    default:
      return state;
  }
}
