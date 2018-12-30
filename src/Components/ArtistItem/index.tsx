import React from "react";
import { ImageBackground, TouchableWithoutFeedback, View } from "react-native";
import AppText from "../AppText";
import styles from "./styles";

export interface ArtistItemProps {
    readonly index: number;
    readonly artist: Artist;
    readonly onPress?: () => void;
}

export class ArtistItem extends React.PureComponent<ArtistItemProps> {
    private getArtistLastName = () => {
        let nameSplit;
        let artistName = this.props.artist.name;
        if (artistName.includes('-')) {
            nameSplit = artistName.split('-');
        } else {
            nameSplit = artistName.split(' ');
        }
        return nameSplit[nameSplit.length - 1].replace("/", "");
    }
    render() {
        return <TouchableWithoutFeedback
            onPress={this.props.onPress}
            style={styles.artistContainer}>
            <View style={[styles.artistContainer, (this.props.index % 3) === 1 ? { marginLeft: 2, marginRight: 2 } : {}]}>
                <ImageBackground
                    source={{
                        uri: this.props.artist.image_medium_thumbnail || this.props.artist.image_thumbnail
                    }}
                    style={styles.artistImage}>
                    <View
                        style={styles.artistNameBackground}>
                        <AppText style={styles.artistName} numberOfLines={1}>
                            {`${this.props.artist.name[0]}. ${this.getArtistLastName()}`}
                        </AppText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    }
}
