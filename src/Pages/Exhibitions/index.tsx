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
import { responsiveHeight, responsiveFontSize } from '../../Styles/Dimensions';
import ViewMoreText from 'react-native-view-more-text';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./styles";
import FadeIn from 'react-native-fade-in-image';
import moment from 'moment';
import { exhibitions } from '../../Routes';


export interface ExhibitionsProps {
    readonly exhibitions: ExhibitionsData;
    readonly getExhibitions: () => void;
}

interface ExhibitionsState {
    readonly index: number;
    readonly routes: Array<any>;
}

export class Exhibitions extends Component<ExhibitionsProps & Nav.NavigationInjectedProps, ExhibitionsState> {
    constructor(props: ExhibitionsProps & Nav.NavigationInjectedProps) {
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
        if (!this.props.exhibitions.loading) {
            this.props.getExhibitions();
        }
    }

    shouldComponentUpdate?(nextProps: any, nextState: any, nextContext: any): boolean {
        return nextProps.exhibitions !== this.props.exhibitions;
    }

    render() {
        const exhibitionsData = this.props.exhibitions.data;
        if (this.props.exhibitions.loading) {
            return (
                <View />
            );
        } else if (!this.props.exhibitions.loading && this.props.exhibitions.data.length === 0) {
            return (<DataNotFound
                    message={l("Common.GenericErrorMessageWithRetry")}
                    retry={this.props.getExhibitions}/>)
        }
        else {
            let currentAuctions : Array<any>;
            let finishedAuctions : Array<any>;
            if (exhibitionsData) {
                exhibitionsData.sort((firstExhibition: Auction, secondExhibition: Auction) => {
                    if (moment(firstExhibition.auction_start, "YYYY/MM/DD HH:mm")
                        .isBefore(moment(secondExhibition.auction_start, "YYYY/MM/DD HH:mm"))) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
                let today = moment("2017-09-01", "YYYY-MM-DD");
                currentAuctions = exhibitionsData.filter(exhibition => {
                    return !moment(exhibition.auction_start, "YYYY/MM/DD HH:mm").isBefore(today);
                });
                finishedAuctions = exhibitionsData.filter(exhibition => {
                    return moment(exhibition.auction_start, "YYYY/MM/DD HH:mm").isBefore(today);
                });
            }
            return (
                <AppContainer style={{
                    flex: 1,
                    backgroundColor: DirtyWhite,
                }}>
                    <TabView
                        style={{flex: 1}}
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
                indicatorStyle={{...props.indicatorStyle, backgroundColor: Yellow }}
                labelStyle={{...props.labelStyle, fontFamily: DefaultAppFont, color: Black}}
                style={{...props.style, backgroundColor: White, color: Black}}
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

    private renderAuction = ({ item, index } : { item : Auction, index : number }) => {
        return <View style={{
                marginBottom: 30,
            }}>
            <FadeIn style={styles.artworkFullResImage} renderPlaceholderContent={(<Image style={{flex: 1}} source={{uri: item.image_thumbnail}}  blurRadius={2}/>)}>
                <Image style={styles.artworkFullImage} source={{uri: item.image_original}}/>
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
                <ViewMoreText numberOfLines={5} renderViewMore={() => {}}>
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
