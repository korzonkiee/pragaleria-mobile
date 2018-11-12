import { connect } from "react-redux";
import { ArtistsProps, Artists } from "./Artists/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getArtists } from "../Modules/Artists";

export default connect(
    (state: AppState): StateProps<ArtistsProps> => {
        return {
            artists: state.artists
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtistsProps> => {
        return {
            getArtists () {
                dispatch(getArtists())
            }
        };
    }
)(Artists);
