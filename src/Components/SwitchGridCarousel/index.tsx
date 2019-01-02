import React from "react";
import { FlatList, ImageBackground, Linking, TouchableOpacity, View } from 'react-native';
import Checkbox from 'react-native-modest-checkbox';
import Icon from "react-native-vector-icons/Entypo";
import * as Nav from "react-navigation";
import { Black, LightGray } from '../../Resources/Colors';
import * as Routes from "../../Routes";
import { responsiveFontSize, responsiveHeight } from '../../Styles/Dimensions';
import AppText from "../AppText";
import { CarouselWrapper } from "./CarouselWrapper";
import styles from "./styles";


export interface SwitchGridCarouselProps {
    readonly auction: Auction;
    readonly catalogItems: CatalogItem[];
}

interface SwitchGridCarouselState {
    readonly currentView: string;
    readonly isChecked: boolean;
    readonly catalogItemsFiltered: CatalogItem[];
}

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
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.topContainer}>
                    <Checkbox
                        checked={this.state.isChecked}
                        containerStyle={styles.checkboxStyle}
                        labelStyle={styles.checkboxLabelStyle}
                        label='Wyświetl sprzedane'
                        onChange={this.displayAllArtworks.bind(this)}
                    />
                    {this.renderTopContainerIcon("documents", this.setSlidesView, (currentView === 'slides'))}
                    {this.renderTopContainerIcon("grid", this.setGridView, (currentView === 'grid'))}
                </View>
                <View style={styles.topLinksContainer}>
                    <TouchableOpacity
                        style={styles.topLinksTouchable}
                        onPress={() => {
                            auction && auction.urls && auction.urls.bidding && Linking.openURL(auction.urls.bidding);
                        }}>
                        <AppText style={styles.topLinksContainerTextLeft} numberOfLines={1}>
                            LICYTUJ ON-LINE
                        </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.topLinksTouchable}
                        onPress={() => {
                            auction && auction.urls && auction.urls.virtual_tour && Linking.openURL(auction.urls.virtual_tour);
                        }}>
                        <AppText style={styles.topLinksContainerText} numberOfLines={1}>
                            SPACER 3D
                        </AppText>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {currentView === 'slides' ?
                        <CarouselWrapper
                            catalogItems={this.catalogDataFiltered()}
                            navigation={this.props.navigation} />
                        : <FlatList
                            data={this.catalogDataFiltered()}
                            keyExtractor={(item, _) => item.id.toString()}
                            numColumns={2}
                            renderItem={this.renderGridItem} />}
                </View>
            </View>
        )
    }

    private renderTopContainerIcon = (
        iconName: string, onPress: any, isActive: boolean
    ) => <TouchableOpacity style={styles.topContainerIcon} onPress={onPress} >
            <Icon
                name={iconName}
                size={responsiveFontSize(3.3)}
                color={isActive ? Black : LightGray} />
        </TouchableOpacity>

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
                this.props.navigation.navigate(Routes.ArtworkDetails, {
                    artwork: item
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
                        {this.renderTitleBox('Tytuł:', item.title)}
                        {this.renderTitleBox('Autor:', item.author)}
                        {item.after_auction_price ?
                            this.renderTitleBox('Cena poaukcyjna:', item.after_auction_price) :
                            item.sold === true && item.sold_price ?
                                this.renderTitleBox('Cena sprzedaży:', item.sold_price) :
                                this.renderTitleBox('Cena wywoławcza:', `${item.initial_price}`)}
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
