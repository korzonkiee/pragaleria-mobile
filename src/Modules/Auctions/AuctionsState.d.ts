declare interface Auction {
    readonly id: number;
    readonly title: string;
    readonly description_content: string;
    readonly description_excerpt: string;
    readonly guid: string;
    readonly date: string;
    readonly is_current: boolean;
    readonly auction_start: string;
    readonly auction_end: string;
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
    readonly urls: {
        virtual_tour: string,
        bidding: string,
    }
}

declare interface AuctionsData {
    readonly data: Auction[];
    readonly loading: boolean;
}

declare interface AuctionsState {
    readonly auctions: AuctionsData;
}

declare interface AppState extends AuctionsState {
}
