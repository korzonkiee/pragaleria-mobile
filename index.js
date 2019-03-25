/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
import { IsDebug } from "./src/Configuration";


YellowBox.ignoreWarnings(['Remote debugger']);
YellowBox.ignoreWarnings(['Task orphaned']);
YellowBox.ignoreWarnings(['You should only']);
YellowBox.ignoreWarnings(['Deprecation warning']);

AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = !IsDebug;
