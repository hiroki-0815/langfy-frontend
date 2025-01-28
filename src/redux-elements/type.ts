export const UPDATE_CALL_STATUS = "UPDATE_CALL_STATUS" as const;
export const ADD_STREAM = "ADD_STREAM" as const;

export type CallStatusState = {
  current: string; 
  video: string; 
  audio: string; 
  audioDevice: string; 
  videoDevice: string;
  shareScreen: boolean;
  haveMedia: boolean;
  haveCreatedOffer: boolean;
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
    value: string | boolean;
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
  peerConnection?: RTCPeerConnection; 
}

export interface StreamsType {
  localStream: StreamEntry;
  [key: string]: StreamEntry;
}

export type CallStatusAction = UpdateCallStatusAction | AddStreamAction;
