declare interface CatalogItem extends Artwork {
    readonly after_auction_price: string;
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
