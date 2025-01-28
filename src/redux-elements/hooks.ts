import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "./reducers/rootReducers";
import { AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed wrapper around useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
