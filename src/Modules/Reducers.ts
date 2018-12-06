import { handleActions } from "redux-actions";
import { initialState } from "./InitialState";
import { asyncActionsReducers } from "./Async";
import {artistsReducers} from "./Artists";
import { auctionsReducers } from './Auctions/index';
import { exhibitionsReducers } from './Exhibitions/index';

export const appReducer = handleActions({
    ...asyncActionsReducers,
    ...artistsReducers,
    ...auctionsReducers,
    ...exhibitionsReducers
}, initialState);
