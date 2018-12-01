import { handleActions } from "redux-actions";
import { initialState } from "./InitialState";
import { asyncActionsReducers } from "./Async";
import { aboutReducers } from "./About";
import {artistsReducers} from "./Artists";

export const appReducer = handleActions({
    ...asyncActionsReducers,
    ...aboutReducers,
    ...artistsReducers
}, initialState);
