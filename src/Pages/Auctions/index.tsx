import React, { Component } from 'react';
import { View } from 'react-native';
import * as Nav from "react-navigation";
import DataNotFound from '../../Components/DataNotFound';
import AppContainer from '../../Components/AppContainer';
import { l } from '../../Services/Language';
import { DirtyWhite } from '../../Resources/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';
import moment from 'moment';
import { AuctionsTabBar } from '../../Components/AuctionsTabBar';


export interface AuctionsProps {
    readonly auctions: AuctionsData;
    readonly getAuctions: () => void;
}

interface AuctionsState {
    readonly index: number;
    readonly routes: Array<any>;
}

export class Auctions extends Component<AuctionsProps & Nav.NavigationInjectedProps, AuctionsState> {
    constructor(props: AuctionsProps & Nav.NavigationInjectedProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.auctions.loading) {
            this.props.getAuctions();
        }
    }

    render() {
        const auctionsData = this.props.auctions.data;

        // Placeholder
        if (this.props.auctions.loading) {
            return (
                <View />
            );
        }
        if (!this.props.auctions.loading && this.props.auctions.data.length === 0) {
            return (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getAuctions} />)
        }

        // --- --- --- --- This is going to be removed
        let incomingAuctions: Array<Auction>;
        let closedAuctions: Array<Auction>;

        let today = moment("2018-05-26", "YYYY-MM-DD");
        incomingAuctions = auctionsData.filter(auction => {
            return !moment(auction.auction_start, "YYYY/MM/DD HH:mm").isBefore(today);
        });
        closedAuctions = auctionsData.filter(auction => {
            return moment(auction.auction_start, "YYYY/MM/DD HH:mm").isBefore(today);
        });
        // --- --- --- --- --- --- --- --- --- --- ---

        return (
            <AppContainer style={{
                flex: 1,
                backgroundColor: DirtyWhite,
            }}>
                <AuctionsTabBar navigation={this.props.navigation}
                    incomingAuctions={incomingAuctions}
                    closedAuctions={closedAuctions} />
            </AppContainer>
        )
    }
}
