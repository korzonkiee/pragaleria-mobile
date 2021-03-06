import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import { ArtistItem } from '../../Components/ArtistItem';
import DataNotFound from '../../Components/DataNotFound';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import ArtistsPlaceholder from '../../Components/Placeholders/AristsPlaceholder';
import SearchBar from '../../Components/SearchBar';
import * as Routes from '../../Routes';
import { l, lp } from '../../Services/Language';


export interface ArtistsProps {
    readonly artists: ArtistsData;
    readonly filteredArtists: FilteredAristsData;
    readonly getArtists: () => void;
    readonly searchArists: (keyword: string) => void;
}

interface ArtistsState {
    readonly searching: boolean;
    readonly keyword: string;
}

export class Artists extends Component<ArtistsProps & Nav.NavigationInjectedProps, ArtistsState> {
    constructor(props: ArtistsProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            searching: false,
            keyword: "",
        };
    }

    componentDidMount() {
        if (!this.props.artists.loading) {
            this.props.getArtists();
        }
    }

    render() {
        const artistsData = this.props.artists.data;

        if (this.props.artists.loading && this.props.artists.page === 0) {
            return (
                <ArtistsPlaceholder />
            );
        }

        let content;

        if (!this.props.artists.loading && this.props.artists.data.length === 0) {
            content = (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getArtists} />);
        } else if (this.state.searching && this.props.filteredArtists.errorOccured) {
            content = (<DataNotFound
                message={lp("Artists.Search.OfflineErrorForKeyword", this.state.keyword)}
                retry={() => this.searchForArtists(this.state.keyword)} />);
        } else if (this.state.searching && this.props.filteredArtists.data.length === 0) {
            content = (<DataNotFound
                message={lp("Artists.Search.ErrorForKeyword", this.state.keyword)}
                retry={() => { }} />);
        } else {
            content = (<FlatList
                data={this.state.searching ? this.props.filteredArtists.data : artistsData}
                keyExtractor={(item, _) => item.id.toString()}
                renderItem={this.renderArtist}
                numColumns={3}
                ListFooterComponent={this.renderFooter()}
                onEndReached={this.state.searching ? undefined : this.props.getArtists}
                onEndReachedThreshold={3} />);
        }

        return (<AppContainer style={{ flex: 1 }}>
            <SearchBar onTextChanged={this.searchForArtists}
                placeholder={l("Artists.Search.Placeholder")} />
            {content}
        </AppContainer>)
    }

    private searchForArtists = (text: string) => {
        if (text.length > 0) {
            this.setState({
                searching: true,
                keyword: text
            });
            this.props.searchArists(text);
        } else {
            this.setState({
                searching: false
            });
        }
    }

    private renderArtist = ({ item, index }: { item: Artist, index: number }) =>
        (<TouchableOpacity style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            marginBottom: 2
        }} onPress={() => this.navigateToArtist(item.id.toString())}>
            <ArtistItem
                index={index}
                artist={item} />
        </TouchableOpacity>)

    private renderFooter = () => {
        if (this.props.artists.loading)
            return <FooterActivityIndicator />;
        return null;
    }

    private navigateToArtist = (artistId: string) => {
        this.props.navigation.push(Routes.ArtistDetails, {
            artistId: artistId
        });
    }
}
