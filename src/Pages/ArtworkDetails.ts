import * as Nav from "react-navigation";
import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getArtistDetails } from "../Modules/Artists";
import * as Routes from '../Routes';
import Logger from "../Services/Logger";
import { ArtworkDetails, ArtworkDetailsProps } from "./ArtworkDetails/index";


export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtworkDetailsProps> => {
        const artwork = ownProps.navigation.getParam(Routes.NavParamArtwork);

        let artist = ownProps.navigation.getParam(Routes.NavParamArist);

        console.log(artwork)
        console.log(artist)

        if (!artist) {
            artist = state.artistDetails[artwork.artist_id];
            // const artistDetails = getArtistDetails(artwork.artist_id);
            // console.log(artistDetails) // loguje sie
            // ƒ (dispatch) {
            //     return __awaiter(_this3, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
            //       var artistDetails;
            //       return regeneratorRuntime.wrap(function _callee3$(_context…
        }

        if (!artwork) {
            Logger.logError("ArtworkDetails", `Error while navigating to artwork ${artwork.id}. Artwork not found.`);
        }

        return {
            artwork: artwork,
            artist: artist
        }
    },
    (dispatch: ThunkDispatch, ownProps: Nav.NavigationInjectedProps): DispatchProps<ArtworkDetailsProps> => {
        return {
            getArtistDetails(artistId: number) {
                return dispatch(getArtistDetails(artistId));
            }
        };
    }
)(ArtworkDetails);
