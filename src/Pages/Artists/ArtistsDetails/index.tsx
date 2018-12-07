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
import { TabView, TabBar, Scene } from 'react-native-tab-view';
import ArtistDetailsPlaceholder from '../../../Components/Placeholders/ArtistDetailsPlaceholder';
import { White, Black, DirtyWhite, Yellow, LightBlack } from '../../../Resources/Colors';
import AppText from '../../../Components/AppText';


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

        console.log(artist);

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
                    {}
                </>}
            </AppContainer>
        )
    }
}

// interface TabViewState {
//     readonly index: number;

// }
// class TabViewCompontent extends React.Component<{}, TabViewState> {
//     constructor(props: any) {
//         super(props);

//         this.state = {
//             index: 0,
//             routes: [
//                 { key: 'available', title: l("ArtistDetails.Available") },
//                 { key: 'sold', title: l("ArtistDetails.Sold") },
//             ]
//         }
//     }
//     render() {
//         return (<
//             navigationState={this.state}
//             renderTabBar={this._renderTabBar}
//             onIndexChange={this._handleIndexChange}
//             renderScene={
//                 (props) => (
//                     <AppText>Siema</AppText>
//                     // <ArtistArtworks
//                     //     navigation={this.props.navigation}
//                     //     artistId={this.props.artist.data!.id}
//                     //     artworks={this.props.artist.data!.artworks}
//                     //     artworksType={props.route.key}
//                     // />
//                 )}
//         />)
//     }

//     private _handleIndexChange = (index: number) => {
//         console.log("Index changed");
//         console.log(index);
//         this.setState({ index: index })
//     };
//     private _renderTabBar = (props: any) => {
//         return (
//             <TabBar
//                 {...props}
//                 style={{ zIndex: 1 }}
//                 // indicatorStyle={{ ...props.indicatorStyle, backgroundColor: Yellow }}
//                 // labelStyle={{ ...props.labelStyle, fontFamily: DefaultAppFont, color: Black }}
//                 // style={{ ...props.style, backgroundColor: White, color: Black }}
//                 onTabPress={this.handleTabPress}
//             // bounces={true}
//             // useNativeDriver={true}
//             />
//         )
//     };

//     private handleTabPress = (scene: any) => {
//         console.log(scene);
//     }
// }

// export interface ArtistArtworksProps {
//     readonly artistId: number;
//     readonly artworks: Array<Artwork>;
//     readonly artworksType: string;
// }

// export class ArtistArtworks extends React.PureComponent<ArtistArtworksProps & Nav.NavigationInjectedProps> {
//     render() {
//         const availableArtworks = this.props.artworks.filter(artwork => {
//             return artwork.sold === false;
//         });

//         const soldArtworks = this.props.artworks.filter(artwork => {
//             return artwork.sold === true;
//         });

//         return this.renderArtworks(availableArtworks);
//     }

//     private renderArtworks = (artworks: Array<Artwork>) => {
//         let viewContent;
//         if (artworks.length > 0) {
//             viewContent = (<FlatList
//                 style={{
//                     backgroundColor: DirtyWhite
//                 }}
//                 data={artworks}
//                 keyExtractor={(item, _) => item.id.toString()}
//                 renderItem={this.renderArtwork}
//                 numColumns={1} />);
//         } else {
//             viewContent = <AppText style={{
//                 marginLeft: 16,
//                 marginTop: 16,
//                 color: LightBlack
//             }}>
//                 {l("ArtistDetails.NoArtworksAvailable")}
//             </AppText>
//         }

//         return (
//             <View style={{
//                 backgroundColor: DirtyWhite,
//                 height: "100%"
//             }}>
//                 {viewContent}
//             </View>
//         );
//     };

//     private renderArtwork = ({ item, index: number }: { item: Artwork, index: number }) => {
//         return (<ArtworkItem
//             onPress={() => this.navigateToArtwork(this.props.artistId, item.id)}
//             artwork={item} />)
//     }

//     private navigateToArtwork = (artistId: number, artworkId: number) => {
//         console.log(`Navigating to artwork ${artworkId} of artist ${artistId}`);

//         this.props.navigation.navigate(Routes.artworkDetails, {
//             artistId: artistId,
//             artworkId: artworkId
//         });
//     }
// }
