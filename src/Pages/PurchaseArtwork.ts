import { connect } from "react-redux";
import * as Nav from "react-navigation";
import * as Routes from '../Routes';
import { PurchaseArtworkProps, PurchaseArtwork } from "./PurchaseArtwork/index";
import Logger from "../Services/Logger";
import { NavParamArtwork } from '../Routes';

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<PurchaseArtworkProps> => {
        return {
            artwork: ownProps.navigation.getParam(Routes.NavParamArtwork)
        }
    }
)(PurchaseArtwork);
