import { connect } from "react-redux";
import { TimeProvider } from "../Services/TimeProvider";
import { AuctionsList, AuctionsListProps } from "./AuctionsList/index";
import moment = require("moment");

export default connect(
    (state: AppState): AuctionsListProps => {
        return {
            auctions: filterAuctions(state)
        };
    }
)(AuctionsList);

function filterAuctions(state: AppState) {
    if (state.categorizedAuctions[state.selectedCategory]) {
        return state.categorizedAuctions[state.selectedCategory]
            .data.filter(auction => {
                const auctionDate = moment(auction.auction_end);
                return auctionDate.isAfter(TimeProvider.now());
            });
    } else {
        return [];
    }
}
