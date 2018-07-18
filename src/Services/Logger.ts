import { NativeModules } from "react-native";

interface Bugfender {
    LOG_LEVEL_DEBUG: string;
    LOG_LEVEL_WARNING: string;
    LOG_LEVEL_ERROR: string;

    logDebug(tag: string, message: string): void;
    logWarning(tag: string, message: string): void;
    logError(tag: string, message: string): void;

    enableCrashReporting(): void;
    forceSendOnce(): void;
    getDeviceIdentifier(): string;
    getSessionIdentifier(): string;
    log(lineNumber: number, method: string, file: string, logLevel: string, tag: string, message: string): void;
    removeDeviceKey(key: string): void;
    sendIssue(title: string, text: string): string;
    setApiUrl(url: string): void;
    setDeviceBoolean(key: string, value: boolean): void;
    setDeviceFloat(key: string, value: number): void;
    setDeviceInteger(key: string, value: number): void;
    setDevicestring(key: string, value: string): void;
    setForceEnabled(enabled: boolean): void;
    setMaximumLocalStorageSize(bytes: number): void;
}

export default NativeModules.BugfenderModule as Bugfender;
