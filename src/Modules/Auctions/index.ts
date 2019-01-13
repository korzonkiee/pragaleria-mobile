import { Dispatch } from "redux";
import { createAction, ReducerMap } from "redux-actions";
import * as Api from "../../Services/Api";
import Logger from "../../Services/Logger";
import { endTask, startTask } from "../Async";

const setAuctions = createAction("AUCTIONS/SET_AUCTIONS");
const setAuctionsForCategory = createAction("AUCTIONS/SET_AUCTIONS_FOR_CATEGORY");
const setAuctionsLoading = createAction("AUCTIONS/SET_AUCTIONS_LOADING");

const TAG = "AUCTIONS";

export function getAuctionsForCategory(category: number) {
    return async (dispatch: Dispatch<any>, _: any) => {
        try {
            const auctions = await Api.getAuctionsForCategory(category);
            dispatch(setAuctionsForCategory({ category: category, data: auctions }));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch auctions for category ${category}. ` +
                `Error: ${e}`);
        }
    }
}

export function getAuctions() {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        if (getState().auctions.loading) {
            return;
        }

        dispatch(startTask());
        dispatch(setAuctionsLoading(true));

        try {
            const auctions = await Api.getAuctions();
            dispatch(setAuctions(auctions));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch auctions. ` +
                `Error: ${e}`);
        }
        finally {
            dispatch(setAuctionsLoading(false));
            dispatch(endTask());
        }
    }
}


export const auctionsReducers: ReducerMap<AppState, any> = {
    [setAuctions.toString()](state, action) {
        if (action.payload) {
            return {
                ...state,
                auctions: {
                    data: [...state.auctions.data, ...action.payload],
                    loading: false
                }
            }
        }

        return state;
    },
    [setAuctionsForCategory.toString()](state, { payload }) {
        return {
            ...state,
            selectedCategory: [payload.category],
            categorizedAuctions: {
                ...state.categorizedAuctions,
                [payload.category]: {
                    data: payload.data,
                    loading: false
                }
            }
        }
    },
    [setAuctionsLoading.toString()](state, action) {
        if (action.payload !== undefined) {
            return {
                ...state,
                auctions: {
                    ...state.auctions,
                    loading: action.payload
                }
            };
        }

        return state;
    },
}
