import {
  CallStatusAction,
  CallStatusState,
  SET_CALL_DESCRIPTION,
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

export const setCallDescription = (description: RTCSessionDescriptionInit) => ({
  type: SET_CALL_DESCRIPTION,
  payload: description,
});