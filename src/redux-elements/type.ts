export const UPDATE_CALL_STATUS = "UPDATE_CALL_STATUS" as const;
export const ADD_STREAM = "ADD_STREAM" as const;
export const SET_CALL_DESCRIPTION = "SET_CALL_DESCRIPTION" as const;

export type CallStatusState = {
  current: string; 
  video: string; 
  audio: string; 
  audioDevice: string; 
  videoDevice: string;
  shareScreen: boolean;
  haveMedia: boolean;
  haveCreatedOffer: boolean;
  haveCreatedAnswer:boolean,
  offer: RTCSessionDescriptionInit | null; 
  answer: RTCSessionDescriptionInit | null;
  callerId: string | null;
  receiverId: string | null;
  offerId: string | null;
};

export type StreamState = {
  localStream: any;
  who: string; 
  stream: MediaStream; 
};

export interface UpdateCallStatusAction {
  type: typeof UPDATE_CALL_STATUS;
  payload: {
    prop: keyof CallStatusState;
    value: string | boolean | null
  };
}

export interface AddStreamAction {
  type: typeof ADD_STREAM;
  payload: {
    who: string;
    stream: MediaStream;
    peerConnection?:RTCPeerConnection
  };
}

export interface StreamEntry {
  who: string;
  stream: MediaStream;
  peerConnection?: RTCPeerConnection | null; 
}

export interface StreamsType {
  localStream: StreamEntry;
  [key: string]: StreamEntry;
}

export interface SetCallDescriptionAction {
  type: typeof SET_CALL_DESCRIPTION;
  payload: RTCSessionDescriptionInit;
}

export type CallStatusAction = UpdateCallStatusAction | AddStreamAction | SetCallDescriptionAction;
