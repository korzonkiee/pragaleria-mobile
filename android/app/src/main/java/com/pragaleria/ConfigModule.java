package com.pragaleria;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

public class ConfigModule extends ReactContextBaseJavaModule {

    private final Map<String, Object> config;

    public ConfigModule(ReactApplicationContext reactContext) {
        super(reactContext);

        config = new HashMap<>();
        config.put("APP_NAME", reactContext.getString(R.string.app_name));
        config.put("APP_BASE", reactContext.getString(R.string.app_base));
        config.put("IS_DEBUG", reactContext.getResources().getBoolean(R.bool.is_debug));
    }

    @Override
    public String getName() {
        return "ConfigModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return config;
    }
}
