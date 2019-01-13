import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { clearFilteredArtworks, getArtworksForTag, loadMoreArtworksForTag, searchArtworksForTag, selectTag } from "../Modules/Artworks";
import { Artworks, ArtworksProps } from "./Artworks/index";

export default connect(
    (state: AppState): StateProps<ArtworksProps> => {
        return {
            artworks: state.taggedArtworks[state.selectedTag],
            filteredArtworks: state.filteredArtworks,
            selectedTag: state.selectedTag,
        };
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtworksProps> => {
        return {
            getArtworks(tag: number) {
                dispatch(getArtworksForTag(tag))
            },
            selectTag(tag: number) {
                dispatch(selectTag(tag))
            },
            loadMoreArtworksForTag(tag: number) {
                dispatch(loadMoreArtworksForTag(tag))
            },
            searchForArtworks(keyword: string, tag: number) {
                dispatch(searchArtworksForTag(keyword, tag))
            },
            clearFilteredArtworks() {
                dispatch(clearFilteredArtworks())
            }
        };
    }
)(Artworks);
