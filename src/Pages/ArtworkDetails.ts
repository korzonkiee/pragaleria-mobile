import { connect } from "react-redux";
import * as Nav from "react-navigation";
import * as Routes from '../Routes';
import { ArtworkDetailsProps, ArtworkDetails } from "./ArtworkDetails/index";
import Logger from "../Services/Logger";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtworkDetailsProps> => {
        const artistParam = ownProps.navigation.getParam(Routes.NavParamAristId);
        const artistDetails = state.artistDetails[artistParam];

        const artworkParam = ownProps.navigation.getParam(Routes.NavParamArtworkId);
        const artwork = artistDetails.data ? artistDetails.data.artworks
            .filter(a => a.id == artworkParam)[0] : null;

        if (!artwork) {
            Logger.logError("ArtworkDetails", `Error while navigating to artwork ${artworkParam} of artist ${artistParam}. Artwork not found.`);
        }

        return {
            artwork: artwork,
            author: artistDetails.data!.name
        }
    }
)(ArtworkDetails);
