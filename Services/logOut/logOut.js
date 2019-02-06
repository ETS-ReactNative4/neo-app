import * as Keychain from "react-native-keychain";
import { DrawerActions } from "react-navigation";
import navigationService from "../navigationService/navigationService";
import storeService from "../storeService/storeService";

const closeDrawer = DrawerActions.closeDrawer();

const logOut = (isForced = false) => {
  const { navigation } = navigationService;
  navigation.dispatch(closeDrawer);

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
        storeService.tripFeedStore.reset();
      }, 100);
    });
  };

  if (!isForced) {
    storeService.appState.removePushToken(logOutActionQueue);
  } else {
    logOutActionQueue();
  }
};

export default logOut;
