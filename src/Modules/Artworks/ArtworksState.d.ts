// declare interface Tag {
//     readonly none: number;
//     readonly paint: number;
//     readonly sculpture: number;
//     readonly workshop: number;
//     readonly cyber: number;
//     readonly vector: number;
//     readonly ceramics: number;
// }

declare interface Artwork {
    readonly id: number;
    readonly title: string;
    readonly author: string;
    readonly author_id: number;
    readonly description: string;
    readonly sold: boolean;
    readonly initial_price: string;
    readonly sold_price: string;
    readonly year: string;
    readonly tags: Array<string>;
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
    readonly meta: { dimension: [number, number] }
}

declare interface ArtworksData {
    readonly data: Artwork[];
    readonly page: number;
    readonly allLoaded: boolean;
    readonly loading: boolean;
}

declare interface FilteredArtworksData {
    readonly data: Artwork[];
    readonly errorOccured: boolean;
}

declare interface ArtworksState {
    readonly selectedTag: number;
    readonly taggedArtworks: { readonly [tag: number]: ArtworksData }
    readonly filteredArtworks: FilteredArtworksData;
}

declare interface AppState extends ArtworksState {
}
