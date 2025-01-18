import {
  SET_IS_ROOM_HOST,
  SET_CONNECT_ONLY_WITH_AUDIO,
  SET_ROOM_ID,
  SET_IDENTITY,
} from "./actionTypes";

export const setIsRoomHost = (isRoomHost: boolean) => {
  return {
    type: SET_IS_ROOM_HOST,
    payload: isRoomHost,
  };
};

export const setConnectOnlyWithAudio = (connectOnlyWithAudio: boolean) => {
  return {
    type: SET_CONNECT_ONLY_WITH_AUDIO,
    payload: connectOnlyWithAudio,
  };
};

export const setRoomId = (roomId: string) => {
  return {
    type: SET_ROOM_ID,
    payload: roomId,
  };
};

export const setIdentity = (identity: string) => {
  return {
    type: SET_IDENTITY,
    payload: identity,
  };
};

export const setShowOverlay = (showOverlay: boolean) => {
  return {
    type: SET_IDENTITY,
    payload: showOverlay,
  };
};
