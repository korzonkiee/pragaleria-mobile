import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import SearchBar from '../../Components/SearchBar';
import { White } from '../../Resources/Colors';
import styles from './styles';

export interface ArtworksProps {
}

enum Tag {
    paint = 12,
    sculpture = 145,
    workshop = 231,
    cyber = 233,
    vector = 235,
    ceramics = 1385
}

interface TagItem {
    key: Tag,
    value: string
};

var tags: TagItem[] = [
    { key: Tag.paint, value: "Malarstwo" },
    { key: Tag.sculpture, value: "Rzeźba" },
    { key: Tag.workshop, value: "Grafika Warsztatowa" },
    { key: Tag.cyber, value: "Grafika Cyfrowa" },
    { key: Tag.vector, value: "Grafika Wektorwa" },
    { key: Tag.ceramics, value: "Ceramika" },
]

export class Artworks extends Component<ArtworksProps> {
    render() {
        return (
            <AppContainer style={styles.container}>
                <SearchBar onTextChanged={() => { }} />
                <ScrollView style={styles.pillsContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {tags.map(pill => {
                        return <View key={pill.key} style={styles.pill}>
                            <AppText style={styles.pillText}>
                                {pill.value}
                            </AppText>
                        </View>
                    })}
                </ScrollView>
                <View style={{
                    backgroundColor: White,
                    flex: 1
                }}>

                </View>

            </AppContainer>
        )
    }
}
