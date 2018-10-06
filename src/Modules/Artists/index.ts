import { createAction, ReducerMap } from "redux-actions";
import { Dispatch } from "redux";
import { endTask, startTask } from "../Async";
import { AppState } from "../Async/AsyncStat";
import Logger from "../../Services/Logger"
import * as Api from "../../Services/Api";


const getArtistsAction = createAction("ARTISTS/GET");
const TAG = "GetArtists";

export function getArtists() {
    return async (dispatch: Dispatch<any>) => {
        dispatch(startTask());
        try {
            const artists = await Api.getArtists();
            dispatch(getArtistsAction(artists));
        }
        catch (e) {
            Logger.logError(TAG, `Couldn't fetch artists. ` +
                `Error: ${e}`);
        }
        finally {
            dispatch(endTask());
        }
    }
}

export const artistsReducers: ReducerMap<AppState, any> = {
    [getArtistsAction.toString()](state, {payload}) {
        return {
            ...state,
            artists: payload
        }
    }
};
