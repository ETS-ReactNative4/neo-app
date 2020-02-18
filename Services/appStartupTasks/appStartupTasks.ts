import { UIManager } from "react-native";
import { isProduction } from "../getEnvironmentDetails/getEnvironmentDetails";
import {
  enableAnalytics,
  disableAnalytics
} from "../analytics/analyticsService";

/**
 * When the App Launches there's a bunch of things that needs to happen,
 * So all of them will be running here.
 *
 * Best keep them in a debouncer.
 */

const appStartupTasks = () => {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  if (!__DEV__ && isProduction()) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
};

export default appStartupTasks;
