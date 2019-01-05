import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../../Components/AppContainer';
import AppHeader from '../../../Components/AppHeader';
import AppText from '../../../Components/AppText';
import DataNotFound from '../../../Components/DataNotFound';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { SwitchGridCarousel } from '../../../Components/SwitchGridCarousel';
import { Black } from '../../../Resources/Colors';
import { l } from '../../../Services/Language';


export interface AuctionDetailsProps {
    readonly auction: Auction;
    readonly catalog: CatalogData;
    readonly getAuctionsDetails: () => void;
}

export class AuctionDetails extends Component<AuctionDetailsProps & Nav.NavigationInjectedProps> {
    componentDidMount() {
        if (!this.props.catalog) {
            this.props.getAuctionsDetails();
        }
    }

    render() {
        const { artist, auction, catalog } = this.props;

        if (!catalog) {
            return null;
        }

        if (catalog.loading) {
            return <ArtistDetailsPlaceholder />
        }

        if (catalog.data == null) {
            return <DataNotFound retry={this.props.getAuctionsDetails} message={l("Common.GenericErrorMessageWithRetry")} />
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
                    <SwitchGridCarousel auction={auction} catalogItems={catalog.data} navigation={this.props.navigation} />
                </>}
            </AppContainer>
        )
    }
}
