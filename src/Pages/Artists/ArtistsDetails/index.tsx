import React, { Component } from 'react'
import * as Nav from "react-navigation";
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import AppContainer from '../../../Components/AppContainer';
import styles from "./styles";
import { ArtistDetailsData } from '../../../Modules/Async/AsyncStat';
import { ArtistItem } from '../../../Components/ArtistItem';
import { Artwork } from '../../../Models/ArtistDetails';
import { ArtworkItem } from '../../../Components/ArtworkItem';


export interface ArtistsDetailsProps {
    readonly artist: ArtistDetailsData | undefined;
    readonly getArtistDetails: () => void;
}

export class ArtistDetails extends Component<ArtistsDetailsProps> {
    componentDidMount() {
        if (!this.props.artist || (this.props.artist.data === undefined && !this.props.artist.loading)) {
            this.props.getArtistDetails();
        }
    }

    render() {
        const artist = this.props.artist && this.props.artist.data;
        return (
            <AppContainer>
                { artist && <View>
                    <Text style={styles.artistName}>{artist.name}</Text>
                    <FlatList
                        data={artist.artworks}
                        keyExtractor={(item, _) => item.id.toString()}
                        renderItem={this.renderArtwork}
                        numColumns={2} />
                </View> }
            </AppContainer>
        )
    }

    private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => (
        <ArtworkItem
            artwork={item} />
    )
}
