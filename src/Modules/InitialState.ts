export const initialState: AppState = {
    tasksCount: 0,
    errorVisible: false,
    filteredArtists: {
        data: [],
        errorOccured: false
    },
    artists: {
        data: [],
        page: 0,
        loading: false
    },
    auctions: {
        data: [],
        loading: false
    },
    exhibitions: {
        data: [],
        loading: false
    },
    artistDetails: {},
    catalogs: {},
};
