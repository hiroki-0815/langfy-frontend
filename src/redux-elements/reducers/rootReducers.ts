import { combineReducers } from "redux";
import callStatusReducer from "./callStatusReducers";
import streamsReducer from "./streamReducer";

const rootReducer = combineReducers({
  callStatus: callStatusReducer,
  stream: streamsReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
