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
import { ExhibitionsTabBar } from '../../Components/ExhibitionsTabBar';
import ExhibitionsPlaceholder from '../../Components/Placeholders/ExhibitionsPlaceholder';


export interface ExhibitionsProps {
    readonly exhibitions: ExhibitionsData;
    readonly getExhibitions: () => void;
}

export class Exhibitions extends Component<ExhibitionsProps & Nav.NavigationInjectedProps> {
    constructor(props: ExhibitionsProps & Nav.NavigationInjectedProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.exhibitions.loading) {
            this.props.getExhibitions();
        }
    }

    render() {
        const exhibitionsData = this.props.exhibitions.data;
        if (this.props.exhibitions.loading) {
            return <ExhibitionsPlaceholder />
        }

        if (!this.props.exhibitions.loading && this.props.exhibitions.data.length === 0) {
            return (<DataNotFound
                message={l("Common.GenericErrorMessageWithRetry")}
                retry={this.props.getExhibitions} />)
        }

        const incomingExhibitions = exhibitionsData.filter(exhibition => {
            return !exhibition.is_past;
        });

        const closedExhibitions = exhibitionsData.filter(exhibition => {
            return exhibition.is_past;
        });

        return (
            <AppContainer style={{
                flex: 1,
                backgroundColor: DirtyWhite,
            }}>
                <ExhibitionsTabBar navigation={this.props.navigation}
                    incomingExhibitions={incomingExhibitions}
                    closedExhibitions={closedExhibitions} />
            </AppContainer>
        )
    }
}
