import { messaging } from "react-native-firebase";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";

export const getDeviceToken = async (
  success = () => null,
  rejected = () => null,
  failure = () => null
) => {
  let token;
  try {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      token = await messaging().getToken();
      storeService.appState.setPushTokens(token);
      success(token);
    } else {
      try {
        await messaging().requestPermission();
        token = await messaging().getToken();
        storeService.appState.setPushTokens(token);
        success(token);
      } catch (e) {
        rejected(e);
      }
    }
  } catch (err) {
    failure(err);
    logError(err);
  }
};

export const registerFcmRefreshListener = () => {
  messaging().onTokenRefresh(token => {
    storeService.appState.setPushTokens(token);
  });
};
