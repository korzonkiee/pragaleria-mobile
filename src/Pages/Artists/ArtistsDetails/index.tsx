import React, { Component } from 'react'
import * as Nav from "react-navigation";
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground, ActivityIndicator } from 'react-native'
import AppContainer from '../../../Components/AppContainer';
import styles from "./styles";
import { ArtistDetailsData } from '../../../Modules/Async/AsyncStat';
import { Artwork } from '../../../Models/ArtistDetails';
import { ArtworkItem } from '../../../Components/ArtworkItem';
import DataNotFound from '../../../Components/DataNotFound';
import { l } from '../../../Services/Language';
import CenteredActivityIndicator from '../../../Components/CenteredActivityIndicator';


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
        console.log(this.props.artist);
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
                        <Text style={styles.artistName}>{artist.name}</Text>
                        <FlatList
                            data={artist.artworks}
                            keyExtractor={(item, _) => item.id.toString()}
                            renderItem={this.renderArtwork} />
                    </View> }
                </AppContainer>
            )
        }
    }

    private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => (
        <ArtworkItem
            artwork={item} />
    )
}
