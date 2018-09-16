import { NativeModules } from 'react-native'

export const IsDebug = NativeModules.ConfigModule.IS_DEBUG as boolean;
export const backend_api_url = (IsDebug == true ? "http://127.0.0.1" : "http://pragaleriabackend-env.eav5gsaju6.us-east-2.elasticbeanstalk.com") as string;
