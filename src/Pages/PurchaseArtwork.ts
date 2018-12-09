import { connect } from "react-redux";
import * as Nav from "react-navigation";
import * as Routes from '../Routes';
import { PurchaseArtworkProps, PurchaseArtwork } from "./PurchaseArtwork/index";
import Logger from "../Services/Logger";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<PurchaseArtworkProps> => {
        // const artistParam = ownProps.navigation.getParam(Routes.NavParamAristId);
        // const artistDetails = state.artistDetails[artistParam];

        // const artworkParam = ownProps.navigation.getParam(Routes.NavParamArtworkId);
        // const artwork = artistDetails.data ? artistDetails.data.artworks
        //     .filter(a => a.id == artworkParam)[0] : null;

        // if (!artwork) {
        //     Logger.logError("PurchaseArtwork", `Error while navigating to purchase artwork ${artworkParam} of artist ${artistParam}. Artwork not found.`);
        // }

        return {
            artwork: ownProps.navigation.getParam(Routes.NavParamAristId),
        }
    }
)(PurchaseArtwork);
