import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../../Components/AppContainer';
import AppHeader from '../../../Components/AppHeader';
import AppText from '../../../Components/AppText';
import DataNotFound from '../../../Components/DataNotFound';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import SearchBar from '../../../Components/SearchBar';
import { SwitchGridCarousel } from '../../../Components/SwitchGridCarousel';
import { Black } from '../../../Resources/Colors';
import { l } from '../../../Services/Language';


export interface AuctionDetailsProps {
    readonly auction: Auction;
    readonly catalog: CatalogData;
    readonly catalogDataOnlySold: CatalogItem[] | [];
    readonly getAuctionsDetails: () => void;
    readonly searchArtistInCatalog: (catalog: CatalogData, query: string) => Promise<CatalogItem[] | undefined>;
}

export interface AuctionDetailsState {
    readonly searchResults: CatalogItem[] | null;
    readonly catalogItemsFiltered: CatalogItem[];
}

export class AuctionDetails extends Component<AuctionDetailsProps & Nav.NavigationInjectedProps, AuctionDetailsState> {
    constructor(props: AuctionDetailsProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            searchResults: null,
            catalogItemsFiltered: []
        };
    }

    componentDidMount() {
        if (!this.props.catalog) {
            this.props.getAuctionsDetails();
        }
    }

    render() {
        const { auction, catalog } = this.props;

        if (!catalog) {
            return null;
        }

        if (catalog.loading) {
            return <ArtistDetailsPlaceholder />
        }

        if (catalog.data == null) {
            return <DataNotFound retry={this.props.getAuctionsDetails} message={l("Common.GenericErrorMessageWithRetry")} />
        }

        let filtered = [];
        if (this.state.catalogItemsFiltered.length > 0) {
            filtered = this.state.catalogItemsFiltered;
        } else {
            filtered = this.props.catalogDataOnlySold;
        }

        return (
            <AppContainer style={{ flex: 1 }}>
                {auction && catalog && <>
                    <AppHeader
                        title='Aukcja'
                        withBackground
                        modalContent={
                            <ScrollView style={{ margin: 8 }}>
                                <AppText style={{ color: Black }}>
                                    {auction.title}
                                </AppText>
                                <AppText style={{ color: Black }}>
                                    Rozpoczęcie: {auction.auction_start}
                                </AppText>
                                <AppText style={{ color: Black }}>
                                    Zakończenie: {auction.auction_end}
                                </AppText>
                                <AppText style={{ marginTop: 4, color: Black, textAlign: 'justify' }}>
                                    Opis: {auction.description_content || auction.description_excerpt}
                                </AppText>
                            </ScrollView>
                        } />
                    {this.props.catalog.data ? <SearchBar onTextChanged={() => { }}
                        onSearchingStarted={async (text: string) => {
                            let searchResults = await this.props.searchArtistInCatalog(
                                this.props.catalog,
                                text
                            );
                            if (!searchResults) { searchResults = [] }
                            let catalogItemsFiltered: CatalogItem[] | never[] = [];
                            if (searchResults.length > 0) {
                                catalogItemsFiltered = searchResults.filter(
                                    (catalogItem) => catalogItem.sold === false
                                );
                            }
                            this.setState({ searchResults, catalogItemsFiltered });
                        }}
                        placeholder={l("Artists.Search.Placeholder")}
                    /> : <></>}
                    <SwitchGridCarousel
                        auction={auction}
                        catalogItemsFiltered={filtered}
                        catalogItems={this.state.searchResults || catalog.data}
                        navigation={this.props.navigation} />
                </>}
            </AppContainer>
        )
    }
}
