import AsyncStorage from "@react-native-community/async-storage";
import isUserLoggedInCallback from "../isUserLoggedInCallback/isUserLoggedInCallback";
import constants from "../../constants/constants";
import navigationService from "../navigationService/navigationService";
import { NavigationActions } from "react-navigation";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";

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
