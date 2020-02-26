import * as Keychain from "react-native-keychain";
import navigationService from "../navigationService/navigationService";
import storeService from "../storeService/storeService";
import Drawer from "../../Screens/Drawer/Drawer";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import constants from "../../constants/constants";
import { logoutUserFromChat } from "../freshchatService/freshchatService";

/**
 * No more Drawer navigators! 🎉
 */
const closeDrawer = () => null;

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
        for (const each in storeService) {
          storeService[each].reset && storeService[each].reset();
        }
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
