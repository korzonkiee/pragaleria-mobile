import React from "react";
import { FlatList, View } from 'react-native';
import * as Nav from "react-navigation";
import { DirtyWhite, LightBlack } from "../../../Resources/Colors";
import * as Routes from "../../../Routes";
import { l } from "../../../Services/Language";
import AppText from "../../AppText";
import { AuctionItem } from './AuctionItem/index';

export interface ArtistAuctionsProps {
    readonly auctions: Array<Auction>;
}

export class ArtistAuctions extends React.PureComponent<ArtistAuctionsProps & Nav.NavigationInjectedProps> {
    render() {
        return this.renderArtworks(this.props.auctions);
    }

    private renderArtworks = (auctions: Array<Auction>) => {
        let viewContent;
        if (auctions.length > 0) {
            viewContent = (<FlatList
                style={{ backgroundColor: DirtyWhite }}
                data={auctions}
                keyExtractor={(item, _) => item.id.toString()}
                renderItem={this.renderAuction}
                numColumns={1} />);
        } else {
            viewContent = <AppText style={{
                marginLeft: 16,
                marginTop: 16,
                color: LightBlack
            }}>
                {l("ArtistDetails.NoArtworksAvailable")}
            </AppText>
        }

        return (
            <View style={{
                backgroundColor: DirtyWhite,
                height: "100%"
            }}>
                {viewContent}
            </View>
        );
    };

    private renderAuction = ({ item, index }: { item: Auction, index: number }) => {
        return (<AuctionItem
            onPress={() => this.navigateToAuction(item)}
            auction={item} />)
    }

    private navigateToAuction = (auction: Auction) => {
        console.log(`Navigating to auction ${auction.id}`);

        this.props.navigation.push(Routes.AuctionDetails, {
            auction: auction
        });
    }
}
