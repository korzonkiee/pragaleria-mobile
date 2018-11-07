import React, { Component } from 'react'
import * as Nav from "react-navigation";
import * as Routes from '../../Routes';
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground, ActivityIndicator } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import { Artist } from "../../Models/Artist";
import { ArtistItem } from '../../Components/ArtistItem';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import { ArtistsData } from '../../Modules/Async/AsyncStat';
import DataNotFound from '../../Components/DataNotFound';
import { l } from '../../Services/Language';


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
        const artistsData = this.props.artists.data;
        if (this.props.artists.loading && this.props.artists.page === 0) {
            return (
                <CenteredActivityIndicator />
            );
        }
        else if (!this.props.artists.loading && this.props.artists.data.length === 0) {
            return (<DataNotFound
                    message={l("Common.GenericErrorMessageWithRetry")}
                    retry={this.props.getArtists}/>)
        }
        else {
            return (
                <AppContainer>
                    <FlatList
                        data={artistsData}
                        keyExtractor={(item, _) => item.id.toString()}
                        renderItem={this.renderArtist}
                        numColumns={2}
                        ListFooterComponent={this.renderFooter()}
                        onEndReached={this.props.getArtists}
                        onEndReachedThreshold={5}
                    />
                </AppContainer>
            )
        }
    }

    private renderArtist = ({ item, index: number }: { item: Artist, index: number }) =>
        <ArtistItem
            artist={item}
            onPress={() => this.navigateToArtist(item.id.toString())} />



    private renderFooter = () => {
        if (this.props.artists.loading)
            return <FooterActivityIndicator />;
        return null;
    }

    private navigateToArtist = (artistId: string) => {
        this.props.navigation.navigate(Routes.artistDetails, {
            id: artistId
        });
    }
}
