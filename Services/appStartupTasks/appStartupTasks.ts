import { UIManager, Platform } from "react-native";
import { isProduction } from "../getEnvironmentDetails/getEnvironmentDetails";
import {
  enableAnalytics,
  disableAnalytics
} from "../analytics/analyticsService";
import { CONSTANT_platformAndroid } from "../../constants/stringConstants";
import isGuestSessionAvailable from "../isGuestSessionAvailable/isGuestSessionAvailable";
import guestSessionLogin from "../guestSessionLogin/guestSessionLogin";

/**
 * When the App Launches there's a bunch of things that needs to happen,
 * So all of them will be running here.
 *
 * Best keep them in a debouncer.
 */

const appStartupTasks = () => {
  if (Platform.OS === CONSTANT_platformAndroid) {
    UIManager?.setLayoutAnimationEnabledExperimental(true);
  }

  if (!__DEV__ && isProduction()) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }

  isGuestSessionAvailable().then(result => {
    if (!result) {
      /**
       * Guest session
       */
      guestSessionLogin()
        .then(loginResult => {
          if (!loginResult) {
            /**
             * PT TODO: Failed to create guest session. Needs to be handled
             */
          } else {
            /*
             * PT TODO: Guest account created currently no action needed
             */
          }
        })
        .catch(() => {
          /**
           * PT TODO: Failed to create guest session. Needs to be handled
           */
        });
    }
  });
};

export default appStartupTasks;
