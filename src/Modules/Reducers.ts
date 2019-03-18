import { handleActions } from "redux-actions";
import { artistsReducers } from "./Artists";
import { artworkReducers } from "./Artworks";
import { asyncActionsReducers } from "./Async";
import { auctionsReducers } from './Auctions/index';
import { catalogReducers } from "./Catalogs";
import { exhibitionsReducers } from './Exhibitions/index';
import { initialState } from "./InitialState";

export const appReducer = handleActions({
    ...asyncActionsReducers,
    ...artworkReducers,
    ...artistsReducers,
    ...auctionsReducers,
    ...exhibitionsReducers,
    ...catalogReducers,
}, initialState);
