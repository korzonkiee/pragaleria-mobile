import React, {Component} from 'react'
import {FlatList, Image, StyleSheet } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import { Artist } from "../../Models/Artist";


export interface ArtistsProps {
    artists: Artist[]
    getArtists: () => void
}

const styles = StyleSheet.create({
    stretch: {
      flex: 1,
      height: 200
    }
  });

export class Artists extends Component<ArtistsProps> {
    componentDidMount() {
        this.props.getArtists();
    }



    render() {
        return (
            <AppContainer>
                <FlatList
                    data={this.props.artists}
                    renderItem={({item}) => <Image
                        source={{uri: item.thumbnail}}
                        style={styles.stretch} />}
                    numColumns={2}
                />
            </AppContainer>
        )
    }
}
