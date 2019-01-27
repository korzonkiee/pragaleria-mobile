import moment = require("moment");
import { NativeModules } from 'react-native';
export const IsDebug = NativeModules.ConfigModule.IS_DEBUG as boolean;

export module TimeProvider {
    export function now() {
        if (IsDebug)
            return moment().subtract(6, "months");
        return moment();
    }
}
