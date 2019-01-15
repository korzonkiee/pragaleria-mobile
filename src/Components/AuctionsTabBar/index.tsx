import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import { Black, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import ClosedAuctionsList from "../ClosedAuctionsList";
import IncomingAuctionsList from "../IncomingAuctionsList";

export class AuctionsTabBar extends React.PureComponent<Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle = {
            backBehavior: 'none',
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
            [l("Auctions.Incoming")]: () => <IncomingAuctionsList navigation={this.props.navigation} />,
            [l("Auctions.Closed")]: () => <ClosedAuctionsList navigation={this.props.navigation} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
