// import { logError } from "../errorLogger/errorLogger";
// import * as Keychain from "react-native-keychain";
import navigationServiceV2 from "../navigationService/navigationServiceV2";
import isUserLoggedIn from "../isUserLoggedIn/isUserLoggedIn";
import { SCREEN_STARTER } from "../../NavigatorsV2/ScreenNames";
import hasUpcomingTrips from "./launchCheckpoints/hasUpcomingTrips";

const appLauncherV2 = () => {
  return new Promise<boolean>((resolve, reject) => {
    // Keychain.resetGenericPassword();
    isUserLoggedIn()
      .then(isLoggedIn => {
        if (isLoggedIn) {
          /**
           * User Logged in continue to login flow
           */
          hasUpcomingTrips()
            .then(upcomingTripsStats => {
              if (upcomingTripsStats) {
                /**
                 * User Has upcoming trips go to post booking flow
                 */
              } else {
                /**
                 * No upcoming trips go to the state saver flow
                 */
              }
            })
            .catch(reject);
        } else {
          /**
           * User not logged in -> use the state saver api flow
           */
          navigationServiceV2(SCREEN_STARTER);
          resolve();
        }
      })
      .catch(reject);
  });
};

export default appLauncherV2;
