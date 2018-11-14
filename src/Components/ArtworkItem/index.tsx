import React from "react";
import { Text, Image, View, ImageBackground, WebView, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import AppText from "../AppText";
import { l } from "../../Services/Language";

export interface ArtworkItemProps {
    readonly artwork: Artwork;
    readonly onPress?: () => void;
}

export class ArtworkItem extends React.PureComponent<ArtworkItemProps> {
    render() {
        if (this.props.artwork.image_thumbnail) {
            return <TouchableWithoutFeedback style={{flexDirection: 'column', flex: 1}}
                onPress={this.props.onPress}>
                    <View style={styles.artworkContainer}>
                        <Image style={{flex: 1, alignSelf: 'stretch'}} source={{uri: this.props.artwork.image_thumbnail}} />
                        <View style={styles.artworkDescContainer}>
                            <AppText style={styles.artworkTitle}>{this.props.artwork.title}</AppText>
                            {this.props.artwork.year.length > 0 && <AppText>{l("Artwork.Year")}: {this.props.artwork.year}</AppText> }
                            {this.props.artwork.sold && <AppText>{l("Artwork.Price")}: {this.props.artwork.sold_price}</AppText> }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        } else {
            return null;
        }
    }
}
