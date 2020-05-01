import navigationServiceV2, {
  navigationDispatcher
} from "../navigationService/navigationServiceV2";
import isUserLoggedIn from "../isUserLoggedIn/isUserLoggedIn";
import { SCREEN_STARTER } from "../../NavigatorsV2/ScreenNames";
import hasUpcomingTrips from "./launchCheckpoints/hasUpcomingTrips";
import isPreTripWelcomePending from "./launchCheckpoints/isPreTripWelcomePending";
import resetToWelcomeFlow from "../resetToWelcomeFlow/resetToWelcomeFlow";
import launchPretripHome from "../launchPretripHome/launchPretripHome";
import launchPostBooking from "../launchPostBooking/launchPostBooking";
import getSelectedItineraryId from "../getSelectedItineraryId/getSelectedItineraryId";
import isPreTripWelcomeCompleted from "./launchCheckpoints/isPreTripWelcomeCompleted";

const delayedResolver = (resolve: (arg: boolean) => any) => {
  setTimeout(() => resolve(true), 300);
};

const appLauncherV2 = (): Promise<boolean> => {
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
                launchPostBooking(getSelectedItineraryId()).finally(() => {
                  delayedResolver(resolve);
                });
              } else {
                /**
                 * No upcoming trips go to the state saver based welcome flow
                 */
                isPreTripWelcomeCompleted().then(isWelcomeComplete => {
                  if (isWelcomeComplete) {
                    navigationDispatcher(launchPretripHome());
                    delayedResolver(resolve);
                  } else {
                    isPreTripWelcomePending().then(isWelcomePending => {
                      if (isWelcomePending) {
                        resetToWelcomeFlow().then(resetAction => {
                          navigationDispatcher(resetAction);
                          delayedResolver(resolve);
                        });
                      } else {
                        navigationServiceV2(SCREEN_STARTER);
                        delayedResolver(resolve);
                      }
                    });
                  }
                });
              }
            })
            .catch(reject);
        } else {
          /**
           * User not logged in -> use the state saver api flow (show starter screen & take it from there)
           */
          navigationServiceV2(SCREEN_STARTER);
          delayedResolver(resolve);
        }
      })
      .catch(reject);
  });
};

export default appLauncherV2;
