import React from "react";
import { Image, ImageBackground, TouchableNativeFeedback, View } from 'react-native';
import FadeIn from "react-native-fade-in-image";
import * as Nav from "react-navigation";
import getSmallestImageSize from '../../../../Helpers/ImageHelpers';
import * as Routes from "../../../../Routes";
import { l } from "../../../../Services/Language";
import AppText from "../../../AppText";
import styles from "./styles";

export interface CarouselItemProps {
    readonly isAuctionActive: boolean;
    readonly catalogItem: CatalogItem;
    readonly itemIndex: number;
}

export class CarouselItem extends React.PureComponent<CarouselItemProps & Nav.NavigationInjectedProps> {
    render() {
        const { catalogItem: item } = this.props;
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.props.navigation.navigate(Routes.ArtworkDetails, {
                        artwork: item
                    });
                }}>
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(
                        <Image style={{ flex: 1 }} source={{ uri: item.image_thumbnail }} blurRadius={2} />
                    )}>
                        <ImageBackground style={styles.artworkFullImage} source={{ uri: getSmallestImageSize(item) }} resizeMode="contain">
                            <View style={{ flexDirection: "row" }}>
                                <AppText style={styles.imageTopLabel}>{this.props.itemIndex + 1}.</AppText>
                                {item.sold === true ? <AppText style={styles.imageTopLabel}>sprzedane</AppText>
                                    : <></>}
                            </View>
                        </ImageBackground>
                    </FadeIn>
                    <View style={styles.imageSubtitle}>
                        {this.renderTitleBox(l("Auctions.CarouselItem.Title"), item.title)}
                        {this.renderTitleBox(l("Auctions.CarouselItem.Author"), item.author)}
                        {item.sold ? this.renderTitleBox(l("Auctions.CarouselItem.SoldPrice"), item.sold_price) :
                            this.props.isAuctionActive ? item.initial_price && this.renderTitleBox(l("Auctions.CarouselItem.InitialPrice"), `${item.initial_price} PLN`) :
                                this.renderTitleBox(l("Auctions.CarouselItem.AfterAuctionPrice"), item.after_auction_price || item.initial_price)}
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    private renderTitleBox = (textLeft: any, textRight: any) => {
        return <View style={styles.itemTitleBox}>
            <AppText style={styles.itemTitleTextLeft}>
                {textLeft}
            </AppText>
            <AppText style={styles.itemTitleTextRight} numberOfLines={1}>
                {textRight}
            </AppText>
        </View>
    }
}
