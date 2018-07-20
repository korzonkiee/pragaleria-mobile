import React from 'react';
import { Provider } from 'react-redux';
import { Component } from 'react'
import { Platform, StyleSheet, Text } from 'react-native';
import { store } from './Store';
import Home from './Pages/Home';
import { createDrawerNavigator } from 'react-navigation';

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: Home,

  }
})

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
