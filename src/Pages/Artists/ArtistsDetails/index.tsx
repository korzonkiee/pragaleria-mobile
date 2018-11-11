import React, { Component } from 'react'
import * as Nav from "react-navigation";
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground, ActivityIndicator, WebView } from 'react-native'
import AppContainer from '../../../Components/AppContainer';
import styles from "./styles";
import { ArtworkItem } from '../../../Components/ArtworkItem';
import DataNotFound from '../../../Components/DataNotFound';
import { l } from '../../../Services/Language';
import CenteredActivityIndicator from '../../../Components/CenteredActivityIndicator';
import Carousel from 'react-native-snap-carousel';
import { artists } from '../../../Routes';
import AppHeader from '../../../Components/AppHeader';


export interface ArtistsDetailsProps {
    readonly artist: ArtistDetailsData;
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
        if (!this.props.artist) {
            return null;
        }

        if (this.props.artist.loading) {
            return (
                <CenteredActivityIndicator />
            );
        }
        else if (!this.props.artist.loading && this.props.artist.data == null) {
            return (<DataNotFound retry={this.props.getArtistDetails} message={l("Common.GenericErrorMessageWithRetry")}/>)
        }
        else {
            return (
                <AppContainer>
                    { artist && <View>
                    <AppHeader
                        title={artist.name}
                        withBackground />
                    <FlatList
                        data={artist.artworks}
                        keyExtractor={(item, _) => item.id.toString()}
                        renderItem={this.renderArtwork}
                        numColumns={1} />
                    </View> }
                </AppContainer>
            )
        }
    }

    private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => {
        return (<ArtworkItem
            artwork={item} />)
        }

}
