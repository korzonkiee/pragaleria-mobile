import React, { Component } from 'react'
import * as Nav from "react-navigation";
import * as Routes from "../../../Routes";
import font, { DefaultAppFont } from "../../../Styles/Fonts";
import { FlatList, View, ScrollView } from 'react-native';
import AppContainer from '../../../Components/AppContainer';
import { ArtworkItem } from '../../../Components/ArtworkItem';
import DataNotFound from '../../../Components/DataNotFound';
import { l } from '../../../Services/Language';
import AppHeader from '../../../Components/AppHeader';
import { TabView, TabBar, Scene } from 'react-native-tab-view';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { White, Black, DirtyWhite, Yellow, LightBlack, LightGray } from '../../../Resources/Colors';
import AppText from '../../../Components/AppText';
import { About } from '../../About/index';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { AristDetailsTabBar } from '../../../Components/AristDetailsTabBar';


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

    shouldComponentUpdate?(nextProps: any, nextState: any, nextContext: any): boolean {
        if (this.props.artist && this.props.artist.data && nextProps.artist && nextProps.artist.data) {
            return this.props.artist.data.id !== nextProps.artist.data.id;
        }

        return true;
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

        return (
            <AppContainer style={{ flex: 1 }}>
                {artist && <>
                    <AppHeader
                        title={artist.data.name}
                        modalContent={
                            <ScrollView>
                                <AppText style={{ color: Black, textAlign: 'justify', margin: 8 }}>
                                    {artist.data.description}
                                </AppText>
                            </ScrollView>
                        }
                        withBackground />
                    <AristDetailsTabBar navigation={this.props.navigation}
                        artistId={artist.data!.id}
                        availableArtworks={availableArtworks}
                        soldArtworks={soldArtworks} />
                </>}
            </AppContainer>
        )
    }
}
