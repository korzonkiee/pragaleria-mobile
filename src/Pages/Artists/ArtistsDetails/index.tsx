import React, { Component } from 'react'
import * as Nav from "react-navigation";
import * as Routes from "../../../Routes";
import { DefaultAppFont } from "../../../Styles/Fonts";
import { FlatList, View, ScrollView } from 'react-native';
import AppContainer from '../../../Components/AppContainer';
import { ArtworkItem } from '../../../Components/ArtworkItem';
import DataNotFound from '../../../Components/DataNotFound';
import { l } from '../../../Services/Language';
import AppHeader from '../../../Components/AppHeader';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { White, Black, DirtyWhite, Yellow, LightBlack } from '../../../Resources/Colors';
import AppText from '../../../Components/AppText';


export interface ArtistsDetailsProps {
    readonly artist: ArtistDetailsData;
    readonly getArtistDetails: () => void;
}

interface ArtistsDetailsState {
    readonly descriptionLoaded: boolean;
    readonly index: number;
    readonly routes: Array<any>;
}

export class ArtistDetails extends Component<ArtistsDetailsProps & Nav.NavigationInjectedProps, ArtistsDetailsState> {
    private artistId: number = -1;

    constructor(props: ArtistsDetailsProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            descriptionLoaded: false,
            index: 0,
            routes: [
                { key: 'available', title: l("ArtistDetails.Available") },
                { key: 'sold', title: l("ArtistDetails.Sold") },
            ],
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
            let availableArtworks : Array<any>;
            let soldArtworks : Array<any>;
            if (artist) {
                availableArtworks = artist.artworks.filter(artwork => {
                    return artwork.sold === false;
                });
                soldArtworks = artist.artworks.filter(artwork => {
                    return artwork.sold === true;
                });
            }
            return (
                <AppContainer style={{flex: 1}}>
                    { artist && <>
                    <AppHeader
                        title={artist.name}
                        modalContent={
                            <ScrollView>
                                <AppText style={{color: Black, textAlign: 'justify', margin: 8}}>
                                    {artist.description}
                                </AppText>
                            </ScrollView>
                        }
                        withBackground />
                    <TabView
                        navigationState={this.state}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                        renderScene={SceneMap({
                            available: () => this.renderArtworks(availableArtworks),
                            sold: () => this.renderArtworks(soldArtworks),
                        })}
                    />
                    </> }
                </AppContainer>
            )
        }
    }

    private _handleIndexChange = (index: any) => this.setState({ index });

    private _renderTabBar = (props: any) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{...props.indicatorStyle, backgroundColor: Yellow }}
                labelStyle={{...props.labelStyle, fontFamily: DefaultAppFont, color: Black}}
                style={{...props.style, backgroundColor: White, color: Black}}
                bounces={false}
                useNativeDriver={true}
            />
        )
      };

    private renderArtworks = (artworks: Array<Artwork>) => {
        let viewContent;
        if (artworks.length > 0) {
            viewContent = (<FlatList
                style={{
                    backgroundColor: DirtyWhite
                }}
                data={artworks}
                keyExtractor={(item, _) => item.id.toString()}
                renderItem={this.renderArtwork}
                numColumns={1} />);
        } else {
            viewContent = <AppText style={{
                marginLeft: 16,
                marginTop: 16,
                color: LightBlack
            }}>
                {l("ArtistDetails.NoArtworksAvailable")}
            </AppText>
        }

        return (
            <View style={{
                backgroundColor: DirtyWhite,
                height: "100%"
            }}>
                {viewContent}
            </View>
        );
    };

    private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => {
        return (<ArtworkItem
            onPress={() => this.navigateToArtwork(this.artistId, item.id)}
            artwork={item} />)
    }

    private navigateToArtwork = (artistId: number, artworkId: number) => {
        console.log(`Navigating to artwork ${artworkId} of artist ${artistId}`);

        this.props.navigation.navigate(Routes.artworkDetails, {
            artistId: artistId,
            artworkId: artworkId
        });
    }
}
