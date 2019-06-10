package com.pickyourtrail;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactnativecommunity.cameraroll.CameraRollPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.krazylabs.OpenAppSettingsPackage;
import net.no_mad.tts.TextToSpeechPackage;
import io.sentry.RNSentryPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.keychain.KeychainPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
            new PickerPackage(),
            new CameraRollPackage(),
            new RNDeviceInfo(),
            new RNFetchBlobPackage(),
            new RCTPdfView(),
            new PhotoViewPackage(),
            new RNCWebViewPackage(),
            new ReactNativeRestartPackage(),
            new CustomTabsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseAnalyticsPackage(),
            new RNSoundPackage(),
            new FastImageViewPackage(),
            new OpenAppSettingsPackage(),
            new TextToSpeechPackage(),
            new RNSentryPackage(),
            new SvgPackage(),
            new KeychainPackage(),
            new LinearGradientPackage()
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
  }
}
