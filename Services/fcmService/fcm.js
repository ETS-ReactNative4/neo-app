import { messaging } from "react-native-firebase";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";

export const getDeviceToken = async () => {
  let token;
  try {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      token = await messaging().getToken();
    } else {
      try {
        await messaging().requestPermission();
        token = await messaging().getToken();
      } catch (e) {
        // TODO: user refused permission
      }
    }
    // storeService.appState.setPushTokens(token);
  } catch (err) {
    logError(err);
  }
};

export const registerFcmRefreshListener = () => {
  messaging().onTokenRefresh(token => {
    // storeService.appState.setPushTokens(token);
  });
};
