import React from 'react';
import { FlatList, Image, TouchableWithoutFeedback, View } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import ViewMoreText from 'react-native-view-more-text';
import * as Nav from 'react-navigation';
import { Black, LightBlack } from '../../Resources/Colors';
import * as Routes from '../../Routes';
import { responsiveFontSize } from '../../Styles/Dimensions';
import font from '../../Styles/Fonts';
import AppText from '../AppText';
import DataNotFound from '../DataNotFound';
import styles from './styles';


export interface AuctionsListProps {
    readonly auctions: Auction[];
}

export class AuctionsList extends React.PureComponent<AuctionsListProps & Nav.NavigationInjectedProps> {
    render() {
        if (this.props.auctions.length === 0) {
            return (<DataNotFound message={"Nie znaleziono"} />);
        } else {
            return this.renderAuctions(this.props.auctions);
        }
    }

    private renderAuctions = (auctionsData: Auction[]) => {
        return <FlatList
            data={auctionsData}
            keyExtractor={(item, _) => item.id.toString()}
            renderItem={this.renderAuction}
            numColumns={1}
        />
    };

    private renderAuction = ({ item, index }: { item: Auction, index: number }) => {
        return <TouchableWithoutFeedback onPress={() => this.navigateToAuctionDetails(item)}>
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

    private navigateToAuctionDetails = (auction: Auction) => {
        this.props.navigation.push(Routes.AuctionDetails, {
            auction: auction
        });
    }
}
