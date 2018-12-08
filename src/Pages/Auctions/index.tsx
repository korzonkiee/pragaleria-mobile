import React, { Component } from 'react';
import { Image, FlatList, View } from 'react-native';
import * as Nav from "react-navigation";
import DataNotFound from '../../Components/DataNotFound';
import { Text } from 'react-native'
import AppContainer from '../../Components/AppContainer';
import FooterActivityIndicator from '../../Components/FooterActivityIndicator';
import AppText from '../../Components/AppText';
import { l } from '../../Services/Language';
import { White, DirtyWhite, Black, Yellow, GreyLight, LightBlack } from '../../Resources/Colors';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { DefaultAppFont } from "../../Styles/Fonts";
import { getAuctions } from '../../Modules/Auctions/index';
import { auctions } from '../../Routes';
import { responsiveHeight, responsiveFontSize } from '../../Styles/Dimensions';
import ViewMoreText from 'react-native-view-more-text';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./styles";
import FadeIn from 'react-native-fade-in-image';
import moment from 'moment';


export interface AuctionsProps {
    readonly auctions: AuctionsData;
    readonly getAuctions: () => void;
}

interface AuctionsState {
    readonly index: number;
    readonly routes: Array<any>;
}

export class Auctions extends Component<AuctionsProps & Nav.NavigationInjectedProps, AuctionsState> {
    constructor(props: AuctionsProps & Nav.NavigationInjectedProps) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: 'current', title: "Przyszłe" },
                { key: 'finished', title: "Zakończone" },
            ],
        }
    }

    componentDidMount() {
        if (!this.props.auctions.loading) {
            this.props.getAuctions();
        }
    }

    render() {
        const auctionsData = this.props.auctions.data;
        if (this.props.auctions.loading) {
            return (
                <View />
            );
        } else if (!this.props.auctions.loading && this.props.auctions.data.length === 0) {
            return (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getAuctions} />)
        }
        else {
            let currentAuctions: Array<any>;
            let finishedAuctions: Array<any>;
            if (auctionsData) {
                let today = moment("2018-05-26", "YYYY-MM-DD");
                currentAuctions = auctionsData.filter(auction => {
                    return !moment(auction.auction_start, "YYYY/MM/DD HH:mm").isBefore(today);
                });
                finishedAuctions = auctionsData.filter(auction => {
                    return moment(auction.auction_start, "YYYY/MM/DD HH:mm").isBefore(today);
                });
            }
            return (
                <AppContainer style={{
                    flex: 1,
                    backgroundColor: DirtyWhite,
                }}>
                    <TabView
                        style={{ flex: 1 }}
                        navigationState={this.state}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                        renderScene={SceneMap({
                            current: () => this.renderAuctions(currentAuctions),
                            finished: () => this.renderAuctions(finishedAuctions),
                        })}
                    />
                </AppContainer>
            )
        }
    }

    private _handleIndexChange = (index: any) => this.setState({ index });

    private _renderTabBar = (props: any) => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ ...props.indicatorStyle, backgroundColor: Yellow }}
                labelStyle={{ ...props.labelStyle, fontFamily: DefaultAppFont, color: Black }}
                style={{ ...props.style, backgroundColor: White, color: Black }}
                bounces={false}
                useNativeDriver={true}
            />
        )
    };

    private renderAuctions = (auctionsData: Auction[]) => {
        return <FlatList
            data={auctionsData}
            keyExtractor={(item, _) => item.id.toString()}
            renderItem={this.renderAuction}
            numColumns={1}
        />
    };

    private renderAuction = ({ item, index }: { item: Auction, index: number }) => {
        return <View style={{
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
                    fontWeight: "500"
                }}>
                    {item.title}
                </AppText>
                <ViewMoreText numberOfLines={5} renderViewMore={() => { }}>
                    <AppText style={{
                        fontSize: responsiveFontSize(1.8),
                        color: LightBlack
                    }} >
                        {item.description_content || item.description_excerpt}
                    </AppText>
                </ViewMoreText>
            </View>
        </View>
    }
}
