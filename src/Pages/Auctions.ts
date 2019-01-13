import { connect } from "react-redux";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getAuctions, getAuctionsForCategory } from "../Modules/Auctions";
import { Auctions, AuctionsProps } from "./Auctions/index";

export default connect(
    (state: AppState): StateProps<AuctionsProps> => {
        return {
            auctions: state.categorizedAuctions[state.selectedCategory]
        };
    },
    (dispatch: ThunkDispatch): DispatchProps<AuctionsProps> => {
        return {
            getAuctions() {
                dispatch(getAuctions())
            },
            getAuctionsForCategory(category: number) {
                dispatch(getAuctionsForCategory(category))
            },
        };
    }
)(Auctions);
