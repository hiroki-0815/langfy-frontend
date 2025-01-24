// redux-elements/type.ts

export type CallStatusState = {
  current: string;    // e.g., "idle", "negotiating"
  video: string;      // e.g., "off", "enabled"
  audio: string;      // e.g., "off", "enabled"
  audioDevice: string; // e.g., "default"
  videoDevice: string; // e.g., "default"
  shareScreen: boolean;
  haveMedia: boolean;
  haveCreatedOffer: boolean;
};

export const UPDATE_CALL_STATUS = "UPDATE_CALL_STATUS";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
export const NEW_VERSION = "NEW_VERSION";

interface UpdateCallStatusAction {
  type: typeof UPDATE_CALL_STATUS;
  payload: {
    prop: keyof CallStatusState;
    value: string | boolean;
  };
}

interface LogoutAction {
  type: typeof LOGOUT_ACTION;
}

interface NewVersionAction {
  type: typeof NEW_VERSION;
}

export type CallStatusAction =
  | UpdateCallStatusAction
  | LogoutAction
  | NewVersionAction;
