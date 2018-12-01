import React from 'react';
import {Provider} from 'react-redux';
import {Component} from 'react'
import * as Routes from './Routes';
import * as colors from './Resources/Colors';
import { store } from './Store';
import { createStackNavigator } from 'react-navigation';
import { l } from './Services/Language';
import About from './Pages/About';
import Auctions from './Pages/Auctions';
import Artists from './Pages/Artists';
import Camera from './Pages/Camera';
import Exhibitions from './Pages/Exhibitions';
import SplashScreen from 'react-native-splash-screen'
import {responsiveFontSize} from './Styles/Dimensions';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ArtistDetails from './Pages/Artists/ArtistDetails';
import ArtworkDetails from './Pages/ArtworkDetails';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AppText from './Components/AppText';
const BottomIcon = (name: string) => <Icon name={name} size={responsiveFontSize(3.3 * 9.5 / 10.3)} color={colors.LightGray} />;

const MainStack = createMaterialBottomTabNavigator({
  [Routes.auctions]: {
    screen: Auctions,
    navigationOptions: {
      tabBarLabel: <AppText style={{fontSize: responsiveFontSize(1.5), color: colors.LightGray}} >{l("BottomNavigation.Auctions")}</AppText>,
      tabBarIcon: BottomIcon("tag"),
      tabBarColor: colors.Black
    }
  },
  [Routes.exhibitions]: {
    screen: Exhibitions,
    navigationOptions: {
      tabBarLabel: <AppText style={{fontSize: responsiveFontSize(1.5), color: colors.LightGray}} >{l("BottomNavigation.Exhibitions")}</AppText>,
      tabBarIcon: BottomIcon("event"),
      tabBarColor: colors.Black
    }
  },
  [Routes.artists]: {
    screen: Artists,
    navigationOptions: {
      tabBarLabel: <AppText style={{fontSize: responsiveFontSize(1.5), color: colors.LightGray}}>{l("BottomNavigation.Artists")}</AppText>,
      tabBarIcon: BottomIcon("eyeglass"),
      tabBarColor: colors.Black
    }
  },
  [Routes.about]: {
    screen: About,
    navigationOptions: {
      tabBarLabel: <AppText style={{fontSize: responsiveFontSize(1.5), color: colors.LightGray}} >{l("BottomNavigation.About")}</AppText>,
      tabBarIcon: BottomIcon("info"),
      tabBarColor: colors.Black
    }
  },
}, {
  initialRouteName: Routes.about,
  labeled: true
});

const AppNavigator = createStackNavigator({
    ["Main"]: MainStack,
    [Routes.artistDetails]: ArtistDetails,
    [Routes.artworkDetails]: ArtworkDetails,
    [Routes.camera]: Camera,
}, {
    initialRouteName: "Main",
    headerMode: "none"
});

export default class App extends Component<{}> {
    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}
