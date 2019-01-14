import * as Nav from "react-navigation";
import { connect } from "react-redux";
import { ThunkDispatch } from "../../Helpers/StateHelpers";
import { getCatalog, searchArtistInCatalog } from "../../Modules/Catalogs";
import * as Routes from "../../Routes";
import { AuctionDetails, AuctionDetailsProps } from "./AuctionsDetails/index";

export default connect(
    (state: AppState, ownProps: Nav.NavigationInjectedProps): StateProps<AuctionDetailsProps> => {
        const auction: Auction = ownProps.navigation.getParam(Routes.NavParamAuction);

        const catalogData = state.catalogs[auction.id];

        let catalogDataOnlySold: CatalogItem[] | never[] = [];

        if (catalogData && catalogData.data) {
            catalogDataOnlySold = catalogData.data.filter(
                (catalogItem) => catalogItem.sold === false
            );
        }

        return {
            auction: auction,
            catalog: state.catalogs[auction.id],
            catalogDataOnlySold: catalogDataOnlySold
        }
    },
    (dispatch: ThunkDispatch, ownProps: Nav.NavigationInjectedProps): DispatchProps<AuctionDetailsProps> => {
        const auction: Auction = ownProps.navigation.getParam(Routes.NavParamAuction);
        return {
            getAuctionsDetails() {
                return dispatch(getCatalog(auction.id));
            },
            searchArtistInCatalog(catalog: CatalogData, query: string) {
                return dispatch(searchArtistInCatalog(catalog, query));
            }
        };
    }
)(AuctionDetails);
