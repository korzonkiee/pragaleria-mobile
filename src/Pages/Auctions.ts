import { connect } from "react-redux";
import { AuctionsProps, Auctions } from "./Auctions/index";
import { ThunkDispatch } from "../Helpers/StateHelpers";
import { updateCounter } from "../Modules/Home";

export default connect(
    (state: AppState): StateProps<AuctionsProps> => {
        return {
        }
    },
    (dispatch: ThunkDispatch): DispatchProps<AuctionsProps> => {
        return {
        };
    }
)(Auctions);
