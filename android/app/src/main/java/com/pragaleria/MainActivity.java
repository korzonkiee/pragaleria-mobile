package com.pragaleria;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

import net.hockeyapp.android.CrashManager;
import net.hockeyapp.android.UpdateManager;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "pragaleria";
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!"debug".equals(BuildConfig.BUILD_TYPE)) {
            UpdateManager.register(this);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        CrashManager.register(this);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (!"debug".equals(BuildConfig.BUILD_TYPE)) {
            UpdateManager.unregister();
        }
    }
}
