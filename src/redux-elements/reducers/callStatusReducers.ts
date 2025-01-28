import {
  CallStatusState,
  CallStatusAction,
  UPDATE_CALL_STATUS,
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
        
      }
      
    default:
      return state;
  }
}
