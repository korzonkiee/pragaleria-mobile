import React from 'react';
import { Provider } from 'react-redux';
import { Component } from 'react'
import * as Routes from './Routes';
import * as colors from './Resources/Colors';
import { store } from './Store';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { l } from './Services/Language';
import Home from './Pages/Home';
import Auctions from './Pages/Auctions';
import Artists from './Pages/Artists';
import SplashScreen from 'react-native-splash-screen'
import { responsiveFontSize, responsiveHeight } from './Styles/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArtistDetails from './Pages/Artists/ArtistDetails';
import ArtworkDetails from './Pages/ArtworkDetails';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AppText from './Components/AppText';
const BottomIcon = (name: string) => <Icon name={name} size={responsiveFontSize(3.3 * 9.5 / 10.3)} color="#000000" />;

const MainStack = createMaterialBottomTabNavigator({
  [Routes.auctions]: {
    screen: Auctions,
    navigationOptions: {
      tabBarLabel: <AppText>{l("BottomNavigation.Auctions")}</AppText>,
      tabBarIcon: BottomIcon("gavel")
    }
  },
  [Routes.home]: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: <AppText>{l("BottomNavigation.Home")}</AppText>,
      tabBarIcon: BottomIcon("home")
    }
  },
  [Routes.artists]: {
    screen: Artists,
    navigationOptions: {
      tabBarLabel: <AppText>{l("BottomNavigation.Artists")}</AppText>,
      tabBarIcon: BottomIcon("paint-brush")
    }
  },
}, {
  initialRouteName: Routes.artists,
  labeled: true,
  barStyle: {
    backgroundColor: "#FFFFFF",
  }
});

const AppNavigator = createStackNavigator({
  ["Main"]: MainStack,
  [Routes.artistDetails]: ArtistDetails,
  [Routes.artworkDetails]: ArtworkDetails
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
