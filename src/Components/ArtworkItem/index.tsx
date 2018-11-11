import React from "react";
import { Text, Image, View, ImageBackground } from "react-native";
import styles from "./styles";
import AppText from "../AppText";

export interface ArtworkItemProps {
    readonly artwork: Artwork;
    readonly onPress?: () => void;
}

export class ArtworkItem extends React.PureComponent<ArtworkItemProps> {
    render() {
        if (this.props.artwork.thumbnail && this.props.artwork.thumbnail.original) {
            return <View style={styles.artworkContainer}>
                <Image style={{flex: 1, height: 150}} source={{uri: this.props.artwork.thumbnail.original}} />
                <AppText>{this.props.artwork.title}</AppText>
                <AppText>{this.props.artwork.description}</AppText>
            </View>
        } else {
            return null;
        }
    }
}
