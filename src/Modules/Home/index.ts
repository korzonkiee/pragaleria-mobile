import { Dispatch } from "redux";
import { startTask, endTask } from "../Async";
import { createAction, ReducerMap } from "redux-actions";
import { initialState } from "../InitialState";
import Logger from "../../Services/Logger";

const updateCounterAction = createAction("COUNTER/UPDATE");

const TAG = "UpdateCounter";

export function updateCounter() {
    return async (dispatch: Dispatch<any>) => {
        Logger.logDebug(TAG, "Update counter started.");
        Logger.forceSendOnce();

        dispatch(startTask());

        try {
            await delay(50);
            dispatch(updateCounterAction());
        }
        catch (e) {
            //TODO: Logger.
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const homeReducers: ReducerMap<AppState, {}> = {
    [updateCounterAction.toString()](state, _) {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
}

function delay(ms: number) {
    return new Promise<void>(function (resolve) {
        setTimeout(resolve, ms);
    });
}
