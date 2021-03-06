import createGuestSession from "./tasks/createGuestSession";
import enableAnalyticsInProd from "./tasks/enableAnalyticsInProd";
import enableLayoutAnimationAndroid from "./tasks/enableLayoutAnimationAndroid";
import { getDeviceToken } from "../fcmService/fcm";
import isUserLoggedIn from "../isUserLoggedIn/isUserLoggedIn";
import enableDeepLinking from "./tasks/enableDeepLinking";
import setUserSegment from "../setUserSegment/setUserSegment";
import setDeviceLocale from "./tasks/setDeviceLocale";
import loadUserDetails from "./tasks/loadUserDetails";

/**
 * When the App Launches there's a bunch of things that needs to happen,
 * So all of them will be running here.
 *
 * Best keep them in a debouncer.
 */
const appStartupTasks = () => {
  enableLayoutAnimationAndroid();

  setDeviceLocale();

  enableAnalyticsInProd();

  enableDeepLinking();

  setUserSegment();

  loadUserDetails();

  createGuestSession()
    .then(result => {
      if (result) {
        getDeviceToken();
      }
    })
    .catch(() => null);

  isUserLoggedIn()
    .then(result => {
      if (result) {
        getDeviceToken();
      }
    })
    .catch(() => null);
};

export default appStartupTasks;
