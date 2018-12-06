declare interface ExhibitionsData {
    readonly data: Auction[];
    readonly loading: boolean;
}

declare interface ExhibitionsState {
    readonly exhibitions: ExhibitionsData;
}

declare interface AppState extends ExhibitionsState {
}
