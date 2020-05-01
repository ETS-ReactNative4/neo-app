import createGuestSession from "./tasks/createGuestSession";
import enableAnalyticsInProd from "./tasks/enableAnalyticsInProd";
import enableLayoutAnimationAndroid from "./tasks/enableLayoutAnimationAndroid";
import { getDeviceToken } from "../fcmService/fcm";

/**
 * When the App Launches there's a bunch of things that needs to happen,
 * So all of them will be running here.
 *
 * Best keep them in a debouncer.
 */
const appStartupTasks = () => {
  enableLayoutAnimationAndroid();

  enableAnalyticsInProd();

  createGuestSession().then(result => {
    if (result) {
      getDeviceToken();
    }
  });
};

export default appStartupTasks;
