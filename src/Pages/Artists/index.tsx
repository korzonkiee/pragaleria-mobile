import React, {Component} from 'react'
import {FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import styles from "./styles";
import { Artist } from "../../Models/Artist";
import { ArtistsData } from '../../Modules/Async/AsyncStat';


export interface ArtistsProps {
    artists: ArtistsData
    getArtists: () => void
    loadMoreArtists: () => void
}

export class Artists extends Component<ArtistsProps> {
    componentDidMount() {
        if (!this.props.artists.loading) {
            this.props.getArtists();
        }
    }



    render() {
        return (
            <AppContainer>
                <FlatList
                    data={this.props.artists.data}
                    renderItem={({item}) =>
                    <TouchableWithoutFeedback
                        onPress={() => console.log("pressed")}
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
}
