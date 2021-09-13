import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
  ConversationOptions,
  // @ts-ignore
} from 'react-native-freshchat-sdk';
import {logError} from '../errorLogger/errorLogger';
import storeService from '../storeService/storeService';
import openCustomTab from '../openCustomTab/openCustomTab';
import isUserLoggedInCallback from '../isUserLoggedInCallback/isUserLoggedInCallback';

/**
 * Event listener for retrieving restore id. This restore id must be stored on the
 * server side to retrieve user's chat history.
 */
Freshchat.addEventListener(Freshchat.EVENT_USER_RESTORE_ID_GENERATED, () => {
  getRestoreId()
    .then(restoreId => {
      getActorId()
        .then(actorId => {
          if (restoreId && actorId) {
            const {setChatMetaInfo} = storeService.chatDetailsStore;
            setChatMetaInfo({restoreId, actorId});
          }
        })
        .catch(() => null);
    })
    .catch(() => null);
});

/**
 * Event listener to detect unread message count in freshchat
 */
Freshchat.addEventListener(Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED, () => {
  Freshchat.getUnreadCountAsync((data: {status: boolean; count: number}) => {
    const {count, status} = data;
    if (status) {
      const {setUnreadMessageCount} = storeService.chatDetailsStore;
      setUnreadMessageCount(count);
    } else {
      logError(data, {
        type: 'Failed to get unread message count from event listener',
      });
    }
  });
});

/**
 * Event listener for handling clicks happening inside the chat
 * All the clicks will be handled through App's own openCustomTab method.
 *
 * TODO: Only Works on iOS, on Android Freshchat view blocks execution of JS Code
 */
Freshchat.addEventListener(
  Freshchat.EVENT_EXTERNAL_LINK_CLICKED,
  (data: {url: string}): void => {
    const {url = ''} = data;
    openCustomTab(url);
  },
);

/**
 * Opens the chat screen
 */
export const openChat = (tags: string[] = []): boolean => {
  try {
    const conversationOptions = new ConversationOptions();
    conversationOptions.tags = tags;
    Freshchat.showConversations(conversationOptions);
    return true;
  } catch (e) {
    logError(e, {
      type: 'Failed to open chat',
    });
    return false;
  }
};

/**
 * Closes the chat screen
 */
export const closeChat = () => {
  Freshchat.dismissFreshchatViews();
};

/**
 * Prepares the fresh chat native indent.
 * Rest of the fresh-chat functions will work only if the initialization method succeeds.
 */
export const initializeChat = (appId: string, appKey: string): boolean => {
  try {
    if (!appId || !appKey) {
      throw new Error('Invalid freshchat app credentials!');
    }
    const freshchatConfig = new FreshchatConfig(appId, appKey);
    Freshchat.init(freshchatConfig);
    return true;
  } catch (e) {
    logError(e, {
      type: 'Failed to initialize chat',
    });
    return false;
  }
};

export interface chatUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
}

/**
 * Used to set user related info to the fresh-chat conversation.
 * Then agents can see this details on the agent dashboard for every conversations.
 */
export const setChatUserDetails = ({
  firstName,
  lastName,
  email,
  phoneCountryCode,
  phone,
}: chatUserDetails): Promise<Error> => {
  /**
   * TODO: No way to resolve this promise...
   * Freshchat SDK handles errors as callbacks but the callbacks won't fire if there are no errors.
   * Which makes it impossible to resolve the promise.
   */
  return new Promise((resolve, reject): void => {
    const freshchatUser = new FreshchatUser();
    freshchatUser.firstName = firstName;
    freshchatUser.lastName = lastName;
    freshchatUser.email = email;
    freshchatUser.phoneCountryCode = phoneCountryCode;
    freshchatUser.phone = phone;
    Freshchat.setUser(freshchatUser, (error: Error): void => {
      logError(error, {
        type: 'failed to set user details in chat',
        freshchatUser,
      });
      reject(error);
    });
  });
};

/**
 * On fresh install / logging in, this method will identify & restore the user's previous
 * chat history using the conversation's restore id.
 */
export const identifyChatUser = (
  externalId: string = '',
  restoreId: string | null = null,
): Promise<Error> => {
  return new Promise((resolve, reject): void => {
    Freshchat.identifyUser(externalId, restoreId, (error: Error): void => {
      logError(error, {
        type: 'unable to identify user in chat',
      });
      reject(error);
    });
  });
};

/**
 * Get fresh-chat unread message count
 */
export const getUnreadMessagesCount = () => {
  return new Promise((resolve, reject) => {
    Freshchat.getUnreadCountAsync((data: {status: boolean; count: number}) => {
      const {count, status} = data;
      if (status) {
        resolve(count);
      } else {
        logError(data, {
          type: 'Failed to get unread message count',
        });
        reject(data);
      }
    });
  });
};

/**
 * Logout freshchat user. Called from the logout service.
 */
export const logoutUserFromChat = () => {
  Freshchat.resetUser();
};

/**
 * Used to retrieve the restore id of the user created by freshchat SDK
 */
export const getRestoreId = (): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    Freshchat.getUser((user: {restoreId: string; externalId: string}) => {
      try {
        const {restoreId} = user;
        if (restoreId) {
          resolve(restoreId);
        } else {
          reject();
        }
      } catch (e) {
        logError(e, {
          type: 'Unable to retrieve restore id of the user',
          user,
        });
        reject();
      }
    });
  });
};

/**
 * Used to retrieve the actor id of the user created by fresh chat SDK
 * which is being used to generate automated messages.
 */
export const getActorId = (): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    Freshchat.getFreshchatUserId((data: string) => {
      if (data) {
        resolve(data);
      } else {
        logError('Unable to retrieve actor id of the user', {
          data,
        });
        reject();
      }
    });
  });
};

/**
 * Send device token to fresh chat so that fresh chat can
 * start sending push notifications to the users
 *
 * IMPORTANT! The token should be FCM Token for Android devices and
 * APNS token for iOS Devices.
 */
export const setChatPushToken = (token: string): boolean => {
  try {
    Freshchat.setPushRegistrationToken(token);
    return true;
  } catch (e) {
    logError(e, {
      type: 'Failed to set push notification token for freshchat',
    });
    return false;
  }
};

/**
 * Checks if the push notification belongs to freshchat. Resolves to a boolean value
 */
export const checkIfChatPushNotification = (
  notification: any,
): Promise<boolean | Error> => {
  return new Promise((resolve, reject) => {
    try {
      Freshchat.isFreshchatNotification(
        notification,
        (freshchatNotification: boolean) => {
          try {
            if (freshchatNotification) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (e) {
            logError(e, {
              type: 'Failed to check push notification type',
            });
            reject(e);
          }
        },
      );
    } catch (e) {
      logError(e, {
        type: 'Failed to check push notification type',
      });
      reject(e);
    }
  });
};

/**
 * Default push notification handler for freshchat push notifications.
 * Use `checkIfChatPushNotification` for checking push notification type.
 */
export const chatPushNotificationHandler = (notification: any) => {
  try {
    Freshchat.handlePushNotification(notification);
  } catch (e) {
    logError(e, {
      type: 'Failed to open chat push notification',
    });
  }
};

/**
 * Will launch the chat window based on the type of itinerary chosen by the user
 */
export const chatLauncher = () => {
  isUserLoggedInCallback(() => {
    const {chatDetails = {}} = storeService.chatDetailsStore;
    const {clearChatNotification} = storeService.appState;
    try {
      // @ts-ignore
      const {region = []} = chatDetails;
      clearChatNotification();
      openChat(region);
    } catch (e) {
      logError(e, {
        type: 'Failed to launch chat screen',
        chatDetails,
      });
    }
    return null;
  });
};
