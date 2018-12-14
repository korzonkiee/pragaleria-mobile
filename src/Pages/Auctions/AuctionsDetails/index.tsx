import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../../Components/AppContainer';
import AppHeader from '../../../Components/AppHeader';
import AppText from '../../../Components/AppText';
import DataNotFound from '../../../Components/DataNotFound';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { l } from '../../../Services/Language';
import FadeIn from "react-native-fade-in-image";
import styles from "./styles";
import { White, Black, DirtyWhite, Yellow, LightBlack, LightGray } from '../../../Resources/Colors';


export interface AuctionDetailsProps {
    readonly auction: Auction;
    readonly catalog: CatalogData;
    readonly getAuctionsDetails: () => void;
}

export class AuctionDetails extends Component<AuctionDetailsProps & Nav.NavigationInjectedProps> {
    private auctionId: number = -1;

    constructor(props: AuctionDetailsProps & Nav.NavigationInjectedProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.auction);
        console.log(this.props.catalog);

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

        return (
            <AppContainer style={{ flex: 1 }}>
            {auction && catalog && <>
                <AppHeader
                    title='Aukcja'
                    rightButtonDisabled={true}
                    withBackground />
                <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(<Image style={{ flex: 1 }} source={{ uri: auction.image_thumbnail }} blurRadius={2} />)}>
                    <Image style={styles.artworkFullImage} source={{
                        uri: auction.image_big_thumbnail || auction.image_medium || auction.image_large || auction.image_original
                    }} />
                </FadeIn>
            </>}
            </AppContainer>
        )
    }
}
