package com.pragaleria;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import net.hockeyapp.android.CrashManager;
import net.hockeyapp.android.UpdateManager;
import com.reactlibrary.RNRearCameraCharacteristicsDisplayMetricsPackage;
import android.content.Intent;
import android.content.res.Configuration;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

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
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
        if (!"debug".equals(BuildConfig.BUILD_TYPE)) {
            UpdateManager.register(this);
        }
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
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

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
