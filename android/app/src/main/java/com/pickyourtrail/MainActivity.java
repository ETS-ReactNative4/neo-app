package com.pickyourtrail;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.content.Intent;
import com.zoontek.rnbootsplash.RNBootSplash;

import io.branch.rnbranch.*;
import android.content.Intent;

/**
 * Imports for react navigation gesture handler
 */
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      RNBootSplash.show(R.drawable.bootsplash, MainActivity.this); // <- display the "bootsplash" xml view over our MainActivity
    }

    @Override
    public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      setIntent(intent);
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

    // Method created for React Native Branch integration
    @Override
    protected void onStart() {
      super.onStart();
      RNBranchModule.initSession(getIntent().getData(), this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Pickyourtrail";
    }
}
