import navigationServiceV2 from "../navigationService/navigationServiceV2";
import isUserLoggedIn from "../isUserLoggedIn/isUserLoggedIn";
import { SCREEN_STARTER } from "../../NavigatorsV2/ScreenNames";
import hasUpcomingTrips from "./launchCheckpoints/hasUpcomingTrips";

const appLauncherV2 = () => {
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
                 * No upcoming trips go to the state saver flow
                 */
                resolve();
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
