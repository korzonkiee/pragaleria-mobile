import { connect } from "react-redux";
import { filterClosedAuctions } from "../Services/AuctionFilters";
import { AuctionsList, AuctionsListProps } from "./AuctionsList/index";


export default connect(
    (state: AppState): AuctionsListProps => {
        return {
            auctions: filterClosedAuctions(state)
        };
    }
)(AuctionsList);

