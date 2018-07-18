import { Dispatch } from "redux";
import { startTask, endTask } from "../Async";
import { createAction, ReducerMap } from "redux-actions";
import { initialState } from "../InitialState";

const updateCounterAction = createAction("COUNTER/UPDATE");

export function updateCounter() {
    return async (dispatch: Dispatch<any>) => {
        console.log("Starting...");
        dispatch(startTask());

        try {
            console.log("Waiting...");
            await delay(50);
            console.log("Waiting finishes...");

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
