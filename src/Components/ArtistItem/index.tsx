import React from "react";
import { Text, TouchableWithoutFeedback, View, ImageBackground } from "react-native";
import styles from "./styles";
import AppText from "../AppText";

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
                    source={{uri: this.props.artist.image_thumbnail}}
                    style={styles.artistImage}>
                    <View
                        style={styles.artistNameBackground}>
                        <AppText style={styles.artistName}>{this.props.artist.name}</AppText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    }
}
