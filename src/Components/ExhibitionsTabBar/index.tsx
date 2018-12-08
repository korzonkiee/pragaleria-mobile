import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Black, White } from "../../Resources/Colors";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { ArtistArtworks } from "../ArtistArtworks";
import * as Nav from "react-navigation";
import font from "../../Styles/Fonts";
import { l } from "../../Services/Language";
import { AuctionsList } from "../AuctionsList";

interface ExhibitionsTabBarProps {
    readonly incomingExhibitions: Array<Auction>;
    readonly closedExhibitions: Array<Auction>;
}

export class ExhibitionsTabBar extends React.PureComponent<ExhibitionsTabBarProps & Nav.NavigationInjectedProps> {
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
            [l("Exhibitions.Incoming")]: () => <AuctionsList navigation={this.props.navigation}
                artworks={this.props.incomingExhibitions} />,
            [l("Exhibitions.Closed")]: () => <AuctionsList navigation={this.props.navigation}
                artworks={this.props.closedExhibitions} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
