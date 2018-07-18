import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type ThunkDispatch = ThunkDispatch<AppState, never, AnyAction>;
