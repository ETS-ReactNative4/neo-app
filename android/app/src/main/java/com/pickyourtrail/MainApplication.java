package com.pickyourtrail;

import android.app.Application;
//import android.content.Context;
//import android.util.Log;
import com.facebook.react.PackageList;
//import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
//import com.facebook.react.bridge.JavaScriptExecutorFactory;
// import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.webengage.WebengagePackage;
import com.webengage.sdk.android.WebEngageConfig;
import com.webengage.sdk.android.WebEngageActivityLifeCycleCallbacks;
//import cl.json.RNSharePackage;
//import com.airbnb.android.react.lottie.LottiePackage;
//import com.reactnative.ivpusic.imagepicker.PickerPackage;
//import com.reactnativecommunity.cameraroll.CameraRollPackage;
//import com.learnium.RNDeviceInfo.RNDeviceInfo;
//import org.wonday.pdf.RCTPdfView;
//import com.RNFetchBlob.RNFetchBlobPackage;
//import com.reactnative.photoview.PhotoViewPackage;
//import com.reactnativecommunity.webview.RNCWebViewPackage;
//import com.avishayil.rnrestart.ReactNativeRestartPackage;
//import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
//import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
//import com.zmxv.RNSound.RNSoundPackage;
//import com.dylanvann.fastimage.FastImageViewPackage;
//import com.krazylabs.OpenAppSettingsPackage;
//import net.no_mad.tts.TextToSpeechPackage;
//import io.sentry.RNSentryPackage;
//import com.horcrux.svg.SvgPackage;
//import com.oblador.keychain.KeychainPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.webengage.sdk.android.WebEngage;

import com.google.firebase.messaging.FirebaseMessagingService;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      /**
       * Old package linking code
       */
      // return Arrays.<ReactPackage>asList(
      //     new MainReactPackage(),
      //       new RNSharePackage(),
      //       new LottiePackage(),
      //       new PickerPackage(),
      //       new CameraRollPackage(),
      //       new RNDeviceInfo(),
      //       new RNFetchBlobPackage(),
      //       new RCTPdfView(),
      //       new PhotoViewPackage(),
      //       new RNCWebViewPackage(),
      //       new ReactNativeRestartPackage(),
      //       new CustomTabsPackage(),
      //       new RNSoundPackage(),
      //       new FastImageViewPackage(),
      //       new OpenAppSettingsPackage(),
      //       new TextToSpeechPackage(),
      //       new RNSentryPackage(),
      //       new SvgPackage(),
      //       new KeychainPackage(),
      //       new LinearGradientPackage()
      // );
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      // packages.add(new RNFirebasePackage());
      packages.add(new RNFirebaseMessagingPackage());
      packages.add(new RNFirebaseNotificationsPackage());
      packages.add(new RNFirebaseAnalyticsPackage());
      return packages;
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
    WebEngageConfig webEngageConfig = new WebEngageConfig.Builder()
      .setWebEngageKey("~2024b387")
      .setDebugMode(true) // only in development mode
      .build();
    registerActivityLifecycleCallbacks(new WebEngageActivityLifeCycleCallbacks(this, webEngageConfig));
    try {
      FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(new OnSuccessListener<InstanceIdResult>() {
        @Override
        public void onSuccess(InstanceIdResult instanceIdResult) {
          String token = instanceIdResult.getToken();
          WebEngage.get().setRegistrationID(token);
        }
      });
    } catch (Exception e) {
      // Handle exception
    }
    SoLoader.init(this, /* native exopackage */ false);
  }

  // @Override
  // protected void attachBaseContext(Context base) {
  //   super.attachBaseContext(base);
  //   MultiDex.install(this);
  // }
}
