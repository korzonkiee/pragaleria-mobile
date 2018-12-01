package com.pragaleria;

import android.app.Application;

import com.bugfender.sdk.Bugfender;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.reactlibrary.RNRearCameraCharacteristicsDisplayMetricsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new VectorIconsPackage(),
        new SplashScreenReactPackage(),
        new RNCameraPackage(),
        new RNRearCameraCharacteristicsDisplayMetricsPackage(),
        new OrientationPackage(),
        new MapsPackage(),
        new PragaleriaPackage()
        );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    Bugfender.init(this, "0996ERklnGG9OTj1URFERTBl6EOVKsjK", BuildConfig.DEBUG);
    Bugfender.enableUIEventLogging(this);
  }
}
