import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import { Platform } from "react-native";
import { logBreadCrumb, logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";
import resolveLinks from "../resolveLinks/resolveLinks";
import constants from "../../constants/constants";
import { recordEvent } from "../analytics/analyticsService";
import { CONSTANT_notificationEvents } from "../../constants/appEvents";
import {
  chatLauncher,
  chatPushNotificationHandler,
  checkIfChatPushNotification
} from "../freshchatService/freshchatService";
import isUserLoggedIn from "../isUserLoggedIn/isUserLoggedIn";

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
          ? await messaging().getAPNSToken()
          : "";

      storeService.appState.setPushTokens(token);
      if (Platform.OS === constants.platformIos) {
        storeService.appState.setApnsToken(apnsToken);
      }
      success(token);
    } else {
      isUserLoggedIn()
        .then(async result => {
          if (result) {
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
          }
        })
        .catch(() => null);
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
  // notifications().onNotification(notification => {
  messaging().onMessage(async notification => {
    notificationReceivedHandler(notification);
  });

/**
 * Called when a notification is received when app is active - works on iOS
 */
export const onNotificationDisplayed = () =>
  messaging().onMessage(async notification => {
  // notifications().onNotificationDisplayed(notification => {
    notificationReceivedHandler(notification);
  });

const inAppNotifHandler = notificationOpen => {
  // const action = notificationOpen.action;
  const { notification } = notificationOpen;
  
  PushNotification.removeDeliveredNotifications(notification.notificationId);

  // notifications().removeDeliveredNotification(notification.notificationId); // Will remove foreground push notifications on click
  notificationClickHandler(notification.data);
};

/**
 * Called when a notification is clicked when the app is active
 *
 * - Chat notifications should be handled separately
 */
export const onNotificationOpened = () =>
  messaging().onNotificationOpenedApp(async notificationOpen => {
  // notifications().onNotificationOpened(notificationOpen => {
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
  // notifications()
  //   .getInitialNotification()
  messaging()
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

const CHATSCREEN = "Support";

const notificationClickHandler = data => {
  logBreadCrumb({
    message: constants.errorLoggerEvents.messages.notifClicked,
    category: constants.errorLoggerEvents.categories.pushNotif,
    data,
    level: constants.errorLoggerEvents.levels.info
  });
  isUserLoggedIn()
    .then(result => {
      if (result) {
        const {
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
        if (link === CHATSCREEN) {
          chatLauncher();
        } else if (link) {
          resolveLinks(link, modalData ? JSON.parse(modalData) : {});
        }
      }
    })
    .catch(() => null);
};

const notificationReceivedHandler = notification => {
  const { data } = notification;
  logBreadCrumb({
    message: constants.errorLoggerEvents.messages.notifReceived,
    category: constants.errorLoggerEvents.categories.pushNotif,
    data,
    level: constants.errorLoggerEvents.levels.info
  });
  const inAppNotifReceivedHandler = () => {
    if (
      !notification.data ||
      (notification.data && !notification.data.isLocal)
    ) {
      showForegroundNotification(notification);
    }
    const { link } = data;
    const { appState } = storeService;
    if (link === CHATSCREEN) {
      appState.setChatNotification();
    }
  };
  try {
    isUserLoggedIn()
      .then(result => {
        if (result) {
          checkIfChatPushNotification(data)
            .then(isChatNotification => {
              if (isChatNotification) {
                chatPushNotificationHandler(data);
              } else {
                inAppNotifReceivedHandler();
              }
            })
            .catch(() => {
              inAppNotifReceivedHandler();
            });
        }
      })
      .catch(() => null);
  } catch (e) {
    logError(e);
  }
};

const foregroundChannelId = "foreground-notification";
const foregroundIcon = "ic_notif";

/**
 * This method will display notification even when the app is in foreground.
 * Notification can be obtained from the notification received handler.
 */
const showForegroundNotification = notification => {
  PushNotification.createChannel(
    {
      channelId: foregroundChannelId, // (required)
      channelName: "Foreground Notification", // (required)
      channelDescription: "Foreground app notification channel", // (optional) default: undefined.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  // const channel = new notifications.Android.Channel(
  //   foregroundChannelId,
  //   "Foreground Notification",
  //   notifications.Android.Importance.Max
  // ).setDescription("Foreground app notification channel");

  // notifications().android.createChannel(channel);
  const localNotifData = {
    isLocal: true,
    notificationId: PushNotification.channelId
  };
  const notificationData = notification.data
    ? { ...notification.data, ...localNotifData }
    : localNotifData;

    
  const notificationObject = new PushNotification.Notification()
    .setNotificationId(notification.notificationId)
    .setTitle(notification.title)
    .setBody(notification.body)
    .setData(notificationData)
    .setSound(notification.sound);
  notificationObject.android
    .setChannelId(foregroundChannelId)
    .android.setSmallIcon(foregroundIcon);
    PushNotification.displayNotification(notificationObject);
};
