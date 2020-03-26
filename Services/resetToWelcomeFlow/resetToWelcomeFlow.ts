import { CommonActions } from "@react-navigation/native";
import {
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS
} from "../../NavigatorsV2/ScreenNames";
import storeService from "../storeService/storeService";
import launchPretripHome from "../launchPretripHome/launchPretripHome";

/**
 * Used for first app launch of the user to show the welcome flow to the user
 */
const resetToWelcomeFlow = (): Promise<CommonActions.Action> => {
  return new Promise<CommonActions.Action>(resolve => {
    const errorHandler = () =>
      resolve(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_TRAVEL_PROFILE_WELCOME
            }
          ]
        })
      );

    const openWelcomeScreen = () =>
      resolve(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_TRAVEL_PROFILE_WELCOME
            }
          ]
        })
      );

    const openCountryPicker = () =>
      resolve(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_TRAVEL_COUNTRY_PICKER
            }
          ]
        })
      );

    const openMaritalStatus = () =>
      resolve(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: SCREEN_TRAVEL_MARITAL_STATUS
            }
          ]
        })
      );

    const flowSkipped = () => resolve(launchPretripHome());

    storeService.welcomeStateStore
      .loadWelcomeState()
      .then(isWelcomeStateLoaded => {
        if (isWelcomeStateLoaded) {
          if (storeService.welcomeStateStore.skippedAt) {
            flowSkipped();
          } else if (!storeService.welcomeStateStore.seenWelcomeScreen) {
            openWelcomeScreen();
          } else if (!storeService.welcomeStateStore.seenTravelCountryPicker) {
            openCountryPicker();
          } else if (!storeService.welcomeStateStore.seenMaritalStatus) {
            openMaritalStatus();
          } else {
            flowSkipped();
          }
        } else {
          errorHandler();
        }
      })
      .catch(errorHandler);
  });
};

export default resetToWelcomeFlow;
