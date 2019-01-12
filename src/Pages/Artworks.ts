import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getArtworks } from "../Modules/Artworks";
import { Artworks, ArtworksProps } from "./Artworks/index";

export default connect(
    (state: AppState): StateProps<ArtworksProps> => {
        return {
            artworks: state.artworks
        };
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtworksProps> => {
        return {
            getArtworks(tag: Tag) {
                dispatch(getArtworks(tag))
            }
        };
    }
)(Artworks);
