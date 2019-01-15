import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, View } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import DataNotFound from '../../Components/DataNotFound';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import { Pills } from '../../Components/Pills';
import ArtworksPlaceholder from '../../Components/Placeholders/ArtworksPlaceholder';
import SearchBar from '../../Components/SearchBar';
import { DirtyWhite, LightBlack, LightGray } from '../../Resources/Colors';
import * as Routes from "../../Routes";
import { l, lp } from '../../Services/Language';
import { responsiveFontSize } from '../../Styles/Dimensions';
import styles from './styles';

enum Tag {
    none = 0,
    paint = 12,
    sculpture = 145,
    workshop = 231,
    cyber = 233,
    vector = 235,
    ceramics = 1385
}

export interface ArtworksProps {
    readonly artworks: ArtworksData;
    readonly filteredArtworks: FilteredArtworksData;

    readonly selectedTag: number;
    readonly selectTag: (tag: number) => void;

    readonly getArtworks: (tag: number) => void;
    readonly clearFilteredArtworks: () => void;
    readonly searchForArtworks: (keyword: string, tag: number) => void;
    readonly loadMoreArtworksForTag: (tag: number) => void;
}

export interface ArtworksState {
    readonly searching: boolean;
    readonly keyword: string;
}

interface Pill {
    key: number,
    value: string
};

const tags: Pill[] = [
    { key: Tag.paint, value: "Malarstwo" },
    { key: Tag.sculpture, value: "Rzeźba" },
    { key: Tag.workshop, value: "Grafika Warsztatowa" },
    { key: Tag.cyber, value: "Grafika Cyfrowa" },
    { key: Tag.vector, value: "Grafika Wektorwa" },
    { key: Tag.ceramics, value: "Ceramika" },
]

export class Artworks extends Component<ArtworksProps & Nav.NavigationInjectedProps, ArtworksState> {
    private selectedTag: number = 0;

    constructor(props: ArtworksProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            searching: false,
            keyword: ""
        };
    }

    componentDidMount() {
        this.props.getArtworks(0);
    }

    render() {
        return (
            <AppContainer style={styles.container}>
                <SearchBar onTextChanged={this.searchForArtworks}
                    onSearchingStarted={this.onSearchingStarted}
                    placeholder={l("Artworks.Search.Placeholder")}
                />
                <Pills pills={tags} onPillPressed={this.handlePillPress} />
                <View style={{
                    backgroundColor: DirtyWhite,
                    flex: 1
                }}>
                    {this.renderContent()}
                </View>
            </AppContainer >
        )
    }

    private renderContent() {
        let content = null;

        if (this.state.searching && this.props.filteredArtworks.errorOccured) {
            content = (<DataNotFound
                message={lp("Artists.Search.OfflineErrorForKeyword", this.state.keyword)}
                retry={() => this.props.searchForArtworks(this.state.keyword, this.selectedTag)} />);
        }
        else if (this.state.searching && this.props.filteredArtworks.data === null) {
            content = <ArtworksPlaceholder />
        }
        else if (this.state.searching && this.props.filteredArtworks.data.length === 0) {
            content = <DataNotFound message={lp("Artists.Search.ErrorForKeyword", this.state.keyword)} />
        }
        else if (this.props.artworks && !this.props.artworks.data && this.props.artworks.loading) {
            content = <ArtworksPlaceholder />
        }
        else if (this.props.artworks && !this.props.artworks.data && !this.props.artworks.loading) {
            content = <DataNotFound message={l("Artworks.NotFound")} />
        }
        else if (this.selectedTag && this.selectedTag !== 0 && this.selectedTag !== this.props.selectedTag) {
            content = <ArtworksPlaceholder />
        }
        else if ((this.props.artworks && this.props.artworks.data) ||
            (this.state.searching && this.props.filteredArtworks.data)) {
            const data = this.state.searching ? this.props.filteredArtworks.data : this.props.artworks.data;
            content = <FlatList
                data={data}
                keyExtractor={(item, _) => item.id.toString()}
                renderItem={this.renderArtwork.bind(this)}
                numColumns={1}
                ListFooterComponent={this.renderFooter()}
                onEndReached={this.loadMoreArtworks}
                onEndReachedThreshold={3} />
        }

        return content;
    }

    private renderArtwork({ item, index }: { item: Artwork, index: number }) {
        if (item.title && item.image_thumbnail)
            return (
                <TouchableWithoutFeedback onPress={() => this.navigateToArtwork(item)}>
                    <View style={{
                        margin: 5,
                        flexDirection: 'row',
                    }}>
                        <FadeIn style={styles.artworkFullResImage}
                            renderPlaceholderContent={(<Image style={{ flex: 1 }} source={{ uri: item.image_thumbnail }} blurRadius={2} />)}>
                            <Image style={styles.artworkFullImage} source={{
                                uri: item.image_medium_thumbnail || item.image_thumbnail
                            }} />
                        </FadeIn>

                        <View style={{
                            flex: 1,
                            paddingLeft: 4,
                            backgroundColor: DirtyWhite,
                            borderColor: LightGray,
                            borderWidth: 1
                        }}>
                            <AppText style={{
                                fontSize: responsiveFontSize(2.6),
                                color: LightBlack
                            }} numberOfLines={2}>
                                {item.title}
                            </AppText>
                            {item.author && Number.isNaN(Number(item.author)) ?
                                <AppText style={{
                                    fontSize: responsiveFontSize(1.8),
                                    color: LightBlack
                                }} numberOfLines={1}>
                                    {item.author}
                                </AppText> : null}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        else
            return null;
    }

    private navigateToArtwork = (artwork: Artwork) => {
        this.props.navigation.push(Routes.ArtworkDetails, {
            artwork: artwork,
            artistId: artwork.author_id
        });
    }

    private renderFooter = () => {
        if (this.props.artworks && this.props.artworks.loading &&
            !this.state.searching)
            return <FooterActivityIndicator />;
        return null;
    }

    private onSearchingStarted = (text: string) => {
        if (text.length > 2) {
            this.props.clearFilteredArtworks();
            this.setState({
                searching: true,
                keyword: text
            });
        }
    }

    private searchForArtworks = (text: string) => {
        if (text.length > 2) {
            this.props.searchForArtworks(text, this.selectedTag);
        } else {
            this.setState({
                searching: false,
            }, () => {
                this.props.getArtworks(this.selectedTag);
            });
        }
    }

    private loadMoreArtworks = () => {
        if (this.state.searching)
            return;

        if (this.props.artworks &&
            this.props.artworks.allLoaded)
            return;

        this.props.loadMoreArtworksForTag(this.selectedTag);
    }

    private handlePillPress = (pill: Pill) => {
        this.selectedTag = pill.key;

        if (this.state.searching) {
            this.props.searchForArtworks(this.state.keyword, pill.key);
        } else {
            this.props.getArtworks(pill.key);
        }
    }
}
