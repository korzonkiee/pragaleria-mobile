import React, { Component } from 'react'
import * as Nav from "react-navigation";
import * as Routes from '../../Routes';
import { FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import styles from "./styles";
import { Artist } from "../../Models/Artist";


export interface ArtistsProps {
    artists: Artist[]
    getArtists: () => void
}

export class Artists extends Component<ArtistsProps & Nav.NavigationInjectedProps> {
    componentDidMount() {
        this.props.getArtists();
    }

    render() {
        return (
            <AppContainer>
                <FlatList
                    data={this.props.artists}
                    keyExtractor={(item, _) => item.id.toString()}
                    renderItem={({item}) =>
                    <TouchableWithoutFeedback
                        onPress={() => this.navigateToArtist(item.id.toString())}
                        style={styles.artistContainer}>
                        <View style={styles.artistContainer}>
                            <ImageBackground
                                source={{uri: item.thumbnail}}
                                style={styles.artistImage}>
                                <View
                                    style={styles.artistNameBackground}>
                                    <Text style={styles.artistName}>{item.name}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>}
                    numColumns={2}
                />
            </AppContainer>
        )
    }

    private navigateToArtist = (artistId: string) => {
        this.props.navigation.navigate(Routes.artistDetails, {
            id: artistId
        });
    }
}
