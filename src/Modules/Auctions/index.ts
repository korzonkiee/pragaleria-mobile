import { createAction, ReducerMap } from "redux-actions";
import { Dispatch } from "redux";
import { endTask, startTask } from "../Async";
import Logger from "../../Services/Logger"
import * as Api from "../../Services/Api";

const setAuctions = createAction("AUCTIONS/SET_AUCTIONS");
const setAuctionsLoading = createAction("AUCTIONS/SET_AUCTIONS_LOADING");

const TAG = "AUCTIONS";

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
