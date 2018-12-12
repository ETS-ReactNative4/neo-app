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
        storeService.userStore.reset();
        storeService.itineraries.reset();
        storeService.appState.reset();
        storeService.yourBookingsStore.reset();
        storeService.voucherStore.reset();
        storeService.packingChecklistStore.reset();
        storeService.phrasesStore.reset();
        storeService.emergencyContactsStore.reset();
        storeService.passportDetailsStore.reset();
        storeService.visaStore.reset();
        storeService.placesStore.reset();
        storeService.supportStore.reset();
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
