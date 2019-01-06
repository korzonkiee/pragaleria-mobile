import * as Nav from "react-navigation";
import { connect } from "react-redux";
import * as Routes from '../Routes';
import Logger from "../Services/Logger";
import { ArtworkDetails, ArtworkDetailsProps } from "./ArtworkDetails/index";


export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<ArtworkDetailsProps> => {
        const artwork = ownProps.navigation.getParam(Routes.NavParamArtwork);

        if (!artwork) {
            Logger.logError("ArtworkDetails", `Error while navigating to artwork ${artwork.id}. Artwork not found.`);
        }

        return {
            artwork: artwork,
            artistId: ownProps.navigation.getParam(Routes.NavParamAristId)
        }
    }
)(ArtworkDetails);
