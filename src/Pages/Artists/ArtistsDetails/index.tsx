import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../../Components/AppContainer';
import AppHeader from '../../../Components/AppHeader';
import AppText from '../../../Components/AppText';
import { AristDetailsTabBar } from '../../../Components/AristDetailsTabBar';
import DataNotFound from '../../../Components/DataNotFound';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { Black } from '../../../Resources/Colors';
import { l } from '../../../Services/Language';


export interface ArtistsDetailsProps {
    readonly artist: ArtistDetailsData;
    readonly getArtistDetails: () => void;
}

interface ArtistsDetailsState {
    readonly descriptionLoaded: boolean;
}

export class ArtistDetails extends Component<ArtistsDetailsProps & Nav.NavigationInjectedProps, ArtistsDetailsState> {
    private artistId: number = -1;

    constructor(props: ArtistsDetailsProps & Nav.NavigationInjectedProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.artist || (this.props.artist.data === undefined && !this.props.artist.loading)) {
            this.props.getArtistDetails();
        }
    }

    render() {
        const artist = this.props.artist;
        if (artist == null) {
            return null;
        }

        if (artist.loading) {
            return <ArtistDetailsPlaceholder />
        }

        if (artist.data == null) {
            return <DataNotFound retry={this.props.getArtistDetails} message={l("Common.GenericErrorMessageWithRetry")} />
        }

        const availableArtworks = artist.data.artworks.filter(artwork => {
            return artwork.sold === false;
        });

        const soldArtworks = artist.data.artworks.filter(artwork => {
            return artwork.sold === true;
        });

        const statisticsArtworks = soldArtworks.sort(
            (a, b) => {
                if (a.id < b.id)
                    return -1;
                if (b.id > a.id)
                    return 1;
                return 0;
            }
        ).filter(artwork => {
            if (artwork.title &&
                artwork.sold_price &&
                artwork.sold_price !== "0,00") {
                return true;
            } else {
                return false;
            }
        });

        const artistDescription = artist.data.description || "Brak opisu artysty";

        return (
            <AppContainer style={{ flex: 1 }}>
                {artist && <>
                    <AppHeader
                        title={artist.data.name}
                        modalContent={
                            <ScrollView>
                                <AppText style={{ color: Black, textAlign: 'justify', margin: 8 }}>
                                    {artistDescription}
                                </AppText>
                            </ScrollView>
                        }
                        withBackground />
                    <AristDetailsTabBar navigation={this.props.navigation}
                        artist={artist.data}
                        availableArtworks={availableArtworks}
                        soldArtworks={soldArtworks}
                        statisticsArtworks={statisticsArtworks} />
                </>}
            </AppContainer>
        )
    }
}
