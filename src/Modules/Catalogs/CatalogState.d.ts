declare interface CatalogItem {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly initial_price: string;
    readonly sold_price: string;
    readonly after_auction_price: string;
    readonly sold: boolean;
    readonly author: string;
    readonly image_original: string;
    readonly image_thumbnail: string;
    readonly image_large: string;
    readonly image_medium: string;
    readonly image_big_thumbnail: string;
    readonly image_medium_thumbnail: string;
}

declare interface CatalogData {
    readonly data: CatalogItem[];
    readonly loading: boolean;
}

declare interface CatalogsState {
    readonly catalogs: { readonly [id: number]: CatalogData }
}

declare interface AppState extends CatalogsState {
}
