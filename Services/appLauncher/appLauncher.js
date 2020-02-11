import AsyncStorage from "@react-native-community/async-storage";
import isUserLoggedInCallback from "../isUserLoggedInCallback/isUserLoggedInCallback";
import constants from "../../constants/constants";
import navigationService from "../navigationService/navigationService";
import { NavigationActions } from "react-navigation";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";
import setUserSegment from "../setUserSegment/setUserSegment";
import hydrate from "../hydrate/hydrate";
import launchPostBooking from "../launchPostBooking/launchPostBooking";

/**
 * This promise will check if user has completed the welcome flow
 * before he moves into the post booking flow.
 *
 * Involves hydrating the state from past session hence it is asynchronous
 */
const isPostBookingWelcomePending = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      hydrate("_seenOPSIntro", storeService.userFlowTransitionStore),
      hydrate("_completedSOFeedback", storeService.userFlowTransitionStore),
      hydrate("_seenPostBookingIntro", storeService.userFlowTransitionStore),
      hydrate("_selectedItinerary", storeService.itineraries)
    ])
      .then(() => {
        const {
          completedSOFeedback,
          seenOPSIntro,
          seenPostBookingIntro
        } = storeService.userFlowTransitionStore;
        if (completedSOFeedback && seenOPSIntro && seenPostBookingIntro) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        logError(error);
        reject();
      });
  });
};

/**
 * Resets the current navigation stack to the BookedItineraryTabs
 * that has trip feed as the homepage
 */
const resetToBooked = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "BookedItineraryTabs" })
});

/**
 * Resets the current navigation stack to NewItineraryStack
 * which is the packages page
 */
const resetToPlan = NavigationActions.navigate({
  routeName: "AppHome",
  action: NavigationActions.navigate({ routeName: "NewItineraryStack" })
});

/**
 * Used to redirect the user to his home screen after he opens the app
 * Will be executed in the Drawer screen
 */
const AppLauncher = () => {
  /**
   * categorize the user into his segment
   * in the analytics service
   */
  setUserSegment();

  return new Promise(resolve => {
    const { navigation } = navigationService;
    /**
     * Check if user is logged in
     */
    isUserLoggedInCallback(
      () => {
        /**
         * Start the journal image upload queue
         * To resume image uploads from the previous session
         */
        storeService.journalStore.startImageUploadQueue();

        const openPostBookingHome = () => {
          /**
           * Check if trip toggle button is enabled
           */
          AsyncStorage.getItem(constants.tripToggleStatusStorageKey).then(
            isTripModeOn => {
              if (JSON.parse(isTripModeOn)) {
                navigation.dispatch(resetToBooked);
                resolve();
              } else {
                navigation.dispatch(resetToPlan);
                resolve();
              }
            }
          );
        };

        isPostBookingWelcomePending()
          .then(result => {
            if (result) {
              openPostBookingHome();
            } else {
              launchPostBooking(
                "SplashScreen",
                navigationService.navigation,
                storeService.itineraries.selectedItineraryId
              );
              resolve();
            }
          })
          .catch(() => {
            openPostBookingHome();
          });
      },
      () => {
        /**
         * User not logged in -> take him to starter
         */
        navigation._navigation.navigate("Starter");
        resolve();
      },
      e => {
        /**
         * Exception -> take him to starter
         */
        logError("Error while launching the app", { errorInfo: e });
        navigation._navigation.navigate("Starter");
        resolve();
      }
    );
  });
};

export default AppLauncher;
