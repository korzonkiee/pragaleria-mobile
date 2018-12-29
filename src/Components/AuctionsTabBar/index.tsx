import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Black, White } from "../../Resources/Colors";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { ArtistArtworks } from "../ArtistArtworks";
import * as Nav from "react-navigation";
import font from "../../Styles/Fonts";
import { l } from "../../Services/Language";
import { AuctionsList } from "../AuctionsList";

interface AuctionsTabBarProps {
    readonly incomingAuctions: Array<Auction>;
    readonly closedAuctions: Array<Auction>;
}

export class AuctionsTabBar extends React.PureComponent<AuctionsTabBarProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle = {
            backBehavior: 'none',
            optimizationsEnabled: true,
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
