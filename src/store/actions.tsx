import {
  SET_IS_ROOM_HOST,
  SET_CONNECT_ONLY_WITH_AUDIO,
  SET_ROOM_ID,
  SET_IDENTITY,
  SET_PARTICIPANTS,
  SET_SHOW_OVERLAY,
} from "./actionTypes";
import { Participant } from "./types";

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
    type: SET_SHOW_OVERLAY,
    payload: showOverlay,
  };
};

export const setParticipants = (participants: Participant[]) => {
  return {
    type: SET_PARTICIPANTS,
    payload: participants,
  };
};
