import {createAction, ReducerMap} from "redux-actions";
import {Dispatch} from "redux";
import {endTask, startTask} from "../Async";
import {AppState} from "../Async/AsyncStat";
import {api_call_get_artists} from "../../Helpers/RestHelpers";

const getArtistsAction = createAction("ARTISTS/GET");
const TAG = "GetArtists";

export class Artist { // TODO move to other file
    author: string;
    thumbnail: string;

    constructor(author: string, thumbnail: string) {
        this.author = author;
        this.thumbnail = thumbnail;
    }

    toString(): string {
        return `${this.author}:${this.thumbnail}`
    }
}

export function getArtists() {
    return async (dispatch: Dispatch<any>) => {
        console.log("getArtists called");
        dispatch(startTask());
        try {
            await delay(50);
            const artists_arr = await api_call_get_artists();
            dispatch(getArtistsAction(artists_arr));
        }
        catch (e) {
            //TODO: Logger.
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

function delay(ms: number) {
    return new Promise<void>(function (resolve) {
        setTimeout(resolve, ms);
    });
}
