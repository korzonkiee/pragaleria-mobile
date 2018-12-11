export const initialState: AppState = {
    tasksCount: 0,
    errorVisible: false,
    filteredArtists: [],
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
    artistDetails: {}
};
