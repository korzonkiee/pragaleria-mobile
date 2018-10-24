import { connect } from "react-redux";
import * as Nav from "react-navigation";
import { ArtistsDetailsProps, ArtistDetails } from "./ArtistsDetails/index"
import { ThunkDispatch } from "../../Helpers/StateHelpers";
import { getArtists, getArtistDetails } from "../../Modules/Artists";
import { AppState } from "../../Modules/Async/AsyncStat";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtistsDetailsProps> => {
        return {
            artist: state.artistDetails[ownProps.navigation.getParam("id")]
        }
    },
    (dispatch: ThunkDispatch, ownProps: Nav.NavigationInjectedProps): DispatchProps<ArtistsDetailsProps> => {
        return {
            getArtistDetails() {
                return dispatch(getArtistDetails(ownProps.navigation.getParam("id")));
            }
        };
    }
)(ArtistDetails);
