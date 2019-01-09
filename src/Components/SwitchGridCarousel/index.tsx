import React from "react";
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';
import { default as Icon } from "react-native-vector-icons/Entypo";
import { default as MaterialIcon } from "react-native-vector-icons/MaterialIcons";
import * as Nav from "react-navigation";
import { Black } from '../../Resources/Colors';
import { l } from "../../Services/Language";
import { responsiveFontSize } from '../../Styles/Dimensions';
import AppText from "../AppText";
import { AuctionGridItem } from "./AuctionGridItem";
import { CarouselWrapper } from "./CarouselWrapper";
import styles from "./styles";


export interface SwitchGridCarouselProps {
    readonly auction: Auction;
    readonly catalogItems: CatalogItem[];
}

interface SwitchGridCarouselState {
    readonly currentView: ViewType;
    readonly showOnlyAvailable: boolean;
    readonly catalogItemsFiltered: CatalogItem[];
}

type ViewType = 'grid' | 'slides'

export class SwitchGridCarousel extends React.PureComponent<SwitchGridCarouselProps & Nav.NavigationInjectedProps, SwitchGridCarouselState> {
    constructor(props: SwitchGridCarouselProps & Nav.NavigationInjectedProps) {
        super(props);

        const catalogItemsFiltered = this.props.catalogItems.filter(
            (catalogItem) => catalogItem.sold === false
        );
        this.state = {
            currentView: 'grid',
            showOnlyAvailable: false,
            catalogItemsFiltered: catalogItemsFiltered
        };
    }

    private displayAllArtworks() {
        this.setState({
            showOnlyAvailable: !this.state.showOnlyAvailable
        });
    }

    private catalogDataFiltered(): CatalogItem[] {
        if (this.state.showOnlyAvailable) {
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
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this.setState({
                                showOnlyAvailable: !this.state.showOnlyAvailable
                            })}>
                            {this.state.showOnlyAvailable ?
                                <MaterialIcon name='check-circle' size={responsiveFontSize(3.3 * 9.5 / 10.3)} color={Black} />
                                : <MaterialIcon name='radio-button-unchecked' size={responsiveFontSize(3.3 * 9.5 / 10.3)} color={Black} />}
                            <AppText style={{ color: Black, marginLeft: 4 }}>{l("Auctions.ShowAvailable")}</AppText>
                        </TouchableOpacity>
                        {/* <Checkbox
                            checked={this.state.showOnlyAvailable}
                            containerStyle={styles.checkboxStyle}
                            labelStyle={styles.checkboxLabelStyle}
                            label={l("Auctions.ShowAvailable")}
                            onChange={this.displayAllArtworks.bind(this)}
                        /> */}
                        {this.renderTopContainerIcon(this.state.currentView === 'grid')}
                    </View>
                }
                {auction && auction.urls && (auction.urls.virtual_tour || (auction.is_current && auction.urls.bidding)) &&
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
                                initialNumToRender={6}
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
    private renderGridItem = ({ item, index }: { item: CatalogItem, index: number }) =>
        (<AuctionGridItem isAuctionCurrent={this.props.auction.is_current}
            navigation={this.props.navigation}
            item={item}
            index={index} />)

}
