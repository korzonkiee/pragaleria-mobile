import { NativeModules } from 'react-native';

export const IsDebug = NativeModules.ConfigModule.IS_DEBUG as boolean;

// For debug api replace with your ip, https://github.com/facebook/react-native/issues/10404#issuecomment-267303151
export const BaseAddress: string = IsDebug ? "http://192.168.0.213/api" : "http://167.99.246.28/api"
