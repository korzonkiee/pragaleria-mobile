import { createAction, ReducerMap } from "redux-actions";
import { Dispatch } from "redux";
import { endTask, startTask } from "../Async";
import Logger from "../../Services/Logger"
import * as Api from "../../Services/Api";

const setExhibitions = createAction("EXHIBITIONS/SET_EXHIBITIONS");
const setExhibitionsLoading = createAction("EXHIBITIONS/SET_EXHIBITIONS_LOADING");

const TAG = "EXHIBITIONS";

export function getExhibitions() {
    return async (dispatch: Dispatch<any>, getState: () => AppState) => {
        if (getState().exhibitions.loading) {
            return;
        }

        dispatch(startTask());
        dispatch(setExhibitionsLoading(true));

        try {
            const exhibitions = await Api.getExhibitions();
            dispatch(setExhibitions(exhibitions));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch exhibitions. ` +
                `Error: ${e}`);

            dispatch(setExhibitionsLoading(false));
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const exhibitionsReducers: ReducerMap<AppState, any> = {
    [setExhibitions.toString()](state, action) {
        if (action.payload) {
            return {
                ...state,
                exhibitions: {
                    data: [...state.exhibitions.data, ...action.payload],
                    loading: false
                }
            }
        }

        return state;
    },
    [setExhibitionsLoading.toString()](state, action) {
        if (action.payload !== undefined) {
            return {
                ...state,
                exhibitions: {
                    ...state.exhibitions,
                    loading: action.payload
                }
            };
        }

        return state;
    },
}
