import analytics from "@segment/analytics-react-native";
import { logBreadCrumb, logError } from "../errorLogger/errorLogger";
import FirebaseSegment from "@segment/analytics-react-native-firebase";
import AmplitudeSegment from "@segment/analytics-react-native-amplitude";
import getActiveRouteName from "../getActiveRouteName/getActiveRouteName";
import constants from "../../constants/constants";

const reserved = [
  "app_clear_data",
  "app_uninstall",
  "app_update",
  "error",
  "first_open",
  "first_visit",
  "first_open_time",
  "first_visit_time",
  "in_app_purchase",
  "notification_dismiss",
  "notification_foreground",
  "notification_open",
  "notification_receive",
  "os_update",
  "session_start",
  "screen_view",
  "user_engagement",
  "ad_impression",
  "ad_click",
  "ad_query",
  "ad_exposure",
  "adunit_exposure",
  "ad_activeiew"
];

export const recordEvent = (event, params = undefined) => {
  if (!reserved.includes(event)) {
    if (!params) {
      analytics.track(event);
    } else {
      analytics.track(event, params);
    }
  } else {
    logError(`Invalid analytics event ${event}`, { params });
  }
};

export const enableAnalytics = async () => {
  try {
    await analytics.setup(constants.segmentWriteKey, {
      recordScreenViews: false,
      trackAppLifecycleEvents: true,
      using: [FirebaseSegment, AmplitudeSegment]
    });
  } catch (e) {
    logError(e);
  }
};

export const disableAnalytics = () => {};

export const setUserDetails = ({ id, name, email, phone }) => {
  analytics.identify(id, {
    name,
    email,
    phone
  });
};

export const screenTracker = (prevState, currentState) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);

  /**
   * TODO: Check if any data can be added here...
   */
  if (prevScreen !== currentScreen) {
    logBreadCrumb({
      message: `${prevScreen} to ${currentScreen}`,
      category: constants.errorLoggerEvents.categories.navigation,
      data: {},
      level: constants.errorLoggerEvents.levels.info
    });
    analytics.screen(currentScreen);
  }
};
