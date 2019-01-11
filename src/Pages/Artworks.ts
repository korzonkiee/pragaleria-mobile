import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { Artworks, ArtworksProps } from "./Artworks/index";

export default connect(
    (state: AppState): StateProps<ArtworksProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtworksProps> => {
        return {
        };
    }
)(Artworks);
