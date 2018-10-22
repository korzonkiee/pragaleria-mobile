import React from "react";
import { Text, TouchableWithoutFeedback, View, ImageBackground } from "react-native";
import styles from "./styles";
import { Artwork } from "../../Models/ArtistDetails";

export interface ArtworkItemProps {
    readonly artwork: Artwork;
    readonly onPress?: () => void;
}

export class ArtworkItem extends React.PureComponent<ArtworkItemProps> {
    render() {
        return <TouchableWithoutFeedback
            onPress={this.props.onPress}
            style={styles.artworkContainer}>
            <View style={styles.artworkContainer}>
                <ImageBackground
                    source={{uri: this.props.artwork.thumbnail}}
                    style={styles.artworkImage}>
                    <View
                        style={styles.artworkNameBackground}>
                        <Text style={styles.artworkName}>{this.props.artwork.title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    }
}
