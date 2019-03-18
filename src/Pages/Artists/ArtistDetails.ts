import { connect } from "react-redux";
import * as Nav from "react-navigation";
import * as Routes from "../../Routes";
import { ArtistsDetailsProps, ArtistDetails } from "./ArtistsDetails/index"
import { ThunkDispatch } from "../../Helpers/StateHelpers";
import { getArtistDetails } from "../../Modules/Artists";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtistsDetailsProps> => {
        return {
            artist: state.artistDetails[ownProps.navigation.getParam(Routes.NavParamAristId)]
        }
    },
    (dispatch: ThunkDispatch, ownProps: Nav.NavigationInjectedProps): DispatchProps<ArtistsDetailsProps> => {
        return {
            getArtistDetails() {
                return dispatch(getArtistDetails(ownProps.navigation.getParam(Routes.NavParamAristId)));
            }
        };
    }
)(ArtistDetails);
