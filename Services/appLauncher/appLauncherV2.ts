import navigationServiceV2, {
  navigationDispatcher
} from "../navigationService/navigationServiceV2";
import isUserLoggedIn from "../isUserLoggedIn/isUserLoggedIn";
import { SCREEN_STARTER } from "../../NavigatorsV2/ScreenNames";
import hasUpcomingTrips from "./launchCheckpoints/hasUpcomingTrips";
import isPreTripWelcomePending from "./launchCheckpoints/isPreTripWelcomePending";
import resetToWelcomeFlow from "../resetToWelcomeFlow/resetToWelcomeFlow";
import launchPretripHome from "../launchPretripHome/launchPretripHome";
// import * as Keychain from "react-native-keychain";

const appLauncherV2 = () => {
  // Keychain.resetGenericPassword()
  return new Promise<boolean>((resolve, reject) => {
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
                resolve();
              } else {
                /**
                 * No upcoming trips go to the state saver based welcome flow
                 */
                isPreTripWelcomePending().then(isWelcomePending => {
                  if (isWelcomePending) {
                    resetToWelcomeFlow().then(resetAction => {
                      navigationDispatcher(resetAction);
                      setTimeout(() => resolve(), 100);
                    });
                  } else {
                    navigationDispatcher(launchPretripHome());
                    setTimeout(() => resolve(), 100);
                  }
                });
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
