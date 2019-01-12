import React, { Component } from 'react';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import * as Nav from "react-navigation";
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import SearchBar from '../../Components/SearchBar';
import { DirtyWhite } from '../../Resources/Colors';
import styles from './styles';

export interface ArtworksProps {
}

export interface ArtworksState {
    selectedTags: Set<Tag>;
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
            selectedTags: new Set<Tag>()
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
                            <View style={styles.pill}>
                                <AppText style={styles.pillText}>
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
        const selectedTags = this.state.selectedTags;

        if (selectedTags.has(pill.key)) {
            selectedTags.delete(pill.key);
        } else {
            selectedTags.add(pill.key);
        }

        this.setState({
            selectedTags: selectedTags
        });
    }
}
