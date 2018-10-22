import React, { Component } from 'react'
import * as Nav from "react-navigation";
import * as Routes from '../../Routes';
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import { Artist } from "../../Models/Artist";
import { ArtistsData } from '../../Modules/Async/AsyncStat';
import { ArtistItem } from '../../Components/ArtistItem';


export interface ArtistsProps {
    artists: ArtistsData
    getArtists: () => void
    loadMoreArtists: () => void
}

export class Artists extends Component<ArtistsProps & Nav.NavigationInjectedProps> {
    componentDidMount() {
        if (!this.props.artists.loading) {
            this.props.getArtists();
        }
    }

    render() {
        return (
            <AppContainer>
                <FlatList
                    data={this.props.artists}
                    keyExtractor={(item, _) => item.id.toString()}
                    renderItem={this.renderArtist}
                    numColumns={2}
                />
            </AppContainer>
        )
    }

    private renderArtist = ({ item, index }: { item: Artist, index: number }) =>
        <ArtistItem
            artist={item}
            onPress={() => this.navigateToArtist(item.id.toString())} />

    private navigateToArtist = (artistId: string) => {
        this.props.navigation.navigate(Routes.artistDetails, {
            id: artistId
        });
    }
}
