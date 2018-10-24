import React from "react";
import { Artist } from "../../Models/Artist";
import { Text, TouchableWithoutFeedback, View, ImageBackground } from "react-native";
import styles from "./styles";

export interface ArtistItemProps {
    readonly artist: Artist;
    readonly onPress?: () => void;
}

export class ArtistItem extends React.PureComponent<ArtistItemProps> {
    render() {
        return <TouchableWithoutFeedback
            onPress={this.props.onPress}
            style={styles.artistContainer}>
            <View style={styles.artistContainer}>
                <ImageBackground
                    source={{uri: this.props.artist.thumbnail}}
                    style={styles.artistImage}>
                    <View
                        style={styles.artistNameBackground}>
                        <Text style={styles.artistName}>{this.props.artist.name}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    }
}
