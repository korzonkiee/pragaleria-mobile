import React from "react";
import { Image, FlatList, View } from "react-native";
import { DirtyWhite, LightBlack, Black } from "../../Resources/Colors";
import AppText from "../AppText";
import { ArtworkItem } from "../ArtworkItem";
import * as Nav from "react-navigation";
import * as Routes from "../../Routes";
import { l } from "../../Services/Language";
import FadeIn from "react-native-fade-in-image";
import styles from "./styles";
import { responsiveFontSize } from "../../Styles/Dimensions";
import ViewMoreText from "react-native-view-more-text";
import font, { DefaultFontFamily } from "../../Styles/Fonts";

export interface AuctionsListProps {
    readonly artworks: Auction[];
}

export class AuctionsList extends React.PureComponent<AuctionsListProps & Nav.NavigationInjectedProps> {
    render() {
        return this.renderAuctions(this.props.artworks);
    }

    private renderAuctions = (auctionsData: Auction[]) => {
        return <FlatList
            data={auctionsData}
            keyExtractor={(item, _) => item.id.toString()}
            renderItem={this.renderAuction}
            numColumns={1}
        />
    };

    private renderAuction = ({ item, index }: { item: Auction, index: number }) => {
        return <View style={{
            marginBottom: 30,
        }}>
            <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(<Image style={{ flex: 1 }} source={{ uri: item.image_thumbnail }} blurRadius={2} />)}>
                <Image style={styles.artworkFullImage} source={{
                    uri: item.image_big_thumbnail || item.image_medium || item.image_large || item.image_original
                }} />
            </FadeIn>
            <View style={{
                padding: 8
            }}>
                <AppText style={{
                    fontSize: responsiveFontSize(2.3),
                    color: Black,
                    ...font({ weight: "Bold" })
                }}>
                    {item.title}
                </AppText>
                <ViewMoreText numberOfLines={5} renderViewMore={() => { }}>
                    <AppText style={{
                        color: LightBlack
                    }} >
                        {item.description_content || item.description_excerpt}
                    </AppText>
                </ViewMoreText>
            </View>
        </View>
    }
}
