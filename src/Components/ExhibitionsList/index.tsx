import React from "react";
import { FlatList, Image, TouchableWithoutFeedback, View } from 'react-native';
import FadeIn from "react-native-fade-in-image";
import ViewMoreText from "react-native-view-more-text";
import * as Nav from "react-navigation";
import { Black, LightBlack } from "../../Resources/Colors";
import * as Routes from '../../Routes';
import { responsiveFontSize } from "../../Styles/Dimensions";
import font from "../../Styles/Fonts";
import AppText from "../AppText";
import styles from "./styles";

export interface ExihibitionsListProps {
    readonly exhibitions: Exhibition[];
    readonly artworksNotFoundMessage: string;
}

export class ExihibitionsList extends React.PureComponent<ExihibitionsListProps & Nav.NavigationInjectedProps> {
    render() {
        if (this.props.exhibitions.length === 0) {
            return (<AppText style={{ color: Black, margin: 16 }}>{this.props.artworksNotFoundMessage}</AppText>)
        } else {
            return this.renderAuctions(this.props.exhibitions);
        }
    }

    private renderAuctions = (auctionsData: Auction[]) => {
        return <FlatList
            data={auctionsData}
            keyExtractor={(item, _) => item.id.toString()}
            renderItem={this.renderExhibition}
            numColumns={1}
        />
    };

    private renderExhibition = ({ item, index }: { item: Exhibition, index: number }) => {
        return <TouchableWithoutFeedback onPress={() => this.navigateToExhibitionDetails(item)}>
            <View style={{
                marginBottom: 30,
            }}>
                <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(<Image style={{ flex: 1 }} source={{ uri: item.image_thumbnail }} blurRadius={2} />)}>
                    <Image style={styles.artworkFullImage} source={{
                        uri: item.image_big_thumbnail || item.image_medium || item.image_large || item.image_original
                    }} />
                </FadeIn>
                <View style={{
                    padding: 8
                }}>
                    <AppText style={{
                        fontSize: responsiveFontSize(2.3),
                        color: Black,
                        ...font({ weight: "Bold" })
                    }}>
                        {item.title}
                    </AppText>
                    <ViewMoreText numberOfLines={5} renderViewMore={() => { }}>
                        <AppText style={{
                            color: LightBlack
                        }} >
                            {item.description_content || item.description_excerpt}
                        </AppText>
                    </ViewMoreText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    }

    private navigateToExhibitionDetails = (exhibition: Exhibition) => {
        this.props.navigation.navigate(Routes.ExhibitionDetails, {
            exhibition: exhibition
        });
    }
}
