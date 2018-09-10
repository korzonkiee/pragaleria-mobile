import { handleActions } from "redux-actions";
import { initialState } from "./InitialState";
import { asyncActionsReducers } from "./Async";
import { homeReducers } from "./Home";

export const appReducer = handleActions({
    ...asyncActionsReducers,
    ...homeReducers
}, initialState);
