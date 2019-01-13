import React, { Component } from 'react';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import { AuctionsTabBar } from '../../Components/AuctionsTabBar';
import DataNotFound from '../../Components/DataNotFound';
import { Pill, Pills } from '../../Components/Pills';
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

const pills: Pill[] = [
    { key: 1, value: "Sztuka Młoda" },
    { key: 2, value: "Sztuka Młoda" },
    { key: 3, value: "Sztuka Współczesnej" },
    { key: 4, value: "Design" },
    { key: 5, value: "Malarstwo i Design" },
    { key: 6, value: "Wakacyjna" },
]

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
                <Pills pills={pills} onPillPressed={this.onPillPressed} />
                <AuctionsTabBar navigation={this.props.navigation}
                    incomingAuctions={currentAuctions}
                    closedAuctions={closedAuctions} />
            </AppContainer>
        )
    }

    private onPillPressed = (pill: Pill) => {
        console.log(pill);
    }
}
