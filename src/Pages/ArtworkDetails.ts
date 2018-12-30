import { connect } from "react-redux";
import * as Nav from "react-navigation";
import * as Routes from '../Routes';
import { ArtworkDetailsProps, ArtworkDetails } from "./ArtworkDetails/index";
import Logger from "../Services/Logger";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtworkDetailsProps> => {
        const artwork = ownProps.navigation.getParam(Routes.NavParamArtwork);

        if (!artwork) {
            Logger.logError("ArtworkDetails", `Error while navigating to artwork ${artwork.id}. Artwork not found.`);
        }

        return {
            artwork: artwork
        }
    }
)(ArtworkDetails);
