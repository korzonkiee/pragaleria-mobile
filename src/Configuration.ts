import { NativeModules } from 'react-native'

export const IsDebug = NativeModules.ConfigModule.IS_DEBUG as boolean;
