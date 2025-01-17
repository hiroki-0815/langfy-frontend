type SetIsRoomHostPayload = { isRoomHost: boolean };
type SetConnectOnlyWithAudioPayload = { onlyWithAudio: boolean };

type Actions =
  | { type: typeof Actions.SET_IS_ROOM_HOST; payload: SetIsRoomHostPayload }
  | {
      type: typeof Actions.SET_CONNECT_ONLY_WITH_AUDIO;
      payload: SetConnectOnlyWithAudioPayload;
    };

const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID: "SET_ROOM_ID",
  SET_IDENTITY: "SET_IDENTITY",
};

export const setIsRoomHost = (isRoomHost: boolean) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    payload: isRoomHost,
  };
};

export const setConnectOnlyWithAudio = (onlyWithAudio: boolean) => {
  return {
    type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
    payload: onlyWithAudio,
  };
};

export const setRoomId = (roomId: string) => {
  return {
    type: Actions.SET_ROOM_ID,
    payload: roomId,
  };
};

export const setIdentity = (identity: string) => {
  return {
    type: Actions.SET_IDENTITY,
    payload: identity,
  };
};

export default Actions;
