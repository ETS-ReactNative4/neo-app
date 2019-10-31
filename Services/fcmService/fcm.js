import { messaging, notifications } from "react-native-firebase";
import { logBreadCrumb, logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";
import navigationService from "../navigationService/navigationService";
import resolveLinks from "../resolveLinks/resolveLinks";
import isUserLoggedInCallback from "../isUserLoggedInCallback/isUserLoggedInCallback";
import constants from "../../constants/constants";
import { recordEvent } from "../analytics/analyticsService";
import { CONSTANT_notificationEvents } from "../../constants/appEvents";

export const getDeviceToken = async (
  success = () => null,
  rejected = () => null,
  failure = () => null
) => {
  let token;
  try {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      /**
       * Push notifications already enabled!
       */
      token = await messaging().getToken();
      storeService.appState.setPushTokens(token);
      success(token);
    } else {
      isUserLoggedInCallback(async () => {
        try {
          /**
           * Request the user for push notifications permission
           */
          await messaging().requestPermission();
          token = await messaging().getToken();
          /**
           * Got push notifications permission and can update the device token
           */
          storeService.appState.setPushTokens(token);
          success(token);
        } catch (e) {
          /**
           * Unable to retrieve Push notifications - Push notifications are disabled
           */
          storeService.appState.removePushToken();
          rejected(e);
        }
      });
    }
  } catch (err) {
    /**
     * Something went wrong with the push notification module
     */
    failure(err);
    logError(err);
  }
};

export const registerFcmRefreshListener = () => {
  messaging().onTokenRefresh(token => {
    storeService.appState.setPushTokens(token);
  });
};

/**
 * Called when a notification is received when the app is active - works on android
 */
export const onNotificationReceived = () =>
  notifications().onNotification(notification => {
    notificationReceivedHandler(notification.data);
  });

/**
 * Called when a notification is received when app is active - works on iOS
 */
export const onNotificationDisplayed = () =>
  notifications().onNotificationDisplayed(notification => {
    notificationReceivedHandler(notification.data);
  });

/**
 * Called when a notification is clicked when the app is active
 */
export const onNotificationOpened = () =>
  notifications().onNotificationOpened(notificationOpen => {
    const action = notificationOpen.action;
    const notification = notificationOpen.notification;
    notificationClickHandler(notification.data);
  });

/**
 * Called when the app is launched by clicking on a notification
 */
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

const CHATSCREEN = "CHAT_SCREEN";

const notificationClickHandler = data => {
  logBreadCrumb({
    message: constants.errorLoggerEvents.messages.notifClicked,
    category: constants.errorLoggerEvents.categories.pushNotif,
    data,
    level: constants.errorLoggerEvents.levels.info
  });
  isUserLoggedInCallback(() => {
    const {
      screen,
      link,
      modalData,
      notificationType = "",
      notificationProps = {}
    } = data;
    if (notificationType) {
      recordEvent(CONSTANT_notificationEvents.event, {
        notificationType,
        notificationProps
      });
    }
    const { navigation } = navigationService;
    if (link) {
      resolveLinks(link, modalData ? JSON.parse(modalData) : {});
    } else {
      switch (screen) {
        case CHATSCREEN:
          navigation._navigation.navigate("Support");
          break;

        default:
          break;
      }
    }
  });
};

const notificationReceivedHandler = data => {
  logBreadCrumb({
    message: constants.errorLoggerEvents.messages.notifReceived,
    category: constants.errorLoggerEvents.categories.pushNotif,
    data,
    level: constants.errorLoggerEvents.levels.info
  });
  try {
    isUserLoggedInCallback(() => {
      const screen = data.screen;
      const { appState } = storeService;
      switch (screen) {
        case CHATSCREEN:
          appState.setChatNotification();
          break;

        default:
          break;
      }
    });
  } catch (e) {
    logError(e);
  }
};
