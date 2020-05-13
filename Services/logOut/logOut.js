import * as Keychain from "react-native-keychain";
import storeService from "../storeService/storeService";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import constants from "../../constants/constants";
import { logoutUserFromChat } from "../freshchatService/freshchatService";
import { logError } from "../errorLogger/errorLogger";
import { navigationDispatcher } from "../navigationService/navigationServiceV2";
import logOutAction from "./logOutAction/logOutAction";
import appStartupTasks from "../appStartupTasks/appStartupTasks";

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
          try {
            storeService[each].reset();
          } catch (e) {
            logError(`Missing reset action in ${each}`, { e });
          }
        }
        logoutUserFromChat();
        appStartupTasks();
        navigationDispatcher(logOutAction());
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
