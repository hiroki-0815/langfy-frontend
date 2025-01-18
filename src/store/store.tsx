import { configureStore, combineReducers } from "@reduxjs/toolkit";
import roomReducer from "./reducer";

const rootReducer = combineReducers({
  room: roomReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
