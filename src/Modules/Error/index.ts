import { createAction } from "redux-actions"
import { Thunk } from "../../Helpers/StateHelpers"

export function handleError(error: Error): Thunk {
    return async (dispatch) => {
        dispatch(showError());
    };
}

export const showError = createAction("ERROR/SHOW");
export const hideError = createAction("ERROR/HIDE");

export const errorReducers = {
    [showError.toString()](state: AppState) { return { ...state, errorVisible: true }; },
    [hideError.toString()](state: AppState) { return { ...state, errorVisible: false }; }
};


