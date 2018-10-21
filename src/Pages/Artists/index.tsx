import React, {Component} from 'react'
import {FlatList, Image, Text, StyleSheet, TouchableWithoutFeedback, View, ImageBackground } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import styles from "./styles";
import { Artist } from "../../Models/Artist";


export interface ArtistsProps {
    artists: Artist[]
    getArtists: () => void
}

export class Artists extends Component<ArtistsProps> {
    componentDidMount() {
        this.props.getArtists();
    }



    render() {
        return (
            <AppContainer>
                <FlatList
                    data={this.props.artists}
                    renderItem={({item}) =>
                    <TouchableWithoutFeedback
                        onPress={() => console.log("pressed")}
                        style={styles.artistContainer}>
                        <View style={styles.artistContainer}>
                            <ImageBackground
                                source={{uri: item.thumbnail}}>
                                <Text style={styles.artistName}>{item.name}</Text>
                            </ImageBackground>
                        </View>
                    </TouchableWithoutFeedback>}
                    numColumns={2}
                />
            </AppContainer>
        )
    }
}
