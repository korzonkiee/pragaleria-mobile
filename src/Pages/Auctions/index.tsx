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
import AuctionsPlaceholder from '../../Components/Placeholders/AuctionsPlaceholder';


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
                <AuctionsPlaceholder />
            );
        }
        if (!this.props.auctions.loading && this.props.auctions.data.length === 0) {
            return (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getAuctions} />)
        }

        let incomingAuctions = auctionsData.filter(auction => {
            return !auction.is_past;
        });

        let closedAuctions = auctionsData.filter(auction => {
            return auction.is_past;
        });

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
