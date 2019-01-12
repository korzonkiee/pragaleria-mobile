import { Dispatch } from "redux";
import { createAction, ReducerMap } from "redux-actions";
import * as Api from "../../Services/Api";
import Logger from "../../Services/Logger";
import { endTask, startTask } from "../Async";

const setArtworks = createAction("ARTWORKS/SET_ARTWORKS");
const setArtworksLoading = createAction("ARTWORKS/SET_ARTWORKS_LOADING");

const TAG = "ARTWORKS";

export function getArtworks(tag: Tag) {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        if (getState().artworks.loading) {
            return;
        }

        const currentPage = getState().artworks.page;

        dispatch(startTask());
        dispatch(setArtworksLoading(true));

        try {
            const artworks = await Api.getArtworks(tag, currentPage);
            dispatch(setArtworks(artworks));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch artists. ` +
                `Error: ${e}`);

            dispatch(setArtworksLoading(false));
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const artworkReducers: ReducerMap<AppState, any> = {
    [setArtworks.toString()](state, { payload }) {
        if (payload) {
            return {
                ...state,
                artworks: {
                    data: [...state.artworks.data, ...payload],
                    loading: false,
                    page: state.artworks.page + 1
                }
            }
        }

        return state;
    },
    [setArtworksLoading.toString()](state, action) {
        if (action.payload !== undefined) {
            return {
                ...state,
                artworks: {
                    ...state.artworks,
                    loading: action.payload
                }
            }
        }

        return state;
    }
}
