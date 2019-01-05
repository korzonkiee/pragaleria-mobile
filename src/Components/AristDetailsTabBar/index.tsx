import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import { Black, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import { ArtistArtworks } from "./ArtistArtworks";
import { ArtistStatistics } from "./ArtistStatistics";

interface AristDetailsTabBarProps {
    readonly artist: ArtistDetails;
    readonly availableArtworks: Artwork[];
    readonly soldArtworks: Artwork[];
}

export class AristDetailsTabBar extends React.PureComponent<AristDetailsTabBarProps & Nav.NavigationInjectedProps> {
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
            [l("ArtistDetails.Available")]: () => <ArtistArtworks navigation={this.props.navigation} artworks={this.props.availableArtworks} />,
            [l("ArtistDetails.Sold")]: () => <ArtistArtworks navigation={this.props.navigation} artworks={this.props.soldArtworks} />,
        };

        if (this.props.soldArtworks.length > 1) {
            pages[l("ArtistDetails.Statistics")] = () => <ArtistStatistics navigation={this.props.navigation} artworks={this.props.soldArtworks} />
        }

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
