import React, { Component, ComponentElement } from 'react'
import * as Nav from "react-navigation";
import { FlatList, TextInput, View } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import { ArtistItem } from '../../Components/ArtistItem';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import DataNotFound from '../../Components/DataNotFound';
import * as Routes from '../../Routes';
import { l } from '../../Services/Language';
import ArtistsPlaceholder from '../../Components/Placeholders/AristsPlaceholder';
import { Black, LightGrayHidden, LightBlack, DirtyWhite, LightGray } from '../../Resources/Colors';
import font from '../../Styles/Fonts';
import { responsiveFontSize } from '../../Styles/Dimensions';
import Icon from 'react-native-vector-icons/Entypo';
import SearchBar from '../../Components/SearchBar';


export interface ArtistsProps {
    readonly artists: ArtistsData;
    readonly filteredArtists: Artist[];
    readonly getArtists: () => void;
    readonly searchArists: (keyword: string) => void;
}

interface ArtistsState {
    readonly filtering: boolean;
}

export class Artists extends Component<ArtistsProps & Nav.NavigationInjectedProps, ArtistsState> {
    constructor(props: ArtistsProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            filtering: false,
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

        if (!this.props.artists.loading && this.props.artists.data.length === 0) {
            return (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getArtists} />)
        }

        return (
            <AppContainer style={{
                backgroundColor: DirtyWhite,
                display: 'flex',
                justifyContent: 'space-between'
            }}
            >
                <FlatList
                    data={this.state.filtering ? this.props.filteredArtists : artistsData}
                    keyExtractor={(item, _) => item.id.toString()}
                    renderItem={this.renderArtist}
                    numColumns={3}
                    ListHeaderComponent={this.renderHeader()}
                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.state.filtering ? undefined : this.props.getArtists}
                    onEndReachedThreshold={3} />
            </AppContainer>
        )
    }

    private searchForArtists = (text: string) => {
        if (text.length > 0) {
            this.setState({
                filtering: true
            });
            this.props.searchArists(text);
        } else {
            this.setState({
                filtering: false
            });
        }
    }

    private renderArtist = ({ item, index }: { item: Artist, index: number }) =>
        (<ArtistItem
            index={index}
            artist={item}
            onPress={() => this.navigateToArtist(item.id.toString())} />)


    private renderHeader = () => (
        <SearchBar onTextChanged={this.searchForArtists} />
    )

    private renderFooter = () => {
        if (this.props.artists.loading)
            return <FooterActivityIndicator />;
        return null;
    }

    private navigateToArtist = (artistId: string) => {
        this.props.navigation.navigate(Routes.ArtistDetails, {
            artistId: artistId
        });
    }
}
