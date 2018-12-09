import React, { Component } from 'react'
import * as Nav from "react-navigation";
import { FlatList } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import { ArtistItem } from '../../Components/ArtistItem';
import CenteredActivityIndicator from '../../Components/CenteredActivityIndicator';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import DataNotFound from '../../Components/DataNotFound';
import * as Routes from '../../Routes';
import { l } from '../../Services/Language';
import ArtistsPlaceholder from '../../Components/Placeholders/AristsPlaceholder';
import { Black, LightGrayHidden, LightBlack, DirtyWhite } from '../../Resources/Colors';


export interface ArtistsProps {
    readonly artists: ArtistsData;
    readonly getArtists: () => void;
}

export class Artists extends Component<ArtistsProps & Nav.NavigationInjectedProps> {
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
                    data={artistsData}
                    keyExtractor={(item, _) => item.id.toString()}
                    renderItem={this.renderArtist}
                    numColumns={3}

                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.props.getArtists}
                    onEndReachedThreshold={3}
                />
            </AppContainer>
        )
    }

    private renderArtist = ({ item, index }: { item: Artist, index: number }) =>
        (<ArtistItem
            index={index}
            artist={item}
            onPress={() => this.navigateToArtist(item.id.toString())} />)



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
