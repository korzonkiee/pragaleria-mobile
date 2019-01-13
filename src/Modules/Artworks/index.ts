import { Dispatch } from "redux";
import { createAction, ReducerMap } from "redux-actions";
import * as Api from "../../Services/Api";
import Logger from "../../Services/Logger";
import { endTask, startTask } from "../Async";

const setArtworksForTag = createAction("ARTWORKS/SET_ARTWORKS_FOR_TAG");
const setArtworksLoading = createAction("ARTWORKS/SET_ARTWORKS_LOADING");
const setSelectedTag = createAction("ARTWORKS/SET_SELECTED_TAG");

const TAG = "ARTWORKS";
export function loadMoreArtworksForTag(tag: number) {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        const taggedArtworks = getState().taggedArtworks[tag];

        if (taggedArtworks && taggedArtworks.loading) {
            Logger.logDebug(TAG, `Artworks under tag: ${tag} are still loading.`);
            return;
        }

        if (!taggedArtworks) {
            Logger.logDebug(TAG, `Artworks under tag: ${tag} do not exist.`);
            return;
        }

        dispatch(startTask());
        dispatch(setArtworksLoading({ tag: tag, loading: true }));

        const nextPage = taggedArtworks.page + 1;

        try {

            console.log(`Getting more artworks for tag: ${tag} at page: ${nextPage}.`);
            const artworks = await Api.getArtworksForTag(tag, nextPage);

            console.log(`Getting more artworks for tag: ${tag} at page: ${nextPage}. Found ${artworks && artworks.length} artworks.`);
            dispatch(setArtworksForTag({ tag: tag, page: nextPage, data: artworks }));
        }
        catch (e) {
            console.log(e);
            Logger.logError(TAG, `Couldn't load more artworks for tag: ${tag} at page: ${nextPage}. ` +
                `Error: ${e}`);

            dispatch(setArtworksLoading({ tag: tag, loading: false }));
        }
        finally {
            dispatch(endTask());
        }
    }
}

export function selectTag(tag: number) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        dispatch(setSelectedTag(tag));
    }
}

export function getArtworksForTag(tag: number) {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        const taggedArtworks = getState().taggedArtworks[tag];

        if (taggedArtworks && taggedArtworks.loading) {
            Logger.logDebug(TAG, `Artworks under tag: ${tag} are still loading.`);
            return;
        }

        if (taggedArtworks && taggedArtworks.data) {
            return;
        }

        dispatch(startTask());
        dispatch(setArtworksLoading({ tag: tag, loading: true }));

        try {
            console.log(`Getting artworks for tag: ${tag}`);
            const artworks = await Api.getArtworksForTag(tag, 0);
            console.log(`Getting artworks for tag: ${tag}. Found ${artworks && artworks.length} artworks.`);
            dispatch(setArtworksForTag({ tag: tag, page: 0, data: artworks }));
        }
        catch (e) {
            console.log(e);
            Logger.logError(TAG, `Couldn't fetch artworks. ` +
                `Error: ${e}`);

            dispatch(setArtworksLoading({ tag: tag, loading: false }));
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const artworkReducers: ReducerMap<AppState, any> = {
    [setArtworksForTag.toString()](state, { payload }) {
        if (payload) {
            return {
                ...state,
                selectedTag: payload.tag,
                taggedArtworks: {
                    ...state.taggedArtworks,
                    [payload.tag]: {
                        page: payload.page,
                        data: appendTaggedArtworks(state, payload),
                        loading: false
                    }
                }
            }
        }

        return state;
    },
    [setSelectedTag.toString()](state, { payload }) {
        return {
            ...state,
            selectedTag: payload
        }
    },
    [setArtworksLoading.toString()](state, { payload }) {
        if (payload) {
            return {
                ...state,
                taggedArtworks: {
                    ...state.taggedArtworks,
                    [payload.tag]: {
                        ...state.taggedArtworks[payload.tag],
                        loading: payload.loading
                    }
                }
            }
        }

        return state;
    }
}

function appendTaggedArtworks(state: AppState, payload: any): Artwork[] {
    if (state.taggedArtworks[payload.tag] &&
        state.taggedArtworks[payload.tag].data) {
        return [...state.taggedArtworks[payload.tag].data, ...payload.data]
    }
    else {
        return payload.data;
    }

}

function delay(ms: number) {
    return new Promise<void>(function (resolve) {
        setTimeout(resolve, ms);
    });
}
