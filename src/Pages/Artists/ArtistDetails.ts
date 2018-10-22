import { connect } from "react-redux";
import * as Nav from "react-navigation";
import { ArtistsDetailsProps, ArtistDetails } from "./ArtistsDetails/index"
import { ThunkDispatch } from "../../Helpers/StateHelpers";
import { getArtists } from "../../Modules/Artists";
import { AppState } from "../../Modules/Async/AsyncStat";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtistsDetailsProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<ArtistsDetailsProps> => {
        return {
        };
    }
)(ArtistDetails);
