import { connect } from "react-redux";
import { AuctionsProps, Auctions } from "./Auctions/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { getAuctions } from "../Modules/Auctions";

export default connect(
    (state: AppState): StateProps<AuctionsProps> => {
        return {
            auctions: state.auctions
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<AuctionsProps> => {
        return {
            getAuctions () {
                dispatch(getAuctions())
            }
        };
    }
)(Auctions);
