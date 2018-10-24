import {AppState} from "./Async/AsyncStat";

export const initialState: AppState = {
    tasksCount: 0,
    artists: {
        data: [],
        page: 0,
        loading: false
    },
    artistDetails: {}
};
