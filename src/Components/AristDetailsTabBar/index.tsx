import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Black, White } from "../../Resources/Colors";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { ArtistArtworks } from "../ArtistArtworks";
import * as Nav from "react-navigation";
import font from "../../Styles/Fonts";
import { l } from "../../Services/Language";

interface AristDetailsTabBarProps {
    readonly artistId: number;
    readonly availableArtworks: Artwork[];
    readonly soldArtworks: Artwork[];
}

export class AristDetailsTabBar extends React.PureComponent<AristDetailsTabBarProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle = {
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
            [l("ArtistDetails.Available")]: () => <ArtistArtworks navigation={this.props.navigation}
                artistId={this.props.artistId}
                artworks={this.props.availableArtworks} />,
            [l("ArtistDetails.Sold")]: () => <ArtistArtworks navigation={this.props.navigation}
                artistId={this.props.artistId}
                artworks={this.props.soldArtworks} />,
        };

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
