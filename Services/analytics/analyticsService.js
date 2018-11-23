import { analytics } from "react-native-firebase";
import { logError } from "../errorLogger/errorLogger";

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

export const recordEvent = (event, params) => {
  if (!reserved.includes(event)) {
    analytics().logEvent(event, params);
  } else {
    logError(`Invalid analytics event ${event}`, { params });
  }
};

export const enableAnalytics = () =>
  analytics().setAnalyticsCollectionEnabled(true);

export const disableAnalytics = () =>
  analytics().setAnalyticsCollectionEnabled(false);

export const setUserDetails = ({ id, name, email, phoneNumber }) => {
  analytics().setUserId(id);
  analytics().setUserProperty({ name, email, phoneNumber });
};
