import { connect } from "react-redux";
import { filterIncomingAuctions } from "../Services/AuctionFilters";
import { AuctionsList, AuctionsListProps } from "./AuctionsList/index";
import moment = require("moment");

export default connect(
    (state: AppState): AuctionsListProps => {
        return {
            auctions: filterIncomingAuctions(state)
        };
    }
)(AuctionsList);


