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
    const now = TimeProvider.now().clone();
    if (state.categorizedAuctions[state.selectedCategory]) {
        return state.categorizedAuctions[state.selectedCategory]
            .data.filter(auction => {
                const auctionDate = moment(auction.auction_end);
                let dateCondition = null;
                if (state.dateFilter === 1) {
                    dateCondition = isCurrentMonth(auctionDate, now);
                } else if (state.dateFilter === 3) {
                    dateCondition = isCurrentYear(auctionDate, now);
                }

                if (dateCondition !== null) {
                    return dateCondition;
                } else {
                    return auctionDate.isAfter(now);
                }
            });
    } else {
        return [];
    }
}

function isCurrentMonth(date1: moment.Moment, now: moment.Moment) {
    return date1.month() === now.month() &&
        date1.year() === now.year();
}
function isCurrentYear(date1: moment.Moment, now: moment.Moment) {
    return date1.year() === now.year();
}
