import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type Thunk<TState = AppState> = ThunkAction<void, TState, never, AnyAction>;
export type ThunkDispatch = ThunkDispatch<AppState, never, AnyAction>;
