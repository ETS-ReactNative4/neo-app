package com.pickyourtrail;

import android.app.Application;
import android.content.Context;
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
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.webengage.sdk.android.WebEngage;

import com.google.firebase.messaging.FirebaseMessagingService;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;

import com.wix.interactable.Interactable;

import androidx.multidex.MultiDexApplication;
import io.branch.rnbranch.RNBranchModule;

public class MainApplication extends MultiDexApplication implements ReactApplication {

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
      packages.add(new RNFirebasePerformancePackage());
      packages.add(new Interactable());
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
    RNBranchModule.getAutoInstance(this);
    WebEngageConfig webEngageConfig = new WebEngageConfig.Builder()
      .setWebEngageKey("~2024b387")
      .setDebugMode(false) // true - only in development mode
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
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

}
