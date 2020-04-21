import * as Keychain from "react-native-keychain";
import storeService from "../storeService/storeService";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import constants from "../../constants/constants";
import RNRestart from "react-native-restart";
import { logoutUserFromChat } from "../freshchatService/freshchatService";

const logOut = (isForced = false) => {
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
      setTimeout(() => {
        for (const each in storeService) {
          storeService[each].reset && storeService[each].reset();
        }
        logoutUserFromChat();
        RNRestart.Restart();
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
