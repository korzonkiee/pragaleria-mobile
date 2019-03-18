// For now exhibition has the same structure as Auction
declare interface Exhibition extends Auction {

}

declare interface ExhibitionsData {
    readonly data: Exhibition[];
    readonly loading: boolean;
}

declare interface ExhibitionsState {
    readonly exhibitions: ExhibitionsData;
}

declare interface AppState extends ExhibitionsState {
}
