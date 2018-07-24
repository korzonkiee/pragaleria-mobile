/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import * as config from './src/Configuration';

if (!config.IsDebug) {
    console.disableYellowBox = true;
} else {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    YellowBox.ignoreWarnings(['Class RCTCxxModule']);
}

AppRegistry.registerComponent(appName, () => App);
