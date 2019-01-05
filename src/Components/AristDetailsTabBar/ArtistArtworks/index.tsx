import React from "react";
import { FlatList, View } from "react-native";
import * as Nav from "react-navigation";
import { DirtyWhite, LightBlack } from "../../../Resources/Colors";
import * as Routes from "../../../Routes";
import { l } from "../../../Services/Language";
import AppText from "../../AppText";
import { ArtworkItem } from "./ArtworkItem";

export interface ArtistArtworksProps {
    readonly artworks: Array<Artwork>;
    readonly artist: Artist;
}

export class ArtistArtworks extends React.PureComponent<ArtistArtworksProps & Nav.NavigationInjectedProps> {
    render() {
        return this.renderArtworks(this.props.artworks);
    }

    private renderArtworks = (artworks: Array<Artwork>) => {
        let viewContent;
        if (artworks.length > 0) {
            viewContent = (<FlatList
                style={{ backgroundColor: DirtyWhite }}
                data={artworks}
                keyExtractor={(item, _) => item.id.toString()}
                renderItem={this.renderArtwork}
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

    private renderArtwork = ({ item, index }: { item: Artwork, index: number }) => {
        return (<ArtworkItem
            onPress={() => this.navigateToArtwork(item)}
            artwork={item} />)
    }

    private navigateToArtwork = (artwork: Artwork) => {
        console.log(`Navigating to artwork ${artwork.id}`);

        this.props.navigation.navigate(Routes.ArtworkDetails, {
            artwork: artwork,
            artist: this.props.artist
        });
    }
}
