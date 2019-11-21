import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser,
  ConversationOptions
  // @ts-ignore
} from "react-native-freshchat-sdk";
import { logError } from "../errorLogger/errorLogger";
import storeService from "../storeService/storeService";

/**
 * Event listener for retrieving restore id. This restore id must be stored on the
 * server side to retrieve user's chat history.
 */
Freshchat.addEventListener(Freshchat.EVENT_USER_RESTORE_ID_GENERATED, () => {
  Freshchat.getUser((user: { restoreId: string; externalId: string }) => {
    const restoreId = user.restoreId;
    const externalId = user.externalId;
  });
});

Freshchat.addEventListener(Freshchat.EVENT_UNREAD_MESSAGE_COUNT_CHANGED, () => {
  Freshchat.getUnreadCountAsync((data: { status: boolean; count: number }) => {
    const { count, status } = data;
    if (status) {
      const { setUnreadMessageCount } = storeService.chatDetailsStore;
      setUnreadMessageCount(count);
    } else {
      logError(data, {
        type: "Failed to get unread message count from event listener"
      });
    }
  });
});

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
      type: "Failed to open chat"
    });
    return false;
  }
};

/**
 * Prepares the fresh chat native indent.
 * Rest of the fresh-chat functions will work only if the initialization method succeeds.
 */
export const initializeChat = (appId: string, appKey: string): boolean => {
  try {
    const freshchatConfig = new FreshchatConfig(appId, appKey);
    Freshchat.init(freshchatConfig);
    return true;
  } catch (e) {
    logError(e, {
      type: "Failed to initialize chat"
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
  phone
}: chatUserDetails): Promise<Error> => {
  /**
   * TODO: No way to resolve this promise...
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
        type: "failed to set user details in chat",
        freshchatUser
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
  externalId: string = "",
  restoreId: string | null = null
): Promise<Error> => {
  return new Promise((resolve, reject): void => {
    Freshchat.identifyUser(externalId, restoreId, (error: Error): void => {
      logError(error, {
        type: "unable to identify user in chat"
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
    Freshchat.getUnreadCountAsync(
      (data: { status: boolean; count: number }) => {
        const { count, status } = data;
        if (status) {
          resolve(count);
        } else {
          logError(data, {
            type: "Failed to get unread message count"
          });
          reject();
        }
      }
    );
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
    Freshchat.getUser((user: { restoreId: string; externalId: string }) => {
      const { restoreId } = user;
      if (restoreId) {
        resolve(restoreId);
      } else {
        logError("Unable to retrieve restore id of the user", {
          user
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
        logError("Unable to retrieve actor id of the user", {
          data
        });
        reject();
      }
    });
  });
};

/**
 * Send device token to fresh chat so that fresh chat can
 * start sending push notifications to the users
 */
export const setChatPushToken = (token: string): boolean => {
  try {
    Freshchat.setPushRegistrationToken(token);
    return true;
  } catch (e) {
    logError(e, {
      type: "Failed to set push notification token for freshchat"
    });
    return false;
  }
};
