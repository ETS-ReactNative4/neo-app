import * as Keychain from "react-native-keychain";
import {
  StackActions,
  NavigationActions,
  DrawerActions
} from "react-navigation";
import { setUserContext } from "../errorLogger/errorLogger";
import navigationService from "../navigationService/navigationService";
import storeService from "../storeService/storeService";

// const resetToSplash = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "Splash" })],
//   key: null
// });

const closeDrawer = DrawerActions.closeDrawer();

const logOut = (isForced = false) => {
  const { navigation } = navigationService;

  const logOutActionQueue = () => {
    Keychain.resetGenericPassword().then(() => {
      navigation._navigation.navigate("Splash");

      setTimeout(() => {
        storeService.appState.reset();
        storeService.emergencyContactsStore.reset();
        storeService.itineraries.reset();
        storeService.packingChecklistStore.reset();
        storeService.passportDetailsStore.reset();
        storeService.phrasesStore.reset();
        storeService.placesStore.reset();
        storeService.supportStore.reset();
        storeService.userStore.reset();
        storeService.visaStore.reset();
        storeService.voucherStore.reset();
        storeService.weatherStore.reset();
        storeService.yourBookingsStore.reset();
      }, 100);
    });
  };

  navigation.dispatch(closeDrawer);
  if (!isForced) {
    storeService.appState.removePushToken(logOutActionQueue);
  } else {
    logOutActionQueue();
  }

  /**
   * TODO: Clear sentry user context
   * setUserContext();
   */
};

export default logOut;
