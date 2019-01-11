import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import AppContainer from '../../Components/AppContainer';
import AppText from '../../Components/AppText';
import SearchBar from '../../Components/SearchBar';
import { DirtyWhite } from '../../Resources/Colors';

export interface ArtworksProps {
}

// # 12 malarstwo
//         # 145 rzezba
//         # 231 grafika-warsztatowa
//         # 233 grafika-cyfrowa
//         # 235 grafika-wektorowa
//         # 1385 ceramika
const tags = {
    paint: [12, 'Malarstwo'],
    sculpture: [145, 'Rzeźba'],
    workshop: [233, 'Grafika Warsztatowa'],
    cyber: [233, 'Grafika Cyfrowa'],
    vector: [235, 'Grafika Wektorowa'],
    ceramics: [1385, 'Ceramika'],
};

export class Artworks extends Component<ArtworksProps> {
    render() {
        return (
            <AppContainer style={{
                backgroundColor: DirtyWhite,
                width: "100%",
                height: "100%"
            }}>
                <SearchBar onTextChanged={() => { }} />
                <ScrollView style={{
                    backgroundColor: 'green',
                    flexBasis: 'auto',
                    flexGrow: 0,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: 'row'
                }} horizontal={true}>
                    {Object.keys(tags).map(key => {
                        return <View key={tags[key][0]} style={{
                            backgroundColor: 'yellow',
                            marginVertical: 8,
                            paddingVertical: 4,
                            marginHorizontal: 4,
                            paddingHorizontal: 8,
                            borderRadius: 20
                        }}>
                            <AppText style={{
                                color: 'black'
                            }}>
                                {tags[key][1]}
                            </AppText>
                        </View>
                    })}
                </ScrollView>
                <View style={{
                    backgroundColor: 'blue',
                    flex: 1
                }}>

                </View>

            </AppContainer>
        )
    }
}