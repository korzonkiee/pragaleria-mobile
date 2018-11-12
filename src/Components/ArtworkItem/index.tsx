import React from "react";
import { Text, Image, View, ImageBackground, WebView } from "react-native";
import styles from "./styles";
import AppText from "../AppText";
import { responsiveHeight, responsiveFontSize } from "../../Styles/Dimensions";
import { l } from "../../Services/Language";

export interface ArtworkItemProps {
    readonly artwork: Artwork;
    readonly onPress?: () => void;
}

export class ArtworkItem extends React.PureComponent<ArtworkItemProps> {
    render() {
        if (this.props.artwork.image_thumbnail) {
            return <View style={{flexDirection: 'column', flex: 1}}>
                    <View style={styles.artworkContainer}>
                        <Image style={{flex: 1, alignSelf: 'stretch'}} source={{uri: this.props.artwork.image_thumbnail}} />
                        <View style={styles.artworkDescContainer}>
                            <AppText style={styles.artworkTitle}>{this.props.artwork.title}</AppText>
                            {this.props.artwork.year && <AppText>{l("Artwork.Year")}: {this.props.artwork.year}</AppText> }
                            {this.props.artwork.price && <AppText>{l("Artwork.Price")}: {this.props.artwork.price}</AppText> }
                        </View>
                    </View>
                </View>
        } else {
            return null;
        }
    }
}
