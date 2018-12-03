import { messaging, notifications } from "react-native-firebase";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";
import navigationService from "../navigationService/navigationService";

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

export const onNotificationReceived = notifications().onNotification(
  notification => {
    notificationReceivedHandler(notification.data);
  }
);

export const onNotificationDisplayed = notifications().onNotificationDisplayed(
  notification => {
    notificationReceivedHandler(notification.data);
  }
);

export const onNotificationOpened = notifications().onNotificationOpened(
  notificationOpen => {
    const action = notificationOpen.action;
    const notification = notificationOpen.notification;
    notificationClickHandler(notification.data);
  }
);

export const getInitialNotification = notifications()
  .getInitialNotification()
  .then(notificationOpen => {
    if (notificationOpen) {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
      notificationClickHandler(notification.data);
    }
  });

const notificationClickHandler = data => {
  const screen = data.screen;
  const { navigation } = navigationService;
  switch (screen) {
    case "CRISP_CHAT":
      navigation._navigation.navigate("Support");
      break;

    default:
      break;
  }
};

const notificationReceivedHandler = data => {
  const screen = data.screen;
  const { appState } = storeService;
  switch (screen) {
    case "CRISP_CHAT":
      appState.setChatNotification();
      break;

    default:
      break;
  }
};
