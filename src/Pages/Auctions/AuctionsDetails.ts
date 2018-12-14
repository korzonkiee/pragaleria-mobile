import { connect } from "react-redux";
import * as Nav from "react-navigation";
import * as Routes from "../../Routes";
import { AuctionDetailsProps, AuctionDetails } from "./AuctionsDetails/index"
import { ThunkDispatch } from "../../Helpers/StateHelpers";
import { getCatalog } from "../../Modules/Catalogs";
import { NavParamAuction } from '../../Routes';

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<AuctionDetailsProps> => {
        const auction: Auction = ownProps.navigation.getParam(Routes.NavParamAuction);
        return {
            auction: auction,
            catalog: state.catalogs[auction.id]
        }
    },
    (dispatch: ThunkDispatch, ownProps: Nav.NavigationInjectedProps): DispatchProps<AuctionDetailsProps> => {
        const auction: Auction = ownProps.navigation.getParam(Routes.NavParamAuction);
        return {
            getAuctionsDetails() {
                return dispatch(getCatalog(auction.id));
            }
        };
    }
)(AuctionDetails);
