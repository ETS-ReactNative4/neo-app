import FCM, { FCMEvent } from "react-native-fcm";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";

export const getDeviceToken = async () => {
  try {
    await FCM.requestPermissions({ badge: true, sound: true, alert: true });
    const token = await FCM.getFCMToken();
    storeService.appState.setPushTokens(token);
  } catch (err) {
    logError(err);
  }
};

export const registerFcmRefreshListener = () => {
  FCM.on(FCMEvent.RefreshToken, token => {
    storeService.appState.setPushTokens(token);
  });
};
