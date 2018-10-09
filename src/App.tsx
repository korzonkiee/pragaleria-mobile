import React from 'react';
import { Provider } from 'react-redux';
import { Component } from 'react'
import * as Routes from './Routes';
import * as colors from './Resources/Colors';
import { store } from './Store';
import { createBottomTabNavigator } from 'react-navigation';
import { l } from './Services/Language';
import Home from './Pages/Home';
import Auctions from './Pages/Auctions';
import Artists from './Pages/Artists';
import SplashScreen from 'react-native-splash-screen'
import { responsiveFontSize, responsiveHeight } from './Styles/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
const BottomIcon = (name: string) => <Icon name={name} size={responsiveFontSize(3.3 * 9.5 / 10.3)} color="#000000" />;

const AppNavigator = createBottomTabNavigator({
  [Routes.auctions]: {
    screen: Auctions,
    navigationOptions: {
      tabBarLabel: l("BottomNavigation.Auctions"),
      tabBarIcon: BottomIcon("gavel")
    }
  },
  [Routes.home]: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: l("BottomNavigation.Home"),
      tabBarIcon: BottomIcon("home")
    }
  },
  [Routes.artists]: {
    screen: Artists,
    navigationOptions: {
      tabBarLabel: l("BottomNavigation.Artists"),
      tabBarIcon: BottomIcon("paint-brush")
    }
  },
}, {
  initialRouteName: Routes.home,
  tabBarOptions: {
      activeTintColor: colors.Main,
      activeBackgroundColor: "white",
      inactiveTintColor: colors.Main,
      inactiveBackgroundColor: "white",
      labelStyle: {
          fontSize: responsiveFontSize(1.3 * 9.5 / 10.3),
          lineHeight: responsiveFontSize(1.3 * 9.5 / 10.3),
          marginBottom: responsiveHeight(1.2 * 5.5 / 10.3)
      },
      style: {
          height: Math.min(responsiveHeight(8.5), 57.5),
          backgroundColor: "white",
          borderTopWidth: 0,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowColor: "black",
          shadowOffset: { height: 3, width: 0 },
          elevation: 20
      }
  }
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
