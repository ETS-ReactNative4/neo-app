package com.pickyourtrail;

import android.app.Application;
import com.facebook.react.PackageList;

import com.facebook.react.ReactApplication;
import com.webengage.WebengagePackage;
import com.webengage.sdk.android.WebEngageConfig;
import com.webengage.sdk.android.WebEngageActivityLifeCycleCallbacks;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
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
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
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
