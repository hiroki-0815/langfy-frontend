import { createAction } from "@reduxjs/toolkit";
import Actions from "./actions";

export const setIsRoomHost = createAction<boolean>(Actions.SET_IS_ROOM_HOST);
export const connectOnlyWithAudio = createAction<boolean>(
  Actions.SET_CONNECT_ONLY_WITH_AUDIO
);

type AppAction =
  | ReturnType<typeof setIsRoomHost>
  | ReturnType<typeof connectOnlyWithAudio>;

const initState = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
};

const reducer = (state = initState, action: AppAction) => {
  switch (action.type) {
    case Actions.SET_IS_ROOM_HOST: {
      const updatedState = {
        ...state,
        isRoomHost: action.payload,
      };

      if (action.payload) {
        console.log("User is now the room host");
      } else {
        console.log("User is no longer the room host");
      }

      return updatedState;
    }

    case Actions.SET_CONNECT_ONLY_WITH_AUDIO: {
      const updatedState = {
        ...state,
        connectOnlyWithAudio: action.payload,
      };

      if (action.payload) {
        console.log("Connection set to audio-only");
      } else {
        console.log("Audio-only mode disabled");
      }

      return updatedState;
    }
    case Actions.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    case Actions.SET_IDENTITY:
      return {
        ...state,
        identity: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
