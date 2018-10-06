import { handleActions } from "redux-actions";
import { initialState } from "./InitialState";
import { asyncActionsReducers } from "./Async";
import { homeReducers } from "./Home";
import {artistsReducers} from "./Artists";

export const appReducer = handleActions({
    ...asyncActionsReducers,
    ...homeReducers,
    ...artistsReducers
}, initialState);
