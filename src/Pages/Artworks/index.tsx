import React, { Component } from 'react';
import { ScrollView, StyleProp, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import SearchBar from '../../Components/SearchBar';
import { Black, DirtyWhite, LightGrayHidden, White } from '../../Resources/Colors';
import styles from './styles';

export interface ArtworksProps {
}

export interface ArtworksState {
    selectedTag: Tag | null;
}

enum Tag {
    paint = 12,
    sculpture = 145,
    workshop = 231,
    cyber = 233,
    vector = 235,
    ceramics = 1385
}

interface Pill {
    key: Tag,
    value: string
};

var tags: Pill[] = [
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
            selectedTag: null
        };
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

                </View>

            </AppContainer >
        )
    }

    private handlePillPress(pill: Pill) {
        let selectedTag = this.state.selectedTag;

        if (selectedTag === pill.key) {
            selectedTag = null;
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
