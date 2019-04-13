import { messaging, notifications } from "react-native-firebase";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";
import navigationService from "../navigationService/navigationService";
import resolveLinks from "../resolveLinks/resolveLinks";
import * as Keychain from "react-native-keychain";
import isUserLoggedInCallback from "../isUserLoggedInCallback/isUserLoggedInCallback";
import appLauncher from "../appLauncher/appLauncher";

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
      isUserLoggedInCallback(async () => {
        try {
          await messaging().requestPermission();
          token = await messaging().getToken();
          storeService.appState.setPushTokens(token);
          success(token);
        } catch (e) {
          rejected(e);
        }
      });
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

export const onNotificationReceived = () =>
  notifications().onNotification(notification => {
    notificationReceivedHandler(notification.data);
  });

export const onNotificationDisplayed = () =>
  notifications().onNotificationDisplayed(notification => {
    notificationReceivedHandler(notification.data);
  });

export const onNotificationOpened = () =>
  notifications().onNotificationOpened(notificationOpen => {
    const action = notificationOpen.action;
    const notification = notificationOpen.notification;
    notificationClickHandler(notification.data);
  });

export const getInitialNotification = () =>
  notifications()
    .getInitialNotification()
    .then(notificationOpen => {
      if (notificationOpen) {
        const action = notificationOpen.action;
        const notification = notificationOpen.notification;
        notificationClickHandler(notification.data);
      }
    });

const notificationClickHandler = data => {
  isUserLoggedInCallback(() => {
    const { screen, link, modalData } = data;
    const { navigation } = navigationService;
    if (link) {
      resolveLinks(link, modalData ? JSON.parse(modalData) : {});
    } else {
      switch (screen) {
        case "CRISP_CHAT":
          navigation._navigation.navigate("Support");
          break;

        default:
          break;
      }
    }
  });
};

const notificationReceivedHandler = async data => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const screen = data.screen;
      const { appState } = storeService;
      switch (screen) {
        case "CRISP_CHAT":
          appState.setChatNotification();
          break;

        default:
          break;
      }
    }
  } catch (e) {
    logError(e);
  }
};
