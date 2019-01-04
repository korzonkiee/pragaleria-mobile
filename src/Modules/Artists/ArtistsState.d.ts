declare interface Artwork {
    readonly id: number;
    readonly title: string;
    readonly author: string;
    readonly description: string;
    readonly sold: boolean;
    readonly initial_price: string;
    readonly sold_price: string;
    readonly year: string;
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
    readonly meta: { dimension: [number, number] }
}

declare interface Artist {
    readonly id: number;
    readonly name: string;
    readonly slug: string;
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
}

declare interface ArtistDetails {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly slug: string;
    readonly artworks: Artwork[];
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
}

declare interface ArtistDetailsData {
    readonly data?: ArtistDetails | null;
    readonly loading: boolean;
}

declare interface ArtistsData {
    readonly data: Artist[];
    readonly page: number;
    readonly loading: boolean;
}

declare interface FilteredAristsData {
    readonly data: Artist[];
    readonly errorOccured: boolean;
}

declare interface ArtistsState {
    readonly artists: ArtistsData;
    readonly filteredArtists: FilteredAristsData;
    readonly artistDetails: { readonly [id: number]: ArtistDetailsData }
}

declare interface AppState extends ArtistsState {
}
