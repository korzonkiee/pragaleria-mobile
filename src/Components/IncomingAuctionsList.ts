import { connect } from "react-redux";
import { AuctionsList, AuctionsListProps } from "./AuctionsList/index";

export default connect(
    (state: AppState): AuctionsListProps => {
        return {
            auctions: state.categorizedAuctions[state.selectedCategory].data.filter(auction => { return auction.is_current })
        };
    }
)(AuctionsList);
