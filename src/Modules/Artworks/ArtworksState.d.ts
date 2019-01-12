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
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
    readonly meta: { dimension: [number, number] }
}

declare enum Tag {
    none = 0,
    paint = 12,
    sculpture = 145,
    workshop = 231,
    cyber = 233,
    vector = 235,
    ceramics = 1385
}

declare interface ArtworksData {
    readonly data: Artwork[];
    readonly page: number;
    readonly loading: boolean;
}

declare interface ArtworksState {
    readonly artworks: ArtworksData;
}

declare interface AppState extends ArtworksState {
}
