import { NativeModules } from 'react-native'

export const IsDebug = NativeModules.ConfigModule.IS_DEBUG as boolean;

// For debug api replace with your ip, https://github.com/facebook/react-native/issues/10404#issuecomment-267303151
export const BaseAddress: string = (IsDebug == true ?
    "http://192.168.0.105/api" :
    "http://pragaleriabackend-env.eav5gsaju6.us-east-2.elasticbeanstalk.com");

