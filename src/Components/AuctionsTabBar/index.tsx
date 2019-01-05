import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import { Black, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import { AuctionsList } from "../AuctionsList";

interface AuctionsTabBarProps {
    readonly incomingAuctions: Array<Auction>;
    readonly closedAuctions: Array<Auction>;
}

export class AuctionsTabBar extends React.PureComponent<AuctionsTabBarProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle = {
            backBehavior: 'none',
            tabBarOptions: {
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
            [l("Auctions.Incoming")]: () => <AuctionsList navigation={this.props.navigation}
                artworks={this.props.incomingAuctions}
                artworksNotFoundMessage={l("Auctions.NoIncomingAuctions")} />,
            [l("Auctions.Closed")]: () => <AuctionsList navigation={this.props.navigation}
                artworks={this.props.closedAuctions}
                artworksNotFoundMessage={l("Auctions.NoClosedAuctions")} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
