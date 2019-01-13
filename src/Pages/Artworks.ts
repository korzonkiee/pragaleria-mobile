import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getArtworksForTag, loadMoreArtworksForTag, selectTag } from "../Modules/Artworks";
import { Artworks, ArtworksProps } from "./Artworks/index";

export default connect(
    (state: AppState): StateProps<ArtworksProps> => {
        return {
            artworks: state.taggedArtworks[state.selectedTag],
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
            }
        };
    }
)(Artworks);
