import {
  CallStatusState,
  CallStatusAction,
  UPDATE_CALL_STATUS,
  LOGOUT_ACTION,
  NEW_VERSION,
} from "../type";

const initialState: CallStatusState = {
  current: "idle",
  video: "off",
  audio: "off",
  audioDevice: "default",
  videoDevice: "default",
  shareScreen: false,
  haveMedia: false,
  haveCreatedOffer: false,
};

export default function callStatusReducer(
  state: CallStatusState = initialState,
  action: CallStatusAction
): CallStatusState {
  switch (action.type) {
    case UPDATE_CALL_STATUS:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case LOGOUT_ACTION:
    case NEW_VERSION:
      return initialState;
    default:
      return state;
  }
}
