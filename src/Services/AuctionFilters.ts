import { TimeProvider } from "./TimeProvider";
import moment = require("moment");

export function filterIncomingAuctions(state: AppState) {
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

export function filterClosedAuctions(state: AppState) {
    const now = TimeProvider.now().clone();
    if (state.categorizedAuctions[state.selectedCategory]) {
        return state.categorizedAuctions[state.selectedCategory]
            .data.filter(auction => {
                const auctionDate = moment(auction.auction_end);
                console.log(`Now: ${now.year()}. Date: ${auctionDate.year()}`);

                let dateCondition;
                const isCurrent = auctionDate.isAfter(now);

                if (state.dateFilter === 1) {
                    dateCondition = isCurrentMonth(auctionDate, now);
                } else if (state.dateFilter === 2) {
                    dateCondition = isPreviousMonth(auctionDate, now);
                } else if (state.dateFilter === 3) {
                    dateCondition = isCurrentYear(auctionDate, now);
                } else if (state.dateFilter === 4) {
                    dateCondition = isPreviousYear(auctionDate, now);
                } else if (state.dateFilter === 5) {
                    dateCondition = isOlder(auctionDate, now);
                } else {
                    dateCondition = true;
                }

                return !isCurrent && dateCondition;
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
