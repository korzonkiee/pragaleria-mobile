import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import AppText from "../../../AppText";
import styles from "./styles";

export interface AuctionItemProps {
    readonly auction: Auction;
    readonly onPress?: () => void;
}

export class AuctionItem extends React.PureComponent<AuctionItemProps> {
    render() {
        if (this.props.auction.image_thumbnail) {
            return <TouchableWithoutFeedback style={{ flexDirection: 'column', flex: 1 }}
                onPress={this.props.onPress}>
                <View style={styles.artworkContainer}>
                    <Image style={{ flex: 1, alignSelf: 'stretch' }} source={{
                        uri: this.props.auction.image_medium_thumbnail || this.props.auction.image_thumbnail
                    }} />
                    <View style={styles.artworkDescContainer}>
                        <AppText style={styles.artworkTitle}>{this.props.auction.title}</AppText>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        } else {
            return null;
        }
    }
}
