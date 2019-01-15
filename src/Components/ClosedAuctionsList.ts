import moment from "moment";
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
    const now = moment(moment.now());
    if (state.categorizedAuctions[state.selectedCategory]) {
        return state.categorizedAuctions[state.selectedCategory]
            .data.filter(auction => {
                const date = moment(auction.auction_end);
                console.log(`Now: ${now.year()}. Date: ${date.year()}`);

                let dateCondition;
                let nowCopy = now.clone();

                if (state.dateFilter === 1) {
                    dateCondition = isCurrentMonth(date, nowCopy);
                } else if (state.dateFilter === 2) {
                    dateCondition = isPreviousMonth(date, nowCopy);
                } else if (state.dateFilter === 3) {
                    dateCondition = isCurrentYear(date, nowCopy);
                } else if (state.dateFilter === 4) {
                    dateCondition = isPreviousYear(date, nowCopy);
                } else if (state.dateFilter === 5) {
                    dateCondition = isOlder(date, nowCopy);
                } else {
                    dateCondition = true;
                }

                return !auction.is_current && dateCondition;
            });
    } else {
        return [];
    }
}

function isCurrentMonth(date1: moment.Moment, now: moment.Moment) {
    return date1.month() === now.month() &&
        date1.year() === now.year();
}

function isPreviousMonth(date1: moment.Moment, now: moment.Moment) {
    return date1.month() === now.subtract(1, "month").month() &&
        date1.year() === now.subtract(1, "month").year();
}

function isCurrentYear(date1: moment.Moment, now: moment.Moment) {
    return date1.year() === now.year();
}

function isPreviousYear(date1: moment.Moment, now: moment.Moment) {
    return date1.year() === now.subtract(1, 'year').year();
}

function isOlder(date1: moment.Moment, now: moment.Moment) {
    return date1.year() < now.subtract(1, 'year').year();
}

