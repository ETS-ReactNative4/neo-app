import * as Keychain from "react-native-keychain";
import { DrawerActions } from "react-navigation-drawer";
import navigationService from "../navigationService/navigationService";
import storeService from "../storeService/storeService";
import Drawer from "../../Screens/Drawer/Drawer";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import constants from "../../constants/constants";
import { logoutUserFromChat } from "../freshchatService/freshchatService";

const closeDrawer = DrawerActions.closeDrawer();

const logOut = (isForced = false) => {
  const { navigation } = navigationService;
  navigation.dispatch(closeDrawer);

  /**
   * If image upload queue is running prevent the user from logging out
   */
  const { isImageUploadQueueRunning } = storeService.journalStore;
  if (isImageUploadQueueRunning) {
    DebouncedAlert(
      constants.journalAlertMessages.logout.header,
      constants.journalAlertMessages.logout.message
    );
    return;
  }

  const logOutActionQueue = () => {
    Keychain.resetGenericPassword().then(() => {
      navigation._navigation.navigate("Splash");
      Drawer.launchApp();

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
        storeService.forexStore.reset();
        storeService.deviceDetailsStore.reset();
        storeService.chatDetailsStore.reset();
        storeService.journalStore.reset();
        storeService.userFlowTransitionStore.reset();
        logoutUserFromChat();
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
