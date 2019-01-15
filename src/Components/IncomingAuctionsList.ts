import { connect } from "react-redux";
import { AuctionsList, AuctionsListProps } from "./AuctionsList/index";

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
                return auction.is_current;
            });
    } else {
        return [];
    }
}
