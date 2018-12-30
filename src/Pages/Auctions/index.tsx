import React, { Component } from 'react';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import { AuctionsTabBar } from '../../Components/AuctionsTabBar';
import DataNotFound from '../../Components/DataNotFound';
import AuctionsPlaceholder from '../../Components/Placeholders/AuctionsPlaceholder';
import { DirtyWhite } from '../../Resources/Colors';
import { l } from '../../Services/Language';


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

        const currentAuctions = auctionsData.filter(auction => {
            return auction.is_current;
        });

        const closedAuctions = auctionsData.filter(auction => {
            return !auction.is_current;
        });

        return (
            <AppContainer style={{
                flex: 1,
                backgroundColor: DirtyWhite,
            }}>
                <AuctionsTabBar navigation={this.props.navigation}
                    incomingAuctions={currentAuctions}
                    closedAuctions={closedAuctions} />
            </AppContainer>
        )
    }
}
