import React, { Component } from 'react'
import * as Nav from "react-navigation";
import * as Routes from "../../../Routes";
import { DefaultAppFont } from "../../../Styles/Fonts";
import { FlatList, WebView, NavState, View } from 'react-native'
import AppContainer from '../../../Components/AppContainer';
import { ArtworkItem } from '../../../Components/ArtworkItem';
import DataNotFound from '../../../Components/DataNotFound';
import { l } from '../../../Services/Language';
import AppHeader from '../../../Components/AppHeader';
import WebViewCustomized from '../../../Components/WebViewCustomized/WebViewCustomized';
import Placeholder from 'rn-placeholder'
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';



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

        this.state = {
            descriptionLoaded: false
        }
    }

    componentDidMount() {
        if (!this.props.artist || (this.props.artist.data === undefined && !this.props.artist.loading)) {
            this.props.getArtistDetails();
        }
    }

    render() {
        const artist = this.props.artist && this.props.artist.data;
        if (!this.props.artist) {
            return null;
        }

        if (this.props.artist.data != null) {
            this.artistId = this.props.artist.data.id;
        }

        if (this.props.artist.loading) {
            return <ArtistDetailsPlaceholder />
        }
        else if (!this.props.artist.loading && this.props.artist.data == null) {
            return (<DataNotFound retry={this.props.getArtistDetails} message={l("Common.GenericErrorMessageWithRetry")}/>)
        }
        else {
            return (
                <AppContainer style={{flex: 1}}>
                    { artist && <>
                    <AppHeader
                        title={artist.name}
                        withBackground />
                    <FlatList
                        data={artist.artworks}
                        keyExtractor={(item, _) => item.id.toString()}
                        ListHeaderComponent={this.renderAristDescription()}
                        renderItem={this.renderArtwork}
                        numColumns={1} />
                    </> }
                </AppContainer>
            )
        }
    }

    private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => {
        return (<ArtworkItem
            onPress={() => this.navigateToArtwork(this.artistId, item.id)}
            artwork={item} />)
    }

    private renderAristDescription = () => {
        if (this.props.artist && this.props.artist.data) {
            return (
                <WebViewCustomized
                    font={DefaultAppFont}
                    style={{flex: 1, height: 240}}
                    innerHtml={this.props.artist.data.description} />);
        } else {
            return null;
        }
    }

    private navigateToArtwork = (artistId: number, artworkId: number) => {
        console.log(`Navigating to artwork ${artworkId} of artist ${artistId}`);

        this.props.navigation.navigate(Routes.artworkDetails, {
            artistId: artistId,
            artworkId: artworkId
        });
    }
}
