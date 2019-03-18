import { Dispatch } from "redux";
import { createAction, ReducerMap } from "redux-actions";
import * as Api from "../../Services/Api";
import Logger from "../../Services/Logger";
import { endTask, startTask } from "../Async";

const setArtists = createAction("ARTISTS/SET_ARTISTS");
const setFilteredArtists = createAction("ARTISTS/SET_FILTERED_ARTISTS");
const setFilteredArtistsError = createAction("ARTISTS/SET_FILTERED_ARTISTS_ERROR");
const setArtistsLoading = createAction("ARTITS/SET_ARTISTS_LOADING");
const setArtistDetails = createAction("ARTISTS/SET_ARTIST_DETAILS");
const setArtistDetailsLoading = createAction("ARTISTS/SET_ARTIST_DETAILS_LOADING");

const TAG = "ARTISTS";

export function searchArtists(keyword: string) {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        dispatch(startTask());

        try {
            const artists = await Api.searchArtists(keyword);
            if (artists === null) {
                dispatch(setFilteredArtistsError(true));
            } else {
                dispatch(setFilteredArtists(artists));
            }
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't search for artists by keyword ${keyword}. ` +
                `Error: ${e}`);
        }
        finally {
            dispatch(endTask());
        }
    }
}

export function getArtists() {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        if (getState().artists.loading) {
            return;
        }

        const currentPage = getState().artists.page;

        dispatch(startTask());
        dispatch(setArtistsLoading(true));

        try {
            const artists = await Api.getArtists(currentPage);
            dispatch(setArtists(artists));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch artists. ` +
                `Error: ${e}`);

            dispatch(setArtistsLoading(false));
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

            dispatch(setArtistDetailsLoading({ id: id, loading: false }));
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const
    artistsReducers: ReducerMap<AppState, any> = {
        [setArtists.toString()](state, { payload }) {
            if (payload) {
                return {
                    ...state,
                    artists: {
                        data: [...state.artists.data, ...payload],
                        loading: false,
                        page: state.artists.page + 1
                    }
                }
            }

            return state;
        },
        [setArtistsLoading.toString()](state, action) {
            if (action.payload !== undefined) {
                return {
                    ...state,
                    artists: {
                        ...state.artists,
                        loading: action.payload
                    }
                }
            }

            return state;
        },
        [setFilteredArtists.toString()](state, { payload }) {
            if (payload) {
                return {
                    ...state,
                    filteredArtists: {
                        data: payload,
                        errorOccured: false
                    }
                }
            }

            return state;
        },
        [setFilteredArtists.toString()](state, { payload }) {
            if (payload) {
                return {
                    ...state,
                    filteredArtists: {
                        data: payload,
                        errorOccured: false
                    }
                }
            }

            return state;
        },
        [setFilteredArtistsError.toString()](state, { payload }) {
            return {
                ...state,
                filteredArtists: {
                    data: [],
                    errorOccured: payload
                }
            };
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
                    artistDetails: {
                        ...state.artistDetails,
                        [action.payload.id]: {
                            ...state.artistDetails[action.payload.id],
                            loading: action.payload.loading,
                        }
                    }
                };
            }

            return state;
        }
    }
