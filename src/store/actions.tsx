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

export default Actions;
