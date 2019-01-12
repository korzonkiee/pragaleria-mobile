import { NativeModules } from 'react-native';

export const IsDebug = NativeModules.ConfigModule.IS_DEBUG as boolean;

// For debug api replace with your ip, https://github.com/facebook/react-native/issues/10404#issuecomment-267303151
export const BaseAddress: string = "http://167.99.246.28/api"
