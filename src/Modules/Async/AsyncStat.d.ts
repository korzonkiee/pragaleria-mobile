import {Artist} from "../Artists";

declare interface AsyncState {
    readonly tasksCount: number;
}

declare interface ArtistsState{
    readonly artists: Artist[];
}

declare interface AppState extends AsyncState, ArtistsState {
    readonly counter: number;
}
