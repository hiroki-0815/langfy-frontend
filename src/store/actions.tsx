// Action Types
const Actions = {
  SET_IS_ROOM_HOST: "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONNECT_ONLY_WITH_AUDIO",
};

type SetIsRoomHostPayload = {
  isRoomHost: boolean;
};

type SetConnectOnlyWithAudioPayload = {
  onlyWithAudio: boolean;
};

export const setIsRoomHost = ({ isRoomHost }: SetIsRoomHostPayload) => {
  return {
    type: Actions.SET_IS_ROOM_HOST,
    payload: { isRoomHost },
  };
};

export const setConnectOnlyWithAudio = ({
  onlyWithAudio,
}: SetConnectOnlyWithAudioPayload) => {
  return {
    type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
    payload: { onlyWithAudio },
  };
};

export default Actions;
