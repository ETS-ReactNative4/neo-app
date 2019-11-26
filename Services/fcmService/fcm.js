import { messaging, notifications } from "react-native-firebase";
import { Platform } from "react-native";
import { logBreadCrumb, logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";
import navigationService from "../navigationService/navigationService";
import resolveLinks from "../resolveLinks/resolveLinks";
import isUserLoggedInCallback from "../isUserLoggedInCallback/isUserLoggedInCallback";
import constants from "../../constants/constants";
import { recordEvent } from "../analytics/analyticsService";
import { CONSTANT_notificationEvents } from "../../constants/appEvents";
import {
  chatLauncher,
  chatPushNotificationHandler,
  checkIfChatPushNotification
} from "../freshchatService/freshchatService";

export const getDeviceToken = async (
  success = () => null,
  rejected = () => null,
  failure = () => null
) => {
  let token, apnsToken;
  try {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      /**
       * Push notifications already enabled!
       */
      token = await messaging().getToken();
      apnsToken =
        Platform.OS === constants.platformIos
          ? await messaging().ios.getAPNSToken()
          : "";

      storeService.appState.setPushTokens(token);
      if (Platform.OS === constants.platformIos) {
        storeService.appState.setApnsToken(apnsToken);
      }
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
          if (Platform.OS === constants.platformIos) {
            storeService.appState.setApnsToken(apnsToken);
          }
          success(token);
        } catch (e) {
          /**
           * Unable to retrieve Push notifications - Push notifications are disabled
           */
          storeService.appState.removePushToken();
          if (Platform.OS === constants.platformIos) {
            storeService.appState.removeApnsToken();
          }
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

const inAppNotifHandler = notificationOpen => {
  const action = notificationOpen.action;
  const notification = notificationOpen.notification;
  notificationClickHandler(notification.data);
};

/**
 * Called when a notification is clicked when the app is active
 *
 * - Chat notifications should be handled separately
 */
export const onNotificationOpened = () =>
  notifications().onNotificationOpened(notificationOpen => {
    checkIfChatPushNotification(notificationOpen.notification.data)
      .then(isChatNotification => {
        if (isChatNotification) {
          recordEvent(constants.Chat.event, {
            click: constants.Chat.click.notifAppForeGround
          });
          chatLauncher();
        } else {
          inAppNotifHandler(notificationOpen);
        }
      })
      .catch(() => {
        inAppNotifHandler(notificationOpen);
      });
  });

/**
 * Called when the app is launched by clicking on a notification
 *
 * - Chat notifications should be handled separately
 */
export const getInitialNotification = () =>
  notifications()
    .getInitialNotification()
    .then(notificationOpen => {
      if (notificationOpen) {
        checkIfChatPushNotification(notificationOpen.notification.data)
          .then(isChatNotification => {
            if (isChatNotification) {
              recordEvent(constants.Chat.event, {
                click: constants.Chat.click.notifAppStart
              });
              chatLauncher();
            } else {
              inAppNotifHandler(notificationOpen);
            }
          })
          .catch(() => {
            inAppNotifHandler(notificationOpen);
          });
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
      notificationProps = ""
    } = data;
    if (notificationType) {
      try {
        recordEvent(CONSTANT_notificationEvents.event, {
          notificationType,
          ...JSON.parse(notificationProps || "{}")
        });
      } catch (e) {
        logError(e, {
          type: "Failed to capture push notification details in analytics",
          data
        });
      }
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
  const inAppNotifHandler = () => {
    const screen = data.screen;
    const { appState } = storeService;
    switch (screen) {
      case CHATSCREEN:
        appState.setChatNotification();
        break;

      default:
        break;
    }
  };
  try {
    isUserLoggedInCallback(() => {
      checkIfChatPushNotification(data)
        .then(isChatNotification => {
          if (isChatNotification) {
            chatPushNotificationHandler(data);
          } else {
            inAppNotifHandler();
          }
        })
        .catch(() => {
          inAppNotifHandler();
        });
    });
  } catch (e) {
    logError(e);
  }
};
