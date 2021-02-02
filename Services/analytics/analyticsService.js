import { logBreadCrumb, logError } from "../errorLogger/errorLogger";
import getActiveRouteName from "../getActiveRouteName/getActiveRouteName";
import WebEngage from "react-native-webengage";
// import { analytics as firebaseAnalytics, perf } from "react-native-firebase";
import analytics  from '@react-native-firebase/analytics';
import perf from '@react-native-firebase/perf';

import constants from "../../constants/constants";
import debouncer from "../debouncer/debouncer";
// import uuidv4 from "uuid/v4";
import { v4 as uuidv4 } from 'uuid';

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

const webEngage = new WebEngage();

export const login = userId => {
  webEngage.user.login(userId);
  return userId;
};

export const setWebEngageAttribute = (key, value) => {
  if (key && value) {
    webEngage.user.setAttribute(key, value);
    return true;
  }
  return false;
};

/**
 * Unique session id which will be created every time the app is launched.
 */
const sessionId = uuidv4();

export const recordEvent = (event, params = undefined) => {
  debouncer(async() => {
    if (!reserved.includes(event)) {
      if (!params) {
        params = { sessionId };
      } else if (typeof params === "object" && params !== null) {
        params = { ...params, sessionId };
      } else {
        logError(
          `Invalid analytics parameter ${
            params === null ? "null" : typeof param
          }`,
          {
            event,
            params
          }
        );
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
      webEngage.track(event, params);
      await analytics().logEvent(event, params);
    } else {
      logError(`Invalid analytics event ${event}`, { params });
    }
  });
};

export const enableAnalytics = async () => {
  debouncer(async () => {
    try {
      await analytics().setAnalyticsCollectionEnabled(true);
      perf().setPerformanceCollectionEnabled(true);
      return true;
    } catch (error) {
      logError("Failed to enable analytics", { error });
      return false;
    }
  });
};

export const disableAnalytics = async () => {
  debouncer(async () => {
    try {
      await analytics().setAnalyticsCollectionEnabled(false);
      perf().setPerformanceCollectionEnabled(false);
      return true;
    } catch (error) {
      logError("Failed to disable analytics", { error });
      return false;
    }
  });
};

export const setUserDetails = async ({ id, name, email, phoneNumber }) => {
  debouncer(async() => {
    try {
      login(id);
      await analytics().setUserId(id);
      await analytics().setUserProperties({ name, email, phoneNumber });
      webEngage.user.setEmail(email);
      webEngage.user.setPhone(phoneNumber);
      webEngage.user.setFirstName(name);
      return true;
    } catch (error) {
      logError(error, {
        type: "Failed to record user in analytics"
      });
      return false;
    }
  });
};

export const setUserAttributes = (key, value) => {
  debouncer(() => {
    return setWebEngageAttribute(key, value);
  });
};

export const screenTracker = (prevState, currentState) => {
  debouncer(async() => {
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
      webEngage.screen(currentScreen, { sessionId });
      await analytics().setCurrentScreen(currentScreen, currentScreen);
      return true;
    }
    return false;
  });
};

/**
 * New screen tracker compatible with React Navigation 5
 * accepts prev screen & current screen as strings
 */
export const screenTrackerV2 = async (prevScreen, currentScreen) => {
  if (prevScreen !== currentScreen) {
    logBreadCrumb({
      message: `${prevScreen} to ${currentScreen}`,
      category: constants.errorLoggerEvents.categories.navigation,
      data: {},
      level: constants.errorLoggerEvents.levels.info
    });
    webEngage.screen(currentScreen, { sessionId });
    await analytics().setCurrentScreen(currentScreen, currentScreen);
    return true;
  }
  return false;
};
