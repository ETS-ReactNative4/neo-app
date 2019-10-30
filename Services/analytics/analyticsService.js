import analytics from "@segment/analytics-react-native";
import { logBreadCrumb, logError } from "../errorLogger/errorLogger";
import getActiveRouteName from "../getActiveRouteName/getActiveRouteName";
import { analytics as firebaseAnalytics, perf } from "react-native-firebase";
import constants from "../../constants/constants";
import debouncer from "../debouncer/debouncer";
import WebEngage from "react-native-webengage";
import uuidv4 from "uuid/v4";

const webEngage = new WebEngage();

/**
 * Firebase reserved events list. These events should not be tracked
 */
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

/**
 * Unique session id which will be created every time the app is launched.
 */
const sessionId = uuidv4();

export const recordEvent = (event, params = undefined) => {
  debouncer(() => {
    if (!reserved.includes(event)) {
      if (!params) {
        params = { sessionId };
      } else if (typeof params === "object") {
        params = { ...params, sessionId };
      } else {
        logError(`Invalid analytics parameter ${typeof param}`, {
          event,
          params
        });
        return;
      }
      logBreadCrumb({
        message: constants.errorLoggerEvents.messages.analyticsEvent,
        category: constants.errorLoggerEvents.categories.analytics,
        data: {
          event: event || "",
          params: params || ""
        },
        level: constants.errorLoggerEvents.levels.info
      });
      firebaseAnalytics().logEvent(event, params);
      analytics.track(event, params);
    } else {
      logError(`Invalid analytics event ${event}`, { params });
    }
  });
};

export const enableAnalytics = () => {
  debouncer(async () => {
    try {
      await analytics.setup(constants.segmentWriteKey, {
        recordScreenViews: false,
        trackAppLifecycleEvents: true
      });
      await analytics.enable();
      firebaseAnalytics().setAnalyticsCollectionEnabled(true);
      perf().setPerformanceCollectionEnabled(true);
    } catch (error) {
      logError("Failed to enable analytics", { error });
    }
  });
};

export const disableAnalytics = () => {
  debouncer(async () => {
    try {
      firebaseAnalytics().setAnalyticsCollectionEnabled(false);
      perf().setPerformanceCollectionEnabled(false);
      await analytics.disable();
    } catch (error) {
      logError("Failed to disable analytics", { error });
    }
  });
};

export const setUserDetails = ({ id, name, email, phoneNumber }) => {
  debouncer(() => {
    analytics.identify(id, {
      name,
      email,
      phone: phoneNumber
    });
    webEngage.user.login(id);
    firebaseAnalytics().setUserId(id);
    firebaseAnalytics().setUserProperties({ name, email, phoneNumber });
  });
};

export const setUserAttributes = (key, value) => {
  debouncer(() => {
    if (key && value) {
      webEngage.user.setAttribute(key, value);
    }
  });
};

export const screenTracker = (prevState, currentState) => {
  debouncer(() => {
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
      analytics.screen(currentScreen, { sessionId });
      webEngage.screen(currentScreen, { sessionId });
      firebaseAnalytics().setCurrentScreen(currentScreen, currentScreen);
    }
  });
};
