import {
  CallStatusState,
  CallStatusAction,
  UPDATE_CALL_STATUS,
  SET_OFFER,

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
  haveCreatedAnswer:false,
  offer: null, 
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

      case SET_OFFER:
        return {
          ...state,
          offer: action.payload,
        };
    default:
      return state;
  }
  
}
