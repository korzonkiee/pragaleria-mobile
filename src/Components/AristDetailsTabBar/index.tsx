import React from "react";
import * as Nav from "react-navigation";
import { createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import { Black, White } from "../../Resources/Colors";
import { l } from "../../Services/Language";
import font from "../../Styles/Fonts";
import { ArtistArtworks } from "./ArtistArtworks";
import { ArtistAuctions } from './ArtistAuctions/index';
import { ArtistStatistics } from "./ArtistStatistics";

interface AristDetailsTabBarProps {
    readonly artist: ArtistDetails;
    readonly availableArtworks: Artwork[];
    readonly soldArtworks: Artwork[];
    readonly statisticsArtworks: Artwork[];
    readonly fetauredCatalogs: Auction[];
}

export class AristDetailsTabBar extends React.PureComponent<AristDetailsTabBarProps & Nav.NavigationInjectedProps> {
    render() {
        const tabBarStyle = {
            backBehavior: 'none',
            optimizationsEnabled: true,
            scrollEnabled: true,
            tabBarOptions: {
                scrollEnabled: true,
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
            [l("ArtistDetails.Available")]: () => <ArtistArtworks
                artist={this.props.artist}
                navigation={this.props.navigation}
                artworks={this.props.availableArtworks} />,
            [l("ArtistDetails.Sold")]: () => <ArtistArtworks
                artist={this.props.artist}
                navigation={this.props.navigation}
                artworks={this.props.soldArtworks} />,
        };

        if (this.props.statisticsArtworks.length > 1) {
            pages[l("ArtistDetails.Statistics")] = () => <ArtistStatistics navigation={this.props.navigation} artworks={this.props.statisticsArtworks} />
        }

        if (this.props.fetauredCatalogs.length > 1) {
            pages[l("ArtistDetails.Auctions")] = () => <ArtistAuctions navigation={this.props.navigation} auctions={this.props.fetauredCatalogs} />;
        }

        const Tab = createAppContainer(createMaterialTopTabNavigator(pages, tabBarStyle));
        return <Tab />
    }
}
