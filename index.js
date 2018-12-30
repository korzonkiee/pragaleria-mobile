/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

YellowBox.ignoreWarnings(['Remote debugger']);
AppRegistry.registerComponent(appName, () => App);
