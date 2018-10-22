import { Artist } from "../../Models/Artist";
import { ArtistDetails } from "../../Models/ArtistDetails";

declare interface AsyncState {
    readonly tasksCount: number;
}

declare interface ArtistDetailsData {
    readonly data?: ArtistDetails | null;
    // null - merchant not visible
    // undefined - merchant not loaded yet
    readonly loading: boolean;
}

declare interface ArtistsState{
    readonly artists: Artist[];
    readonly artistDetails: { readonly [id: number]: ArtistDetailsData | undefined }
}

declare interface AppState extends AsyncState, ArtistsState {
}
