import {createAction, ReducerMap} from "redux-actions";
import {Dispatch} from "redux";
import {endTask, startTask} from "../Async";
import {AppState} from "../Async/AsyncStat";
import {api_endpoints, api_instance, artists} from "../../Helpers/RestHelpers";

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

type ApiReponseArtists = {
    config: any;
    data: [Artist];
    header: any;
    request: any;
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

async function api_call_get_artists() {
    return api_instance.get(api_endpoints[artists])
        .then(function (response: ApiReponseArtists) {
            console.log("Received:", response);
            return response.data.map(d => new Artist(d.author, d.thumbnail));
        })
        .catch(function (error: any) {
            console.log(error);
        })
}

export const artistsReducers: ReducerMap<AppState, {}> = {
    [getArtistsAction.toString()](state, {payload}) { //TODO fix this typing with payload
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
