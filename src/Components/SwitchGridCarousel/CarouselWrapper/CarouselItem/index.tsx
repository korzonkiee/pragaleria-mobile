import React from "react";
import { Image, ImageBackground, TouchableNativeFeedback, View } from 'react-native';
import FadeIn from "react-native-fade-in-image";
import * as Nav from "react-navigation";
import getSmallestImageSize from '../../../../Helpers/ImageHelpers';
import * as Routes from "../../../../Routes";
import AppText from "../../../AppText";
import styles from "./styles";

export interface CarouselItemProps {
    readonly catalogItem: CatalogItem;
    readonly itemIndex: number;
}

export class CarouselItem extends React.PureComponent<CarouselItemProps & Nav.NavigationInjectedProps> {
    render() {
        const { catalogItem } = this.props;
        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.props.navigation.navigate(Routes.ArtworkDetails, {
                        artwork: catalogItem
                    });
                }}>
                <View style={{ flex: 1, marginVertical: 10 }}>
                    <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(
                        <Image style={{ flex: 1 }} source={{ uri: catalogItem.image_thumbnail }} blurRadius={2} />
                    )}>
                        <ImageBackground style={styles.artworkFullImage} source={{ uri: getSmallestImageSize(catalogItem) }} resizeMode="contain">
                            <View style={{ flexDirection: "row" }}>
                                <AppText style={styles.imageTopLabel}>{this.props.itemIndex + 1}.</AppText>
                                {catalogItem.sold === true ? <AppText style={styles.imageTopLabel}>sprzedane</AppText>
                                    : <></>}
                            </View>
                        </ImageBackground>
                    </FadeIn>
                    <View style={styles.imageSubtitle}>
                        {this.renderTitleBox('Tytuł:', catalogItem.title)}
                        {this.renderTitleBox('Autor:', catalogItem.author)}
                        {catalogItem.after_auction_price ?
                            this.renderTitleBox('Cena poaukcyjna:', catalogItem.after_auction_price) :
                            catalogItem.sold === true && catalogItem.sold_price ?
                                this.renderTitleBox('Cena sprzedaży:', catalogItem.sold_price) :
                                this.renderTitleBox('Cena wywoławcza:', `${catalogItem.initial_price} PLN`)}
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
