import {
  CallStatusState,
  CallStatusAction,
  UPDATE_CALL_STATUS,
  SET_CALL_DESCRIPTION,

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
  answer: null,
  callerId: null,
  receiverId: null,
  offerId: null
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

      case SET_CALL_DESCRIPTION:
        return {
          ...state,
          offer: action.payload.type === "offer" ? action.payload : state.offer,
          answer: action.payload.type === "answer" ? action.payload : state.answer,
        };
  
      default:
        return state;
  }
}
