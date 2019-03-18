import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import * as Nav from "react-navigation";
import * as Routes from "../../../Routes";
import { l } from "../../../Services/Language";
import { responsiveHeight } from "../../../Styles/Dimensions";
import AppText from "../../AppText";
import styles from "./styles";

interface AuctionGridItemProps {
    isAuctionCurrent: boolean;
    item: CatalogItem;
    index: number;
}

export class AuctionGridItem extends React.PureComponent<AuctionGridItemProps & Nav.NavigationInjectedProps> {
    render() {
        const item = this.props.item;
        return (
            <View key={item.id} style={styles.gridItem}>
                <TouchableOpacity style={{ flexDirection: 'column', flex: 1 }} onPress={() => {
                    this.props.navigation.push(Routes.ArtworkDetails, {
                        artwork: item,
                        artistId: item.author_id
                    });
                }}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1, height: responsiveHeight(25) }} source={{
                            uri: item.image_medium_thumbnail || item.image_thumbnail
                        }}>
                            <View style={{ flexDirection: "row" }}>
                                <AppText style={styles.imageTopLabel}>{this.props.index + 1}.</AppText>
                                {item.sold === true ? <AppText style={styles.imageTopLabel}>sprzedane</AppText> : <></>}
                            </View>
                        </ImageBackground>
                        <View style={styles.imageSubtitle}>
                            {this.renderTitleBox(l("Auctions.GridItem.Title"), item.title)}
                            {this.renderTitleBox(l("Auctions.GridItem.Author"), item.author)}
                            {item.sold ? this.renderTitleBox(l("Auctions.CarouselItem.SoldPrice"), `${item.sold_price} PLN`) :
                                this.props.isAuctionCurrent ? item.initial_price &&
                                    this.renderTitleBox(
                                        l("Auctions.CarouselItem.InitialPrice"),
                                        `${item.initial_price} PLN`
                                    ) : (item.after_auction_price || item.initial_price) ?
                                        this.renderTitleBox(
                                            l("Auctions.CarouselItem.AfterAuctionPrice"),
                                            `${item.after_auction_price || item.initial_price} PLN`
                                        ) : <></>}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>);
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
