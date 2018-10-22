import { createAction, ReducerMap } from "redux-actions";
import { Dispatch } from "redux";
import { endTask, startTask } from "../Async";
import { AppState } from "../Async/AsyncStat";
import Logger from "../../Services/Logger"
import * as Api from "../../Services/Api";


const setArtists = createAction("ARTISTS/SET_ARTISTS");
const setArtistDetails = createAction("ARTISTS/SET_ARTIST_DETAILS");
const setArtistDetailsLoading = createAction("ARTISTS/SET_ARTIST_DETAILS_LOADING");

const TAG = "ARTISTS";

export function getArtists() {
    return async (dispatch: Dispatch<any>) => {
        dispatch(startTask());
        try {
            const artists = await Api.getArtists();
            dispatch(setArtists(artists));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch artists. ` +
                `Error: ${e}`);
        }
        finally {
            dispatch(endTask());
        }
    }
}

export function getArtistDetails(id: number) {
    return async (dispatch: Dispatch<any>) => {
        dispatch(startTask());
        dispatch(setArtistDetailsLoading({ id: id, loading: true }));
        try {
            const artistDetails = await Api.getArtistDetails(id);
            dispatch(setArtistDetails(artistDetails));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch artist details with id ${id} . ` +
                `Error: ${e}`);
        }
        finally {
            dispatch(setArtistDetailsLoading({ id: id, loading: false }));
            dispatch(endTask());
        }
    }
}

export const artistsReducers: ReducerMap<AppState, any> = {
    [setArtists.toString()](state, action) {
        if (action.payload) {
            return {
                ...state,
                artists: action.payload
            }
        }

        return state;
    },
    [setArtistDetails.toString()](state, action) {
        if (action.payload) {
            return {
                ...state,
                artistDetails: {
                    ...state.artistDetails,
                    [action.payload.id]: {
                        data: action.payload,
                        loading: false
                    }
                }
            }
        }

        return state;
    },
    [setArtistDetailsLoading.toString()](state, action) {
        if (action.payload) {
            return {
                ...state,
                merchantDetails: {
                    ...state.artistDetails,
                    [action.payload.id]: {
                        ...state.artistDetails[action.payload.id],
                        loading: action.payload.loading
                    }
                }
            };
        }

        return state;
    },
};
