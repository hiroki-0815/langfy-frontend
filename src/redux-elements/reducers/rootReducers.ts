import { combineReducers } from "redux";
import callStatusReducer from "./callStatusReducers";

const rootReducer = combineReducers({
  callStatus: callStatusReducer,
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
