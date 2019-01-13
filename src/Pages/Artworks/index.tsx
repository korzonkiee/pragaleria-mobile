import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleProp, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import FadeIn from "react-native-fade-in-image";
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import ArtworksPlaceholder from '../../Components/Placeholders/ArtworksPlaceholder';
import SearchBar from '../../Components/SearchBar';
import { Black, DirtyWhite, LightBlack, LightGray, White } from '../../Resources/Colors';
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
    readonly selectedTag: number;
    readonly selectTag: (tag: number) => void;
    readonly getArtworks: (tag: number) => void;
}

export interface ArtworksState {
    readonly selectedTag: number;
}

interface Pill {
    key: Tag,
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

export class Artworks extends Component<ArtworksProps & Nav.NavigationInjectedProps> {
    constructor(props: ArtworksProps & Nav.NavigationInjectedProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getArtworks(0);
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
                            data={this.props.artworks.data}
                            keyExtractor={(item, _) => item.id.toString()}
                            renderItem={this.renderArtwork}
                            numColumns={1}
                            ListFooterComponent={this.renderFooter()}
                            onEndReached={() => { }}
                            onEndReachedThreshold={3} /> : null
                    }
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
        if (this.props.artworks && this.props.artworks.loading)
            return <FooterActivityIndicator />;
        return null;
    }

    private handlePillPress(pill: Pill) {
        console.log(`Tag ${pill.key} selected`);

        let selectedTag = this.props.selectedTag;

        if (selectedTag === pill.key) {
            selectedTag = 0;
        } else {
            selectedTag = pill.key;
        }

        this.props.selectTag(selectedTag);
        this.props.getArtworks(selectedTag);
    }

    private getSelectedPillContainerStyle(pill: Pill): StyleProp<ViewStyle> {
        const isSelected = this.props.selectedTag === pill.key;

        if (isSelected) {
            return {
                backgroundColor: LightBlack,
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
        const isSelected = this.props.selectedTag === pill.key;

        if (isSelected) {
            return {
                color: White
            };
        } else {
            return {
                color: Black
            };
        }
    }
}
