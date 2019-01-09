import React from "react";
import { FlatList, ImageBackground, Linking, TouchableOpacity, View } from 'react-native';
import Checkbox from 'react-native-modest-checkbox';
import Icon from "react-native-vector-icons/Entypo";
import * as Nav from "react-navigation";
import { Black } from '../../Resources/Colors';
import * as Routes from "../../Routes";
import { l } from "../../Services/Language";
import { responsiveFontSize, responsiveHeight } from '../../Styles/Dimensions';
import AppText from "../AppText";
import { CarouselWrapper } from "./CarouselWrapper";
import styles from "./styles";


export interface SwitchGridCarouselProps {
    readonly auction: Auction;
    readonly catalogItems: CatalogItem[];
}

interface SwitchGridCarouselState {
    readonly currentView: ViewType;
    readonly isChecked: boolean;
    readonly catalogItemsFiltered: CatalogItem[];
}

type ViewType = 'grid' | 'slides'

export class SwitchGridCarousel extends React.PureComponent<SwitchGridCarouselProps & Nav.NavigationInjectedProps, SwitchGridCarouselState> {
    constructor(props: SwitchGridCarouselProps & Nav.NavigationInjectedProps) {
        super(props);

        const catalogItemsFiltered = this.props.catalogItems.filter(
            (catalogItem: CatalogItem) => catalogItem.sold === false
        );
        this.state = {
            currentView: 'grid',
            isChecked: false,
            catalogItemsFiltered: catalogItemsFiltered
        };
    }

    private displayAllArtworks() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    private catalogDataFiltered(): CatalogItem[] {
        if (!this.state.isChecked) {
            return this.state.catalogItemsFiltered;
        } else {
            return this.props.catalogItems;
        }
    }

    render() {
        const { auction } = this.props;
        const { currentView } = this.state;
        const catalogDataFiltered = this.catalogDataFiltered();

        return (
            <View style={{ flex: 1 }}>
                {auction &&
                    <View style={styles.topContainer}>
                        <Checkbox
                            checked={this.state.isChecked}
                            containerStyle={styles.checkboxStyle}
                            labelStyle={styles.checkboxLabelStyle}
                            label={l("Auctions.ShowSold")}
                            onChange={this.displayAllArtworks.bind(this)}
                        />
                        {this.renderTopContainerIcon(this.state.currentView === 'grid')}
                    </View>
                }
                {auction && auction.urls &&
                    <View style={styles.topLinksContainer}>
                        {auction.is_current && auction.urls.bidding &&
                            <TouchableOpacity
                                style={styles.topLinksTouchable}
                                onPress={() => { Linking.openURL(auction.urls.bidding) }}>
                                <AppText style={styles.topLinksContainerText} numberOfLines={1}>
                                    {l("Auctions.OnlineBid")}
                                </AppText>
                            </TouchableOpacity>
                        }
                        {auction.urls.virtual_tour &&
                            <TouchableOpacity
                                style={styles.topLinksTouchable}
                                onPress={() => { Linking.openURL(auction.urls.virtual_tour) }}>
                                <AppText style={styles.topLinksContainerText} numberOfLines={1}>
                                    {l("Auctions.VirtualWalk")}
                                </AppText>
                            </TouchableOpacity>
                        }
                    </View>
                }
                {catalogDataFiltered.length === 0 ?
                    <View style={{ flex: 1 }}>
                        <AppText style={styles.topLinksContainerText}>
                            Brak dzieł poaukcyjnych, kliknij "Wyświetl sprzedane" aby przeglądać dzieła które pojawiły się na tej aukcji.
                        </AppText>
                    </View>
                    : <View style={{ flex: 1 }}>
                        {currentView === 'slides' ?
                            <CarouselWrapper
                                auction={this.props.auction}
                                catalogItems={catalogDataFiltered}
                                navigation={this.props.navigation} />
                            : <FlatList
                                data={catalogDataFiltered}
                                keyExtractor={(item, _) => item.id.toString()}
                                numColumns={2}
                                renderItem={this.renderGridItem} />}
                    </View>
                }
            </View>
        )
    }

    private renderTopContainerIcon = (isGrid: boolean) => (
        <TouchableOpacity style={styles.topContainerIcon}
            onPress={isGrid ? this.setSlidesView : this.setGridView}>
            <Icon
                name={isGrid ? "documents" : "grid"}
                size={responsiveFontSize(3.3)}
                color={Black} />
        </TouchableOpacity>)

    private setGridView = () => {
        this.setState({ currentView: 'grid' })
    }

    private setSlidesView = () => {
        this.setState({ currentView: 'slides' })
    }

    private renderGridItem = (
        { item, index }: { item: CatalogItem, index: number }
    ) => <View key={item.id} style={styles.gridItem}>
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
                            <AppText style={styles.imageTopLabel}>{index + 1}.</AppText>
                            {item.sold === true ? <AppText style={styles.imageTopLabel}>sprzedane</AppText> : <></>}
                        </View>
                    </ImageBackground>
                    <View style={styles.imageSubtitle}>
                        {this.renderTitleBox(l("Auctions.GridItem.Title"), item.title)}
                        {this.renderTitleBox(l("Auctions.GridItem.Author"), item.author)}
                        {item.sold ? this.renderTitleBox(l("Auctions.CarouselItem.SoldPrice"), `${item.sold_price} PLN`) :
                            this.props.auction.is_current ? item.initial_price &&
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
        </View>

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
