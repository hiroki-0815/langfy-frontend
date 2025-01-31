import {
  CallStatusAction,
  CallStatusState,
  SET_OFFER,
  UPDATE_CALL_STATUS,
} from "../type";

export default function updateCallStatus(
  prop: keyof CallStatusState,
  value: string | boolean 
): CallStatusAction {
  return {
    type: UPDATE_CALL_STATUS,
    payload: { prop, value },
  };
}

export const setOffer = (offer: RTCSessionDescriptionInit) => ({
  type: SET_OFFER,
  payload: offer,
});