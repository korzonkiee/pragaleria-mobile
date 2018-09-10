import { createAction } from "redux-actions";

export function StartTask(state: AsyncState): AsyncState {
    return { tasksCount: state.tasksCount + 1 };
}

export function EndTask(state: AsyncState): AsyncState {
    return { tasksCount: state.tasksCount > 0 ? state.tasksCount - 1 : 0 };
}

export const startTask = createAction("TASK/START");
export const endTask = createAction("TASK/END");

export const asyncActionsReducers = {
    [startTask.toString()](state: AppState) { return { ...state, ...StartTask(state) }; },
    [endTask.toString()](state: AppState) { return { ...state, ...EndTask(state) }; }
};
