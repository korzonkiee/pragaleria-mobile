import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleProp, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import FadeIn from "react-native-fade-in-image";
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import SearchBar from '../../Components/SearchBar';
import { Black, DirtyWhite, LightBlack, LightGray, LightGrayHidden, White } from '../../Resources/Colors';
import { responsiveFontSize } from '../../Styles/Dimensions';
import styles from './styles';

export interface ArtworksProps {
    readonly artworks: ArtworksData;
    readonly getArtworks: (tag: Tag) => void;
}

export interface ArtworksState {
    selectedTag: Tag;
}

interface Pill {
    key: Tag,
    value: string
};

const searchResults = [
    {
        "id": 29967,
        "title": "Spacer",
        "author_id": 15,
        "author": "Jacek Malinowski",
        "tags": [
            "Malarstwo"
        ],
        "description": "olej, płótno, 80 x 100 cm, sygn. na odwrocie",
        "year": "",
        "image_original": "http://pragaleria.pl/wp-content/uploads/2018/07/15306292502fa7d.jpg",
        "image_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/07/15306292502fa7d-150x150.jpg",
        "image_medium_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/07/15306292502fa7d-300x239.jpg",
        "image_big_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/07/15306292502fa7d-678x540.jpg",
        "image_medium": "http://pragaleria.pl/wp-content/uploads/2018/07/15306292502fa7d-768x612.jpg",
        "image_large": "http://pragaleria.pl/wp-content/uploads/2018/07/15306292502fa7d-1024x815.jpg",
        "catalog_id": 29942,
        "catalog_name": "Wakacyjna Aukcja Sztuki Młodej – 14 lipca 2018 r., godz. 17.00",
        "sold": true,
        "initial_price": "500",
        "sold_price": "500",
        "after_auction_price": ""
    },
    {
        "id": 36321,
        "title": "Spacer, sierpień, 2018",
        "author_id": 1290,
        "author": "Malwina Cieślik",
        "tags": [
            "Malarstwo"
        ],
        "description": "olej, płótno, 60 x 60 cm, sygn. na odwrocie",
        "year": "",
        "image_original": "http://pragaleria.pl/wp-content/uploads/2018/11/1542129709f43fc.jpg",
        "image_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/11/1542129709f43fc-150x150.jpg",
        "image_medium_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/11/1542129709f43fc-300x300.jpg",
        "image_big_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/11/1542129709f43fc-540x540.jpg",
        "image_medium": "http://pragaleria.pl/wp-content/uploads/2018/11/1542129709f43fc-768x767.jpg",
        "image_large": "http://pragaleria.pl/wp-content/uploads/2018/11/1542129709f43fc-1024x1024.jpg",
        "catalog_id": 36285,
        "catalog_name": "23. Aukcja Sztuki Młodej – 21 listopada 2018 r., godz. 19.30",
        "sold": false,
        "initial_price": "500",
        "sold_price": "",
        "after_auction_price": ""
    },
    {
        "id": 29343,
        "title": "Spacerek rowerowy, 2016",
        "author_id": 1213,
        "author": "Marcin Kędzierski",
        "tags": [
            "Malarstwo"
        ],
        "description": "olej, płótno, 62 x 85 cm, sygn. na odwrocie",
        "year": "",
        "image_original": "http://pragaleria.pl/wp-content/uploads/2018/05/1526115218bb7d5.jpg",
        "image_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/05/1526115218bb7d5-150x150.jpg",
        "image_medium_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/05/1526115218bb7d5-300x219.jpg",
        "image_big_thumbnail": "http://pragaleria.pl/wp-content/uploads/2018/05/1526115218bb7d5-740x540.jpg",
        "image_medium": "http://pragaleria.pl/wp-content/uploads/2018/05/1526115218bb7d5-768x560.jpg",
        "image_large": "http://pragaleria.pl/wp-content/uploads/2018/05/1526115218bb7d5-1024x747.jpg",
        "catalog_id": 29266,
        "catalog_name": "19. Aukcja Sztuki Młodej – 23 maja 2018 r., godz. 19.30",
        "sold": false,
        "initial_price": "500",
        "sold_price": "",
        "after_auction_price": ""
    }
];

const tags: Pill[] = [
    { key: Tag.paint, value: "Malarstwo" },
    { key: Tag.sculpture, value: "Rzeźba" },
    { key: Tag.workshop, value: "Grafika Warsztatowa" },
    { key: Tag.cyber, value: "Grafika Cyfrowa" },
    { key: Tag.vector, value: "Grafika Wektorwa" },
    { key: Tag.ceramics, value: "Ceramika" },
]

export class Artworks extends Component<ArtworksProps & Nav.NavigationInjectedProps, ArtworksState> {
    constructor(props: ArtworksProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            selectedTag: Tag.none
        };
    }

    componentDidMount() {
        this.props.getArtworks(
            this.state.selectedTag
        )
    }

    render() {
        return (
            <AppContainer style={styles.container}>
                <SearchBar onTextChanged={() => { }} />
                <ScrollView style={styles.pillsContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {tags.map(pill => {
                        return (<TouchableWithoutFeedback key={pill.key} onPress={() => this.handlePillPress(pill)}>
                            <View style={[styles.pill, this.getSelectedPillContainerStyle(pill)]}>
                                <AppText style={[styles.pillText, this.getSelectedPillTextStyle(pill)]}>
                                    {pill.value}
                                </AppText>
                            </View>
                        </TouchableWithoutFeedback>)
                    })}
                </ScrollView>
                <View style={{
                    backgroundColor: DirtyWhite,
                    flex: 1
                }}>
                    {this.props.artworks && this.props.artworks.loading ?
                        <ArtworksPlaceholder /> : null}
                    {this.props.artworks && this.props.artworks.data ?
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item, _) => item.id.toString()}
                        renderItem={this.renderArtwork}
                        numColumns={1}
                        ListFooterComponent={this.renderFooter()}
                        onEndReached={() => { }}
                        onEndReachedThreshold={3} />
                </View>
            </AppContainer >
        )
    }

    private renderArtwork({ item, index }: { item: Artwork, index: number }) {
        if (item.title && item.image_thumbnail)
        return (
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
                <TouchableWithoutFeedback>
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
                </TouchableWithoutFeedback>
            </View >
        );
        else
            return null;
    }

    private renderFooter = () => {
        // if (this.props.artists.loading)
        // return <FooterActivityIndicator />;
        return null;
    }

    private handlePillPress(pill: Pill) {
        let selectedTag = this.state.selectedTag;

        if (selectedTag === pill.key) {
            selectedTag = Tag.none;
        } else {
            selectedTag = pill.key;
        }

        this.setState({
            selectedTag: selectedTag
        });
    }

    private getSelectedPillContainerStyle(pill: Pill): StyleProp<ViewStyle> {
        const isSelected = this.state.selectedTag === pill.key;

        if (isSelected) {
            return {
                backgroundColor: LightGrayHidden,
                elevation: 0
            };
        } else {
            return {
                backgroundColor: White,
                elevation: 2
            };
        }
    }

    private getSelectedPillTextStyle(pill: Pill): StyleProp<TextStyle> {
        const isSelected = this.state.selectedTag === pill.key;

        if (isSelected) {
            return {
                color: Black
            };
        } else {
            return {
                color: Black
            };
        }
    }
}
