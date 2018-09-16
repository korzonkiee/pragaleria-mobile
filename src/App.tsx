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
import { responsiveFontSize, responsiveHeight } from './Styles/Dimensions';

const AppNavigator = createBottomTabNavigator({
  [Routes.Auctions]: {
    screen: Auctions,
    navigationOptions: {
      tabBarLabel: l("BottomNavigation.Auctions"),
      // tabBarIcon: BottomIcon("all")
    }
  },
  [Routes.Home]: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: l("BottomNavigation.Home"),
      // tabBarIcon: BottomIcon("all")
    }
  },
  [Routes.Artists]: {
    screen: Artists,
    navigationOptions: {
      tabBarLabel: l("BottomNavigation.Artists"),
      // tabBarIcon: BottomIcon("all")
    }
  },
}, {
  initialRouteName: Routes.Home,
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
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
