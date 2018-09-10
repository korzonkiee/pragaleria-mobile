package com.pragaleria;

import com.bugfender.sdk.Bugfender;
import com.bugfender.sdk.LogLevel;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class BugfenderModule extends ReactContextBaseJavaModule {

    private final Map<String, Object> logLevels;

    public BugfenderModule(ReactApplicationContext reactContext) {
        super(reactContext);

        logLevels = new HashMap<>();
        logLevels.put("LOG_LEVEL_DEBUG", "LOG_LEVEL_DEBUG");
        logLevels.put("LOG_LEVEL_ERROR", "LOG_LEVEL_ERROR");
        logLevels.put("LOG_LEVEL_WARNING", "LOG_LEVEL_WARNING");
    }

    @Override
    public String getName() {
        return "BugfenderModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return logLevels;
    }

    @ReactMethod
    public void logDebug(String tag, String message) {
        Bugfender.log(0, "", "", LogLevel.Debug, tag, message);
    }

    @ReactMethod
    public void logWarning(String tag, String message) {
        Bugfender.log(0, "", "", LogLevel.Debug, tag, message);
    }

    @ReactMethod
    public void logError(String tag, String message) {
        Bugfender.log(0, "", "", LogLevel.Debug, tag, message);
    }

    @ReactMethod
    public void enableCrashReporting() {
        Bugfender.enableCrashReporting();
    }

    @ReactMethod
    public void forceSendOnce() {
        Bugfender.forceSendOnce();
    }

    @ReactMethod
    public String getDeviceIdentifier() {
        return Bugfender.getDeviceIdentifier();
    }

    @ReactMethod
    public String getSessionIdentifier() {
        return Bugfender.getSessionIdentifier();
    }

    @ReactMethod
    public void log(int lineNumber, String method, String file, String logLevel, String tag, String message) {
        Bugfender.log(lineNumber, method, file, toLogLevel(logLevel), tag, message);
    }

    @ReactMethod
    public void removeDeviceKey(String key) {
        Bugfender.removeDeviceKey(key);
    }

    @ReactMethod
    public String sendIssue(String title, String text) {
        return Bugfender.sendIssue(title, text).toString();
    }

    @ReactMethod
    public void setApiUrl(String url) {
        Bugfender.setApiUrl(url);
    }

    @ReactMethod
    public void setDeviceBoolean(String key, boolean value) {
        Bugfender.setDeviceBoolean(key, value);
    }

    @ReactMethod
    public void setDeviceFloat(String key, float value) {
        Bugfender.setDeviceFloat(key, value);
    }

    @ReactMethod
    public void setDeviceInteger(String key, Integer value) {
        Bugfender.setDeviceInteger(key, value);
    }

    @ReactMethod
    public void setDeviceString(String key, String value) {
        Bugfender.setDeviceString(key, value);
    }

    @ReactMethod
    public void setForceEnabled(boolean enabled) {
        Bugfender.setForceEnabled(enabled);
    }

    @ReactMethod
    public void setMaximumLocalStorageSize(long bytes) {
        Bugfender.setMaximumLocalStorageSize(bytes);
    }

    private static LogLevel toLogLevel(String val) {
        switch (val) {
        case "LOG_LEVEL_DEBUG":
            return LogLevel.Debug;

        case "LOG_LEVEL_WARNING":
            return LogLevel.Warning;

        case "LOG_LEVEL_ERROR":
            return LogLevel.Error;
        }
        return LogLevel.Debug;
    }
}
