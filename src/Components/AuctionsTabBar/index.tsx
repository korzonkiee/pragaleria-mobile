import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator, TabNavigatorConfig } from "react-navigation";
import { connect } from "react-redux";
import { Black, White } from "../../Resources/Colors";
import { filterClosedAuctions, filterIncomingAuctions } from "../../Services/AuctionFilters";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import ClosedAuctionsList from "../ClosedAuctionsList";
import IncomingAuctionsList from "../IncomingAuctionsList";

interface AuctionsTabProps {
    readonly incomingAuctions: Auction[];
    readonly closedAuctions: Auction[];
}

const incomingTab = l("Auctions.Incoming");
const closedTab = l("Auctions.Closed");

class AuctionsTabBar extends React.PureComponent<AuctionsTabProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle: TabNavigatorConfig = {
            backBehavior: 'none',
            initialRouteName: this.getInitialTab(),
            tabBarOptions: {
                upperCaseLabel: false,
                labelStyle: {
                    ...font(),
                    color: Black
                },
                style: {
                    backgroundColor: White
                },
                indicatorStyle: {
                    backgroundColor: 'black'
                }
            }
        };

        const pages = {
            [incomingTab]: () => <IncomingAuctionsList navigation={this.props.navigation} />,
            [closedTab]: () => <ClosedAuctionsList navigation={this.props.navigation} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }

    private getInitialTab() {
        if (this.props.incomingAuctions.length === 0) {
            return closedTab;
        } else {
            return incomingTab;
        }
    }
}

export default connect(
    (state: AppState): AuctionsTabProps => {
        return {
            incomingAuctions: filterIncomingAuctions(state),
            closedAuctions: filterClosedAuctions(state),
        };
    }
)(AuctionsTabBar);
